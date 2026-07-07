import { useEffect, useState } from "react";
import { lightTheme } from "@design-tokens";

import {
  getCustomerDashboard,
  getQuarterlySalesPredict,
  type CustomerGradeResponse,
  type DashboardResponse,
  type QuarterlySalesPredictResponse,
  type TodayReservationResponse,
} from "@/entities/customer/api/customerApi";
import { getMe } from "@/entities/user/api/userApi";
import {
  customerGradeDefinitions,
  summaryCardDefinitions,
  type CustomerGrade,
  type ReservationItem,
  type RevenueChartData,
  type RevenueChartPoint,
  type SummaryCardItem,
} from "@/pages/home/model/homeDashboardData";

type HomeDashboardViewModel = {
  summaryCards: SummaryCardItem[];
  customerGrades: CustomerGrade[];
  totalCustomerCount: number;
  reservations: ReservationItem[];
  revenueChart: RevenueChartData;
};

const GRADE_LABELS = ["VVIP", "VIP", "골드", "실버", "일반"] as const;
type GradeLabel = (typeof GRADE_LABELS)[number];

const CHART_TOP_Y = 6;
const CHART_BOTTOM_Y = 211;
const CHART_START_X = 52.2;
const CHART_END_X = 672.8;
const GRADE_BAR_WIDTH = 392;

const getTodayDateKey = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${date}`;
};

const toSafeNumber = (value?: number | null) => {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
};

const formatInteger = (value?: number | null) => {
  return new Intl.NumberFormat("ko-KR").format(Math.max(0, Math.round(toSafeNumber(value))));
};

const formatCompactKorean = (value: number) => {
  const rounded = Math.round(value * 10) / 10;

  return Number.isInteger(rounded) ? formatInteger(rounded) : rounded.toFixed(1);
};

const formatAxisLabel = (value: number) => {
  if (value === 0) {
    return "0";
  }

  if (value >= 100000000) {
    return `${formatCompactKorean(value / 100000000)}억`;
  }

  if (value >= 10000) {
    return `${formatCompactKorean(value / 10000)}만`;
  }

  return formatInteger(value);
};

const getNiceAxisMax = (value: number) => {
  const safeValue = Math.max(10000, value);
  const magnitude = 10 ** Math.floor(Math.log10(safeValue));
  const normalized = safeValue / magnitude;
  const niceNormalized =
    normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 4 ? 4 : normalized <= 5 ? 5 : 10;

  return niceNormalized * magnitude;
};

const getChartX = (index: number, count: number) => {
  if (count <= 1) {
    return (CHART_START_X + CHART_END_X) / 2;
  }

  return CHART_START_X + ((CHART_END_X - CHART_START_X) * index) / (count - 1);
};

const getChartY = (value: number, axisMax: number) => {
  const ratio = axisMax > 0 ? Math.min(1, Math.max(0, value / axisMax)) : 0;

  return CHART_BOTTOM_Y - ratio * (CHART_BOTTOM_Y - CHART_TOP_Y);
};

const formatPeriodLabel = (period: string, index: number) => {
  const dateMatch = period.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (dateMatch) {
    return `${Number(dateMatch[2])}/${Number(dateMatch[3])}`;
  }

  const monthMatch = period.match(/^(\d{4})-(\d{2})$/);

  if (monthMatch) {
    return `${Number(monthMatch[2])}월`;
  }

  const quarterMatch = period.match(/^(\d{4})-?Q([1-4])$/i);

  if (quarterMatch) {
    return `${quarterMatch[2]}분기`;
  }

  return period || `${index + 1}`;
};

const getRecentDateLabels = (count: number) => {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (count - index - 1));

    return `${date.getMonth() + 1}/${date.getDate()}`;
  });
};

const createSummaryCards = (
  metrics: DashboardResponse["metrics"] | null | undefined,
  monthlyExpectedSales?: number | null
) => {
  const valueByTitle = new Map([
    ["전체 고객 수", formatInteger(metrics?.total_customer_count)],
    ["이탈 위험 고객 수", formatInteger(metrics?.churn_risk_customer_count)],
    ["오늘 예약자 수", formatInteger(metrics?.today_reservation_count)],
    ["이달의 신규 단골 수", formatInteger(metrics?.monthly_new_regular_customer_count)],
    ["오늘 방문자 수", formatInteger(metrics?.today_visitor_count)],
    [
      "이달의 예상 매출",
      monthlyExpectedSales == null ? "-" : formatInteger(monthlyExpectedSales),
    ],
  ]);

  return summaryCardDefinitions.map(card => ({
    ...card,
    value: valueByTitle.get(card.title) ?? "0",
  }));
};

const normalizeGradeLabel = (grade?: string | null): GradeLabel => {
  const normalizedGrade = grade?.trim().toLowerCase() ?? "";

  if (normalizedGrade.includes("vvip")) {
    return "VVIP";
  }

  if (normalizedGrade.includes("vip")) {
    return "VIP";
  }

  if (normalizedGrade.includes("gold") || normalizedGrade.includes("골드")) {
    return "골드";
  }

  if (normalizedGrade.includes("silver") || normalizedGrade.includes("실버")) {
    return "실버";
  }

  return "일반";
};

const createCustomerGrades = (
  grades: CustomerGradeResponse[],
  totalCustomerCount: number
): CustomerGrade[] => {
  const countsByGrade = new Map<GradeLabel, number>(
    GRADE_LABELS.map(label => [label, 0])
  );

  grades.forEach(grade => {
    const label = normalizeGradeLabel(grade.customer_grade);

    countsByGrade.set(label, (countsByGrade.get(label) ?? 0) + 1);
  });

  const total = Math.max(0, totalCustomerCount);

  return customerGradeDefinitions.map(baseGrade => {
    const value = countsByGrade.get(baseGrade.label as (typeof GRADE_LABELS)[number]) ?? 0;
    const percentValue = total > 0 ? Math.round((value / total) * 100) : 0;
    const barWidth =
      value > 0 ? Math.max(32, Math.round((percentValue / 100) * GRADE_BAR_WIDTH)) : 0;
    const valueLeft =
      barWidth > 0 ? Math.max(8, Math.min(barWidth - 18, GRADE_BAR_WIDTH - 32)) : 8;

    return {
      ...baseGrade,
      value,
      percent: `${percentValue}%`,
      barWidth,
      valueLeft,
    };
  });
};

const formatReservationTime = (time?: string | null) => {
  if (!time) {
    return "-";
  }

  const timeMatch = time.match(/(?:T|\s|^)(\d{2}:\d{2})/);

  return timeMatch?.[1] ?? time;
};

const getReservationStatus = (status?: string | null) => {
  const normalizedStatus = status?.trim().toUpperCase() ?? "";

  if (normalizedStatus.includes("REJECT")) {
    return {
      label: "거절",
      color: lightTheme.status.error,
      textColor: lightTheme.label.buttonText,
      selected: false,
    };
  }

  if (normalizedStatus.includes("CHANGE")) {
    return {
      label: "변경",
      color: lightTheme.status.warning,
      textColor: lightTheme.label.neutral,
      selected: false,
    };
  }

  if (normalizedStatus.includes("APPROV") || normalizedStatus.includes("CONFIRM")) {
    return {
      label: "승인",
      color: lightTheme.primary.normal,
      textColor: lightTheme.label.buttonText,
      selected: true,
    };
  }

  return {
    label: "대기",
    color: lightTheme.status.info,
    textColor: lightTheme.label.buttonText,
    selected: false,
  };
};

const createReservations = (todayReservations: TodayReservationResponse[]) => {
  return todayReservations.slice(0, 5).map(reservation => {
    const status = getReservationStatus(reservation.status);

    return {
      id: reservation.reservation_id,
      time: formatReservationTime(reservation.time),
      customer: reservation.customer_name || `고객 ${reservation.customer_id}`,
      procedure: reservation.service_name || "-",
      designer: reservation.designer_name || "-",
      selected: status.selected,
      statusLabel: status.label,
      statusColor: status.color,
      statusTextColor: status.textColor,
    };
  });
};

const createRevenueChart = (salesPrediction?: QuarterlySalesPredictResponse): RevenueChartData => {
  const chart = salesPrediction?.chart ?? [];
  const salesValues = chart.map(point => toSafeNumber(point.sales));
  const maxSales = Math.max(...salesValues, 0);
  const axisMax = getNiceAxisMax(maxSales);
  const pointCount = Math.max(chart.length, 7);
  const zeroPoints = Array.from(
    { length: 7 },
    (_, index): RevenueChartPoint => ({
      x: getChartX(index, 7),
      y: CHART_BOTTOM_Y,
    })
  );
  const points =
    chart.length > 0
      ? chart.map(
          (point, index): RevenueChartPoint => ({
            x: getChartX(index, chart.length),
            y: getChartY(toSafeNumber(point.sales), axisMax),
          })
        )
      : zeroPoints;

  return {
    totalValue:
      salesPrediction?.predicted_sales_total == null
        ? "-"
        : formatInteger(salesPrediction.predicted_sales_total),
    axisLabels: Array.from({ length: 6 }, (_, index) =>
      formatAxisLabel(axisMax - (axisMax / 5) * index)
    ),
    xLabels:
      chart.length > 0
        ? chart.map((point, index) => formatPeriodLabel(point.quarter, index))
        : getRecentDateLabels(pointCount),
    points,
  };
};

const createEmptyDashboard = (): DashboardResponse => ({
  metrics: {
    total_customer_count: 0,
    churn_risk_customer_count: 0,
    today_reservation_count: 0,
    today_visitor_count: 0,
    monthly_new_regular_customer_count: 0,
  },
  customer_grades: [],
  today_reservations: [],
  calculated_at: getTodayDateKey(),
});

const createHomeDashboardViewModel = (
  dashboard?: DashboardResponse | null,
  weeklySales?: QuarterlySalesPredictResponse,
  monthlySales?: QuarterlySalesPredictResponse
): HomeDashboardViewModel => {
  const totalCustomerCount = toSafeNumber(dashboard?.metrics?.total_customer_count);
  const monthlyExpectedSales = monthlySales?.predicted_sales_total ?? undefined;

  return {
    summaryCards: createSummaryCards(dashboard?.metrics, monthlyExpectedSales),
    customerGrades: createCustomerGrades(dashboard?.customer_grades ?? [], totalCustomerCount),
    totalCustomerCount,
    reservations: createReservations(dashboard?.today_reservations ?? []),
    revenueChart: createRevenueChart(weeklySales),
  };
};

const getErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (!(error instanceof Error)) {
    return fallbackMessage;
  }

  if (error.message.includes("401")) {
    return "로그인 후 대시보드 정보를 확인해주세요.";
  }

  return error.message || fallbackMessage;
};

const getHomeDashboardErrorMessage = (error: unknown) => {
  return getErrorMessage(error, "대시보드 정보를 불러오지 못했습니다.");
};

const getFulfilledValue = <T>(result: PromiseSettledResult<T>) => {
  return result.status === "fulfilled" ? result.value : undefined;
};

const initialViewModel = createHomeDashboardViewModel(createEmptyDashboard());

export const useHomeDashboard = () => {
  const [viewModel, setViewModel] = useState<HomeDashboardViewModel>(initialViewModel);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadHomeDashboard = async () => {
      setIsLoading(true);

      try {
        const me = await getMe();
        const firstShopId = me?.shopMembers?.[0]?.shopId;

        if (!firstShopId) {
          throw new Error("연결된 매장이 없습니다.");
        }

        const today = getTodayDateKey();
        const [dashboardResult, weeklySalesResult, monthlySalesResult] =
          await Promise.allSettled([
            getCustomerDashboard(firstShopId, today),
            getQuarterlySalesPredict(firstShopId, { periodType: "DAY", predictionCount: 7 }),
            getQuarterlySalesPredict(firstShopId, { periodType: "MONTH", predictionCount: 1 }),
          ]);

        if (dashboardResult.status === "rejected") {
          throw dashboardResult.reason;
        }

        if (!ignore) {
          setViewModel(
            createHomeDashboardViewModel(
              dashboardResult.value,
              getFulfilledValue(weeklySalesResult),
              getFulfilledValue(monthlySalesResult)
            )
          );
          setErrorMessage("");
        }
      } catch (error) {
        if (!ignore) {
          setViewModel(createHomeDashboardViewModel(createEmptyDashboard()));
          setErrorMessage(getHomeDashboardErrorMessage(error));
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadHomeDashboard();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    viewModel,
    isLoading,
    errorMessage,
  };
};
