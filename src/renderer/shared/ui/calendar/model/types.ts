export type CalendarVariant = "desktop" | "mobile";
export type CalendarViewMode = "month" | "week";

export interface CalendarDate {
  date: string;
  day: string;
  muted?: boolean;
  markerCount?: number;
}

export interface CalendarProps {
  initialMonthDate?: string;
  markerMap?: Record<string, number>;
  monthDate?: string;
  selectedDate?: string;
  variant?: CalendarVariant;
  viewMode?: CalendarViewMode;
  weekDays?: string[];
  className?: string;
  onChangeViewMode?: (mode: CalendarViewMode) => void;
  onMonthChange?: (date: string) => void;
  onSelectDate?: (date: string) => void;
}

export interface CalendarViewProps
  extends Omit<
    CalendarProps,
    "initialMonthDate" | "markerMap" | "monthDate" | "onMonthChange" | "variant"
  > {
  calendarRows: CalendarDate[][];
  displayedMonthDate: string;
  weekDays: string[];
  onChangeMonth: (date: string) => void;
}
