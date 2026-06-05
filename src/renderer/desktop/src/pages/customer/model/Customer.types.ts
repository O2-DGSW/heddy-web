export type CustomerRiskLevel = "normal" | "caution" | "risk";

export interface CustomerSummary {
  id: CustomerRiskLevel;
  title: string;
  count: number;
  image: string;
  color: string;
  shadowColor: string;
}

export interface CustomerFilter {
  label: string;
  active?: boolean;
}

export interface CustomerRow {
  id: number;
  name: string;
  phone: string;
  lastVisit: string;
  visitCycle: string;
  riskPercent: number;
  riskLevel: CustomerRiskLevel;
  tags: string[];
  totalVisits: string;
  designer: string;
}

export interface CustomerSummaryCardsProps {
  summaries: CustomerSummary[];
}

export interface CustomerTableProps {
  filters: CustomerFilter[];
  rows: CustomerRow[];
}
