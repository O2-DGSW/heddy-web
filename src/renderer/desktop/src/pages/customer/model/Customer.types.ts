export type CustomerRiskLevel = "normal" | "caution" | "risk";
export type CustomerFilterKey = "all" | CustomerRiskLevel;
export type CustomerSortKey = "recent" | "oldest";

export interface CustomerSummary {
  id: CustomerRiskLevel;
  title: string;
  count: number;
  image: string;
  color: string;
  shadowColor: string;
}

export interface CustomerFilter {
  key: CustomerFilterKey;
  label: string;
  active?: boolean;
}

export interface CustomerSortOption {
  key: CustomerSortKey;
  label: string;
}

export interface CustomerDesignerOption {
  id: string;
  name: string;
}

export interface CustomerRow {
  id: number;
  customerId: string;
  name: string;
  phone: string;
  lastVisit: string;
  daysSinceLastVisit: number;
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
  searchQuery: string;
  isLoading: boolean;
  emptyMessage: string;
  sortLabel: string;
  sortOptions: CustomerSortOption[];
  designerOptions: CustomerDesignerOption[];
  isSortMenuOpen: boolean;
  openDesignerMenuRowId: number | null;
  onChangeSearchQuery: (query: string) => void;
  onSelectFilter: (filter: CustomerFilterKey) => void;
  onToggleSortMenu: () => void;
  onSelectSort: (sort: CustomerSortKey) => void;
  onToggleDesignerMenu: (rowId: number) => void;
  onSelectDesigner: (rowId: number, designer: string) => void;
}
