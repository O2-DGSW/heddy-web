import type { CalendarViewMode } from "./types";

export const DEFAULT_WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

export const CALENDAR_VIEW_MODE_OPTIONS: Array<{ label: string; value: CalendarViewMode }> = [
  { label: "한달", value: "month" },
  { label: "일주일", value: "week" },
];
