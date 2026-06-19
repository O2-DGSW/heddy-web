import { lightTheme, palette } from "@design-tokens";

import customerCountImage from "@/pages/home/assets/images/customer-count.png";
import monthlySalesImage from "@/pages/home/assets/images/monthly-sales.png";
import newRegularImage from "@/pages/home/assets/images/new-regular.png";
import riskCustomerImage from "@/pages/home/assets/images/risk-customer.png";
import todayReservationImage from "@/pages/home/assets/images/today-reservation.png";
import todayVisitImage from "@/pages/home/assets/images/today-visit.png";

const summaryTintColor = palette.main[97];

interface SummaryCardItem {
  title: string;
  value: string;
  unit: string;
  image: string;
  imageStyle: { left: number; top: number; width: number; height: number };
  textStyle: { left: number; top: number; width: number };
  align: "left" | "right";
  backgroundColor?: string;
  currency?: boolean;
}

interface CustomerGrade {
  label: string;
  value: number;
  percent: string;
  barWidth: number;
  valueLeft: number;
  color: string;
  valueColor?: string;
}

interface ReservationItem {
  time: string;
  customer: string;
  procedure: string;
  designer: string;
  selected: boolean;
}

const chartPoints = [
  { x: 52.2, y: 173 },
  { x: 155.6, y: 152.7 },
  { x: 259.1, y: 157.8 },
  { x: 362.5, y: 112.1 },
  { x: 465.9, y: 96.9 },
  { x: 569.4, y: 64.9 },
  { x: 672.8, y: 39 },
];

const summaryCards = [
  {
    title: "전체 고객 수",
    value: "1,244",
    unit: "명",
    image: customerCountImage,
    imageStyle: { left: 25, top: 39.5, width: 67.34, height: 64 },
    textStyle: { left: 121, top: 21.5, width: 104 },
    align: "right",
    backgroundColor: summaryTintColor,
  },
  {
    title: "이탈 위험 고객 수",
    value: "12",
    unit: "명",
    image: riskCustomerImage,
    imageStyle: { left: 149, top: 42.5, width: 71, height: 64 },
    textStyle: { left: 25, top: 20.5, width: 121 },
    align: "left",
  },
  {
    title: "오늘 예약자 수",
    value: "44",
    unit: "명",
    image: todayReservationImage,
    imageStyle: { left: 155, top: 40.5, width: 67, height: 67 },
    textStyle: { left: 25, top: 20.5, width: 100 },
    align: "left",
  },
  {
    title: "이달의 신규 단골 수",
    value: "14",
    unit: "명",
    image: newRegularImage,
    imageStyle: { left: 25, top: 39.5, width: 65.83, height: 68 },
    textStyle: { left: 91, top: 21.5, width: 134 },
    align: "right",
    backgroundColor: summaryTintColor,
  },
  {
    title: "오늘 방문자 수",
    value: "44",
    unit: "명",
    image: todayVisitImage,
    imageStyle: { left: 25, top: 39.5, width: 73, height: 67 },
    textStyle: { left: 125, top: 21.5, width: 100 },
    align: "right",
    backgroundColor: summaryTintColor,
  },
  {
    title: "이달의 예상 매출",
    value: "1,200,000",
    unit: "",
    image: monthlySalesImage,
    imageStyle: { left: 158, top: 43.5, width: 63, height: 63 },
    textStyle: { left: 25, top: 20.5, width: 131 },
    align: "left",
    currency: true,
  },
] satisfies SummaryCardItem[];

const customerGrades = [
  { label: "VVIP", value: 8, percent: "8%", barWidth: 54, valueLeft: 36, color: palette.main[30] },
  { label: "VIP", value: 8, percent: "16%", barWidth: 88, valueLeft: 68, color: palette.main[40] },
  { label: "골드", value: 8, percent: "34%", barWidth: 185, valueLeft: 167, color: palette.main[50] },
  { label: "실버", value: 8, percent: "34%", barWidth: 274, valueLeft: 256, color: palette.main[70] },
  {
    label: "일반",
    value: 8,
    percent: "34%",
    barWidth: 185,
    valueLeft: 165,
    color: palette.main[90],
    valueColor: lightTheme.label.assistive,
  },
] satisfies CustomerGrade[];

const reservations = [
  { time: "10:00", customer: "오용준", procedure: "다운펌", designer: "오용준", selected: true },
  { time: "10:00", customer: "오용준", procedure: "다운펌", designer: "오용준", selected: false },
  { time: "10:00", customer: "오용준", procedure: "다운펌", designer: "오용준", selected: false },
  { time: "10:00", customer: "오용준", procedure: "다운펌", designer: "오용준", selected: true },
  { time: "10:00", customer: "오용준", procedure: "다운펌", designer: "오용준", selected: true },
] satisfies ReservationItem[];

export type { CustomerGrade, ReservationItem, SummaryCardItem };
export { chartPoints, customerGrades, reservations, summaryCards };
