export interface CalendarDate {
  day: string;
  muted?: boolean;
  selected?: boolean;
}

export interface Reservation {
  id: number;
  name: string;
  date: string;
  time: string;
  tags: string[];
}

export interface FilterTab {
  label: string;
  active?: boolean;
}

export interface ReservationStatusRow {
  id: number;
  request: string;
  status: string;
  statusColor: string;
}

export interface ReservationCalendarProps {
  weekDays: string[];
  calendarRows: CalendarDate[][];
}

export interface ReservationCardListProps {
  reservations: Reservation[];
}

export interface ReservationNavigationPanelProps
  extends ReservationCalendarProps, ReservationCardListProps {}

export interface ReservationStatusPanelProps {
  filterTabs: FilterTab[];
  rows: ReservationStatusRow[];
}
