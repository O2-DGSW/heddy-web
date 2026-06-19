import { useEffect, useRef, useState } from "react";

import {
  CUSTOMER_CONTENT_BOTTOM_OFFSET_REM,
  CUSTOMER_CONTENT_HEIGHT_REM,
  CUSTOMER_CONTENT_TOP_OFFSET_REM,
  CUSTOMER_CONTENT_WIDTH_REM,
  CUSTOMER_DESIGNER_OPTIONS,
  CUSTOMER_FILTERS,
  CUSTOMER_PAGE_LEFT_PADDING_REM,
  CUSTOMER_PAGE_RIGHT_PADDING_REM,
  CUSTOMER_ROWS,
  CUSTOMER_SORT_OPTIONS,
  CUSTOMER_SUMMARIES,
  MIN_CUSTOMER_SCALE,
} from "./Customer.constant";
import type { CustomerFilterKey, CustomerSortKey } from "./Customer.types";

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

  const layoutWidthRem = Math.max(CUSTOMER_CONTENT_WIDTH_REM, availableContentWidthRem / scale);
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filters = CUSTOMER_FILTERS.map(filter => ({
    ...filter,
    active: filter.key === selectedFilter,
  }));
  const filteredRows = CUSTOMER_ROWS.filter(row => {
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
        return firstRow.id - secondRow.id;
      }

      return secondRow.id - firstRow.id;
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
    summaries: CUSTOMER_SUMMARIES,
    filters,
    rows: filteredRows,
    searchQuery,
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
