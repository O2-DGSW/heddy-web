import { useEffect, useMemo, useRef, useState } from "react";

import {
  getCustomerDashboard,
  getShopChurnCustomers,
  type CustomerChurn,
  type DashboardResponse,
} from "@/entities/customer/api/customerApi";
import { getMe } from "@/entities/user/api/userApi";
import {
  CUSTOMER_CONTENT_BOTTOM_OFFSET_REM,
  CUSTOMER_CONTENT_HEIGHT_REM,
  CUSTOMER_CONTENT_TOP_OFFSET_REM,
  CUSTOMER_CONTENT_WIDTH_REM,
  CUSTOMER_DESIGNER_OPTIONS,
  CUSTOMER_FILTERS,
  CUSTOMER_PAGE_LEFT_PADDING_REM,
  CUSTOMER_PAGE_RIGHT_PADDING_REM,
  CUSTOMER_SORT_OPTIONS,
  CUSTOMER_SUMMARIES,
  MIN_CUSTOMER_SCALE,
} from "./Customer.constant";
import type {
  CustomerFilterKey,
  CustomerRiskLevel,
  CustomerRow,
  CustomerSortKey,
} from "./Customer.types";

interface CustomerContainerSize {
  width: number;
  height: number;
}

const getRootFontSize = () => {
  if (typeof window === "undefined") {
    return 16;
  }

  const rootFontSize = window.getComputedStyle(document.documentElement)?.fontSize;

  return Number.parseFloat(rootFontSize ?? "") || 16;
};

const getFallbackContainerSize = (): CustomerContainerSize => {
  if (typeof window === "undefined") {
    return {
      width:
        CUSTOMER_PAGE_LEFT_PADDING_REM +
        CUSTOMER_CONTENT_WIDTH_REM +
        CUSTOMER_PAGE_RIGHT_PADDING_REM,
      height:
        CUSTOMER_CONTENT_TOP_OFFSET_REM +
        CUSTOMER_CONTENT_HEIGHT_REM +
        CUSTOMER_CONTENT_BOTTOM_OFFSET_REM,
    };
  }

  const rootFontSize = getRootFontSize();

  return {
    width: window.innerWidth / rootFontSize,
    height: window.innerHeight / rootFontSize,
  };
};

const getCustomerScale = (containerSize = getFallbackContainerSize()) => {
  const availableWidth = getAvailableContentWidth(containerSize);
  const availableWidthRatio = availableWidth / CUSTOMER_CONTENT_WIDTH_REM;
  const availableHeightRatio =
    containerSize.height /
    (CUSTOMER_CONTENT_TOP_OFFSET_REM +
      CUSTOMER_CONTENT_HEIGHT_REM +
      CUSTOMER_CONTENT_BOTTOM_OFFSET_REM);
  const viewportScale = Math.min(availableWidthRatio, availableHeightRatio);

  return Math.min(1, Math.max(MIN_CUSTOMER_SCALE, viewportScale));
};

const getAvailableContentWidth = (containerSize = getFallbackContainerSize()) => {
  return Math.max(
    0,
    containerSize.width - CUSTOMER_PAGE_LEFT_PADDING_REM - CUSTOMER_PAGE_RIGHT_PADDING_REM
  );
};

const clampPercent = (value: number) => Math.min(100, Math.max(0, Math.round(value)));

const toCustomerRiskLevel = (churnLevel: string, churnScore: number): CustomerRiskLevel => {
  const normalizedLevel = churnLevel.trim().toLowerCase();

  if (
    normalizedLevel.includes("risk") ||
    normalizedLevel.includes("high") ||
    normalizedLevel.includes("danger") ||
    churnScore >= 70
  ) {
    return "risk";
  }

  if (
    normalizedLevel.includes("caution") ||
    normalizedLevel.includes("medium") ||
    normalizedLevel.includes("warn") ||
    churnScore >= 40
  ) {
    return "caution";
  }

  return "normal";
};

const formatDateFromDaysAgo = (daysAgo: number) => {
  if (!Number.isFinite(daysAgo)) {
    return "-";
  }

  const date = new Date();
  date.setDate(date.getDate() - daysAgo);

  return `${date.getMonth() + 1}/${date.getDate()}`;
};

const mapCustomerChurnToRow = (customer: CustomerChurn, index: number): CustomerRow => {
  const numericId = Number(customer.customer_id);
  const daysSinceLastVisit = Math.max(0, customer.days_since_last_visit);

  return {
    id: Number.isFinite(numericId) ? numericId : index + 1,
    customerId: customer.customer_id,
    name: customer.customer_name || `고객 ${customer.customer_id}`,
    phone: "-",
    lastVisit: formatDateFromDaysAgo(daysSinceLastVisit),
    daysSinceLastVisit,
    visitCycle: "-",
    riskPercent: clampPercent(customer.churn_score),
    riskLevel: toCustomerRiskLevel(customer.churn_level, customer.churn_score),
    tags: [],
    totalVisits: "-",
    designer: "-",
  };
};

const getCustomerErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (!(error instanceof Error)) {
    return fallbackMessage;
  }

  if (error.message.includes("401")) {
    return "로그인 후 고객 정보를 확인해주세요.";
  }

  return error.message;
};

export const useCustomer = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(getCustomerScale);
  const [availableContentWidthRem, setAvailableContentWidthRem] =
    useState(getAvailableContentWidth);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<CustomerFilterKey>("all");
  const [selectedSort, setSelectedSort] = useState<CustomerSortKey>("recent");
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [openDesignerMenuRowId, setOpenDesignerMenuRowId] = useState<number | null>(null);
  const [selectedDesigners, setSelectedDesigners] = useState<Record<number, string>>({});
  const [shopId, setShopId] = useState<number | null>(null);
  const [rows, setRows] = useState<CustomerRow[]>([]);
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [emptyMessage, setEmptyMessage] = useState("고객 정보가 없습니다");
  const layoutHeightRem =
    CUSTOMER_CONTENT_TOP_OFFSET_REM +
    CUSTOMER_CONTENT_HEIGHT_REM +
    CUSTOMER_CONTENT_BOTTOM_OFFSET_REM;

  useEffect(() => {
    const updateLayout = () => {
      const pageElement = pageRef.current;
      const rootFontSize = getRootFontSize();
      const containerSize = pageElement
        ? {
            width: pageElement.getBoundingClientRect().width / rootFontSize,
            height: pageElement.getBoundingClientRect().height / rootFontSize,
          }
        : getFallbackContainerSize();

      setAvailableContentWidthRem(getAvailableContentWidth(containerSize));
      setScale(getCustomerScale(containerSize));
    };

    updateLayout();

    const resizeObserver = new ResizeObserver(updateLayout);

    if (pageRef.current) {
      resizeObserver.observe(pageRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    const loadMe = async () => {
      setIsLoading(true);

      try {
        const me = await getMe();
        const firstShopId = me.shopMembers[0]?.shopId;

        if (!firstShopId) {
          throw new Error("연결된 매장이 없습니다");
        }

        if (!ignore) {
          setShopId(firstShopId);
          setEmptyMessage("고객 정보가 없습니다");
        }
      } catch (error) {
        if (!ignore) {
          setRows([]);
          setDashboard(null);
          setEmptyMessage(getCustomerErrorMessage(error, "사용자 정보를 불러오지 못했습니다."));
          setIsLoading(false);
        }
      }
    };

    loadMe();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (shopId === null) {
      return;
    }

    let ignore = false;

    const loadCustomers = async () => {
      setIsLoading(true);

      try {
        const [nextDashboard, churnData] = await Promise.all([
          getCustomerDashboard(shopId),
          getShopChurnCustomers(shopId),
        ]);

        if (!ignore) {
          const gradeByCustomerId = new Map(
            nextDashboard.customer_grades.map(grade => [grade.customer_id, grade])
          );
          const nextRows = churnData.customers.map((customer, index) => {
            const row = mapCustomerChurnToRow(customer, index);
            const grade = gradeByCustomerId.get(customer.customer_id);

            return {
              ...row,
              totalVisits: grade ? `${grade.visit_count_6months}회` : row.totalVisits,
            };
          });

          setDashboard(nextDashboard);
          setRows(nextRows);
          setEmptyMessage("고객 정보가 없습니다");
        }
      } catch (error) {
        if (!ignore) {
          setRows([]);
          setDashboard(null);
          setEmptyMessage(getCustomerErrorMessage(error, "고객 정보를 불러오지 못했습니다."));
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadCustomers();

    return () => {
      ignore = true;
    };
  }, [shopId]);

  const layoutWidthRem = Math.max(CUSTOMER_CONTENT_WIDTH_REM, availableContentWidthRem / scale);
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const summaries = useMemo(() => {
    const riskCount = rows.filter(row => row.riskLevel === "risk").length;
    const cautionCount = rows.filter(row => row.riskLevel === "caution").length;
    const totalCustomerCount = dashboard?.metrics.total_customer_count ?? rows.length;
    const summaryCountMap: Record<CustomerRiskLevel, number> = {
      normal: Math.max(0, totalCustomerCount - riskCount - cautionCount),
      caution: cautionCount,
      risk: riskCount,
    };

    return CUSTOMER_SUMMARIES.map(summary => ({
      ...summary,
      count: summaryCountMap[summary.id],
    }));
  }, [dashboard?.metrics.total_customer_count, rows]);
  const filters = CUSTOMER_FILTERS.map(filter => ({
    ...filter,
    active: filter.key === selectedFilter,
  }));
  const filteredRows = rows
    .filter(row => {
      const designer = selectedDesigners[row.id] ?? row.designer;
      const matchesFilter = selectedFilter === "all" || row.riskLevel === selectedFilter;
      const matchesSearch =
        normalizedSearchQuery.length === 0 ||
        [
          row.name,
          row.phone,
          row.lastVisit,
          row.visitCycle,
          row.totalVisits,
          designer,
          ...(row.tags ?? []),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearchQuery);

      return matchesFilter && matchesSearch;
    })
    .map(row => ({
      ...row,
      designer: selectedDesigners[row.id] ?? row.designer,
    }))
    .sort((firstRow, secondRow) => {
      if (selectedSort === "oldest") {
        return secondRow.daysSinceLastVisit - firstRow.daysSinceLastVisit;
      }

      return firstRow.daysSinceLastVisit - secondRow.daysSinceLastVisit;
    });
  const selectedSortOption = CUSTOMER_SORT_OPTIONS.find(option => option.key === selectedSort);
  const handleChangeSearchQuery = (query: string) => {
    setSearchQuery(query);
    setIsSortMenuOpen(false);
    setOpenDesignerMenuRowId(null);
  };
  const handleSelectFilter = (filter: CustomerFilterKey) => {
    setSelectedFilter(filter);
    setIsSortMenuOpen(false);
    setOpenDesignerMenuRowId(null);
  };
  const handleToggleSortMenu = () => {
    setIsSortMenuOpen(isOpen => !isOpen);
    setOpenDesignerMenuRowId(null);
  };
  const handleSelectSort = (sort: CustomerSortKey) => {
    setSelectedSort(sort);
    setIsSortMenuOpen(false);
    setOpenDesignerMenuRowId(null);
  };
  const handleToggleDesignerMenu = (rowId: number) => {
    setOpenDesignerMenuRowId(currentRowId => (currentRowId === rowId ? null : rowId));
    setIsSortMenuOpen(false);
  };
  const handleSelectDesigner = (rowId: number, designer: string) => {
    setSelectedDesigners(currentDesigners => ({
      ...currentDesigners,
      [rowId]: designer,
    }));
    setOpenDesignerMenuRowId(null);
  };

  return {
    pageRef,
    scale,
    layoutWidthRem,
    layoutHeightRem,
    scaledLayoutWidthRem: layoutWidthRem * scale,
    scaledLayoutHeightRem: layoutHeightRem * scale,
    summaries,
    filters,
    rows: filteredRows,
    totalCustomerCount: dashboard?.metrics.total_customer_count ?? rows.length,
    searchQuery,
    isLoading,
    emptyMessage: searchQuery.trim() ? "검색 결과가 없습니다" : emptyMessage,
    sortLabel: selectedSortOption?.label ?? CUSTOMER_SORT_OPTIONS[0].label,
    sortOptions: CUSTOMER_SORT_OPTIONS,
    designerOptions: CUSTOMER_DESIGNER_OPTIONS,
    isSortMenuOpen,
    openDesignerMenuRowId,
    onChangeSearchQuery: handleChangeSearchQuery,
    onSelectFilter: handleSelectFilter,
    onToggleSortMenu: handleToggleSortMenu,
    onSelectSort: handleSelectSort,
    onToggleDesignerMenu: handleToggleDesignerMenu,
    onSelectDesigner: handleSelectDesigner,
  };
};
