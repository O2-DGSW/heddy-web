import { lightTheme } from "@design-tokens";

import type {
  CalendarDate,
  FilterTab,
  Reservation,
  ReservationStatusRow,
} from "./Reservation.types";

export const RESERVATION_CONTENT_WIDTH_REM = 85.0625;
export const RESERVATION_CONTENT_HEIGHT_REM = 51.875;
export const RESERVATION_CONTENT_TOP_OFFSET_REM = 2.625;
export const RESERVATION_PAGE_HORIZONTAL_PADDING_REM = 2.5;
export const DESKTOP_BAR_WIDTH_REM = 4.25;
export const TOP_BAR_HEIGHT_REM = 4.25;
export const MIN_RESERVATION_SCALE = 0.01;

export const DROPDOWN_FILTER =
  "brightness(0) saturate(100%) invert(36%) sepia(7%) saturate(235%) hue-rotate(169deg) brightness(94%) contrast(88%)";

export const RESERVATION_WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

export const RESERVATION_CALENDAR_ROWS: CalendarDate[][] = [
  [
    { day: "28", muted: true },
    { day: "29", muted: true },
    { day: "30", muted: true },
    { day: "31", muted: true },
    { day: "1" },
    { day: "2" },
    { day: "3" },
  ],
  [
    { day: "4", selected: true },
    { day: "5" },
    { day: "6" },
    { day: "7" },
    { day: "8" },
    { day: "9" },
    { day: "10" },
  ],
  [
    { day: "11" },
    { day: "12" },
    { day: "13" },
    { day: "14" },
    { day: "15" },
    { day: "16" },
    { day: "17" },
  ],
  [
    { day: "18" },
    { day: "19" },
    { day: "20" },
    { day: "21" },
    { day: "22" },
    { day: "23" },
    { day: "24" },
  ],
  [
    { day: "25" },
    { day: "26" },
    { day: "27" },
    { day: "28" },
    { day: "29" },
    { day: "30" },
    { day: "1", muted: true },
  ],
];

export const RESERVATION_LIST: Reservation[] = [
  { id: 1, name: "오용준", date: "10월 10일", time: "10:00", tags: ["# 남자", "# 다운펌"] },
  { id: 2, name: "오용준", date: "10월 10일", time: "10:00", tags: ["# 남자", "# 다운펌"] },
  { id: 3, name: "오용준", date: "10월 10일", time: "10:00", tags: ["# 남자", "# 다운펌"] },
];

export const RESERVATION_FILTER_TABS: FilterTab[] = [
  { label: "전체", active: true },
  { label: "거절" },
  { label: "변경 요청" },
];

export const RESERVATION_STATUS_ROWS: ReservationStatusRow[] = [
  { id: 1, request: "앞머리 길게 해주세요", status: "거절", statusColor: lightTheme.status.error },
  {
    id: 2,
    request: "앞머리 길게 해주세요",
    status: "시간 변경",
    statusColor: lightTheme.status.warning,
  },
  {
    id: 3,
    request: "앞머리 길게 해주세요ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ",
    status: "거절",
    statusColor: lightTheme.status.error,
  },
  {
    id: 4,
    request: "앞머리 길게 해주세요",
    status: "승인",
    statusColor: lightTheme.status.success,
  },
  { id: 5, request: "앞머리 길게 해주세요", status: "거절", statusColor: lightTheme.status.error },
];
