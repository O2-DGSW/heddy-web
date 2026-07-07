import { lightTheme } from "@design-tokens";

import {
  DESKTOP_PAGE_CONTENT_HEIGHT_REM,
  DESKTOP_PAGE_CONTENT_TOP_OFFSET_REM,
  DESKTOP_PAGE_CONTENT_WIDTH_REM,
  DESKTOP_PAGE_HORIZONTAL_PADDING_REM,
} from "@/shared/constants/Layout.constant";

import type { FilterTab, ReservationFilterKey, ReservationStatusKey } from "./Reservation.types";

export const RESERVATION_CONTENT_WIDTH_REM = DESKTOP_PAGE_CONTENT_WIDTH_REM;
export const RESERVATION_NAVIGATION_PANEL_WIDTH_REM = 31;
export const RESERVATION_PANEL_GAP_REM = 1;
export const RESERVATION_STATUS_PANEL_MIN_WIDTH_REM =
  RESERVATION_CONTENT_WIDTH_REM -
  RESERVATION_NAVIGATION_PANEL_WIDTH_REM -
  RESERVATION_PANEL_GAP_REM;
export const RESERVATION_CONTENT_HEIGHT_REM = DESKTOP_PAGE_CONTENT_HEIGHT_REM;
export const RESERVATION_CONTENT_TOP_OFFSET_REM = DESKTOP_PAGE_CONTENT_TOP_OFFSET_REM;
export const RESERVATION_PAGE_HORIZONTAL_PADDING_REM = DESKTOP_PAGE_HORIZONTAL_PADDING_REM;
export const DESKTOP_BAR_WIDTH_REM = 4.25;
export const TOP_BAR_HEIGHT_REM = 4.25;
export const MIN_RESERVATION_SCALE = 0.32;

export const RESERVATION_WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

export const RESERVATION_FILTER_TAB_DEFINITIONS: Omit<FilterTab, "active">[] = [
  { key: "all", label: "전체" },
  { key: "rejected", label: "거절" },
  { key: "approved", label: "승인" },
  { key: "changeRequest", label: "변경 요청" },
];

export const RESERVATION_TIME_OPTIONS = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

export const RESERVATION_STATUS_META: Record<
  ReservationStatusKey,
  { color: string; chipLabel: string; optionLabel: string; textColor: string }
> = {
  approved: {
    color: lightTheme.status.success,
    chipLabel: "승인",
    optionLabel: "승인",
    textColor: lightTheme.background.normal,
  },
  rejected: {
    color: lightTheme.status.error,
    chipLabel: "거절",
    optionLabel: "거절",
    textColor: lightTheme.label.buttonText,
  },
  changeRequest: {
    color: lightTheme.status.warning,
    chipLabel: "변경 요청",
    optionLabel: "변경 요청",
    textColor: lightTheme.label.buttonText,
  },
};

export const RESERVATION_STATUS_CYCLE: ReservationStatusKey[] = [
  "approved",
  "rejected",
  "changeRequest",
];

export const RESERVATION_FILTER_STATUS_MAP: Record<ReservationFilterKey, ReservationStatusKey[]> = {
  all: ["approved", "rejected", "changeRequest"],
  rejected: ["rejected"],
  approved: ["approved"],
  changeRequest: ["changeRequest"],
};
