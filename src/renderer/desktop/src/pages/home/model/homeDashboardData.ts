import { lightTheme, palette } from "@design-tokens";

import customerCountImage from "@/pages/home/assets/images/customer-count.png";
import monthlySalesImage from "@/pages/home/assets/images/monthly-sales.png";
import newRegularImage from "@/pages/home/assets/images/new-regular.png";
import riskCustomerImage from "@/pages/home/assets/images/risk-customer.png";
import todayReservationImage from "@/pages/home/assets/images/today-reservation.png";
import todayVisitImage from "@/pages/home/assets/images/today-visit.png";

interface SummaryCardDefinition {
  title: string;
  unit: string;
  image: string;
  imageStyle: { left: number; top: number; width: number; height: number };
  textStyle: { left: number; top: number; width: number };
  align: "left" | "right";
  backgroundColor?: string;
  currency?: boolean;
}

interface SummaryCardItem extends SummaryCardDefinition {
  value: string;
}

interface CustomerGradeDefinition {
  label: string;
  color: string;
  valueColor?: string;
}

interface CustomerGrade extends CustomerGradeDefinition {
  label: string;
  value: number;
  percent: string;
  barWidth: number;
  valueLeft: number;
}

interface ReservationItem {
  id?: string;
  time: string;
  customer: string;
  procedure: string;
  designer: string;
  selected: boolean;
  statusLabel: string;
  statusColor?: string;
  statusTextColor?: string;
}

interface RevenueChartPoint {
  x: number;
  y: number;
}

interface RevenueChartData {
  totalValue: string;
  axisLabels: string[];
  xLabels: string[];
  points: RevenueChartPoint[];
}

const summaryTintColor = palette.main[97];

const summaryCardDefinitions = [
  {
    title: "전체 고객 수",
    unit: "명",
    image: customerCountImage,
    imageStyle: { left: 25, top: 39.5, width: 67.34, height: 64 },
    textStyle: { left: 121, top: 21.5, width: 104 },
    align: "right",
    backgroundColor: summaryTintColor,
  },
  {
    title: "이탈 위험 고객 수",
    unit: "명",
    image: riskCustomerImage,
    imageStyle: { left: 149, top: 42.5, width: 71, height: 64 },
    textStyle: { left: 25, top: 20.5, width: 121 },
    align: "left",
  },
  {
    title: "오늘 예약자 수",
    unit: "명",
    image: todayReservationImage,
    imageStyle: { left: 155, top: 40.5, width: 67, height: 67 },
    textStyle: { left: 25, top: 20.5, width: 100 },
    align: "left",
  },
  {
    title: "이달의 신규 단골 수",
    unit: "명",
    image: newRegularImage,
    imageStyle: { left: 25, top: 39.5, width: 65.83, height: 68 },
    textStyle: { left: 91, top: 21.5, width: 134 },
    align: "right",
    backgroundColor: summaryTintColor,
  },
  {
    title: "오늘 방문자 수",
    unit: "명",
    image: todayVisitImage,
    imageStyle: { left: 25, top: 39.5, width: 73, height: 67 },
    textStyle: { left: 125, top: 21.5, width: 100 },
    align: "right",
    backgroundColor: summaryTintColor,
  },
  {
    title: "이달의 예상 매출",
    unit: "",
    image: monthlySalesImage,
    imageStyle: { left: 158, top: 43.5, width: 63, height: 63 },
    textStyle: { left: 25, top: 20.5, width: 131 },
    align: "left",
    currency: true,
  },
] satisfies SummaryCardDefinition[];

const customerGradeDefinitions = [
  { label: "VVIP", color: palette.main[30] },
  { label: "VIP", color: palette.main[40] },
  { label: "골드", color: palette.main[50] },
  { label: "실버", color: palette.main[70] },
  {
    label: "일반",
    color: palette.main[90],
    valueColor: lightTheme.label.assistive,
  },
] satisfies CustomerGradeDefinition[];

export type {
  CustomerGrade,
  CustomerGradeDefinition,
  ReservationItem,
  RevenueChartData,
  RevenueChartPoint,
  SummaryCardDefinition,
  SummaryCardItem,
};
export { customerGradeDefinitions, summaryCardDefinitions };
