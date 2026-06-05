import { lightTheme } from "@design-tokens";

import cautionCustomersImage from "@/pages/customer/assets/caution-customers.png";
import normalCustomersImage from "@/pages/customer/assets/normal-customers.png";
import riskCustomersImage from "@/pages/customer/assets/risk-customers.png";

import type { CustomerFilter, CustomerRow, CustomerSummary } from "./Customer.types";

export const CUSTOMER_CONTENT_WIDTH_REM = 85.0625;
export const CUSTOMER_CONTENT_HEIGHT_REM = 51.875;
export const CUSTOMER_CONTENT_TOP_OFFSET_REM = 2.625;
export const CUSTOMER_CONTENT_BOTTOM_OFFSET_REM = 2.5625;
export const CUSTOMER_PAGE_LEFT_PADDING_REM = 2.5625;
export const CUSTOMER_PAGE_RIGHT_PADDING_REM = 2.5;
export const MIN_CUSTOMER_SCALE = 0.32;

export const DROPDOWN_FILTER =
  "brightness(0) saturate(100%) invert(36%) sepia(7%) saturate(235%) hue-rotate(169deg) brightness(94%) contrast(88%)";

export const CUSTOMER_SUMMARIES: CustomerSummary[] = [
  {
    id: "normal",
    title: "정상 고객 수",
    count: 12,
    image: normalCustomersImage,
    color: lightTheme.primary.normal,
    shadowColor: lightTheme.primary.normal,
  },
  {
    id: "caution",
    title: "이탈 주의 고객 수",
    count: 12,
    image: cautionCustomersImage,
    color: lightTheme.status.warning,
    shadowColor: lightTheme.status.warning,
  },
  {
    id: "risk",
    title: "이탈 위험 고객 수",
    count: 12,
    image: riskCustomersImage,
    color: lightTheme.status.error,
    shadowColor: lightTheme.status.error,
  },
];

export const CUSTOMER_FILTERS: CustomerFilter[] = [
  { label: "전체", active: true },
  { label: "정상" },
  { label: "주의" },
  { label: "위험" },
];

export const CUSTOMER_ROWS: CustomerRow[] = [
  {
    id: 1,
    name: "오용준",
    phone: "010-1234-5678",
    lastVisit: "10/10",
    visitCycle: "약 28일",
    riskPercent: 84,
    riskLevel: "risk",
    tags: ["# 남자", "# 다운펌"],
    totalVisits: "14회",
    designer: "오용준",
  },
  {
    id: 2,
    name: "오용준",
    phone: "010-1234-5678",
    lastVisit: "10/10",
    visitCycle: "약 28일",
    riskPercent: 10,
    riskLevel: "normal",
    tags: ["# 남자", "# 다운펌"],
    totalVisits: "14회",
    designer: "오용준",
  },
  {
    id: 3,
    name: "오용준",
    phone: "010-1234-5678",
    lastVisit: "10/10",
    visitCycle: "약 28일",
    riskPercent: 50,
    riskLevel: "caution",
    tags: ["# 남자", "# 다운펌"],
    totalVisits: "14회",
    designer: "오용준",
  },
  {
    id: 4,
    name: "오용준",
    phone: "010-1234-5678",
    lastVisit: "10/10",
    visitCycle: "약 28일",
    riskPercent: 50,
    riskLevel: "caution",
    tags: ["# 남자", "# 다운펌"],
    totalVisits: "14회",
    designer: "오용준",
  },
  {
    id: 5,
    name: "오용준",
    phone: "010-1234-5678",
    lastVisit: "10/10",
    visitCycle: "약 28일",
    riskPercent: 10,
    riskLevel: "normal",
    tags: ["# 남자", "# 다운펌"],
    totalVisits: "14회",
    designer: "오용준",
  },
];
