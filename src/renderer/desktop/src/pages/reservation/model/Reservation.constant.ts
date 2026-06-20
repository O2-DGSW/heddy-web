import { lightTheme } from "@design-tokens";

import {
  DESKTOP_PAGE_CONTENT_HEIGHT_REM,
  DESKTOP_PAGE_CONTENT_TOP_OFFSET_REM,
  DESKTOP_PAGE_CONTENT_WIDTH_REM,
  DESKTOP_PAGE_HORIZONTAL_PADDING_REM,
} from "@/shared/constants/Layout.constant";

import type {
  FilterTab,
  ReservationFilterKey,
  ReservationRecord,
  ReservationStatusKey,
} from "./Reservation.types";

export const RESERVATION_CONTENT_WIDTH_REM = DESKTOP_PAGE_CONTENT_WIDTH_REM;
export const RESERVATION_CONTENT_HEIGHT_REM = DESKTOP_PAGE_CONTENT_HEIGHT_REM;
export const RESERVATION_CONTENT_TOP_OFFSET_REM = DESKTOP_PAGE_CONTENT_TOP_OFFSET_REM;
export const RESERVATION_PAGE_HORIZONTAL_PADDING_REM = DESKTOP_PAGE_HORIZONTAL_PADDING_REM;
export const DESKTOP_BAR_WIDTH_REM = 4.25;
export const TOP_BAR_HEIGHT_REM = 4.25;
export const MIN_RESERVATION_SCALE = 0.32;

export const RESERVATION_WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

export const DEFAULT_RESERVATION_DATE_KEY = "2026-05-04";

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

export const RESERVATION_RECORDS: ReservationRecord[] = [
  {
    id: 1,
    customerName: "오용준",
    service: "다운펌",
    dateKey: "2026-05-04",
    dateLabel: "5월 4일",
    time: "10:00",
    tags: ["# 남자", "# 다운펌"],
    request: "앞머리 길게 해주세요",
    status: "rejected",
  },
  {
    id: 2,
    customerName: "김서윤",
    service: "레이어드컷",
    dateKey: "2026-05-04",
    dateLabel: "5월 4일",
    time: "11:30",
    tags: ["# 여자", "# 컷"],
    request: "볼륨은 살리고 싶어요",
    status: "approved",
  },
  {
    id: 3,
    customerName: "한지민",
    service: "염색",
    dateKey: "2026-05-04",
    dateLabel: "5월 4일",
    time: "14:00",
    requestedTime: "15:00",
    tags: ["# 여자", "# 염색"],
    request: "붉은기 없는 브라운으로 부탁드려요",
    status: "changeRequest",
  },
  {
    id: 4,
    customerName: "오용준",
    service: "다운펌",
    dateKey: "2026-05-05",
    dateLabel: "5월 5일",
    time: "10:00",
    requestedTime: "11:00",
    tags: ["# 남자", "# 다운펌"],
    request: "사이드가 뜨지 않게 부탁드려요",
    status: "changeRequest",
  },
  {
    id: 5,
    customerName: "박준호",
    service: "가르마펌",
    dateKey: "2026-05-06",
    dateLabel: "5월 6일",
    time: "13:00",
    tags: ["# 남자", "# 펌"],
    request: "자연스럽게 컬 넣어주세요",
    status: "approved",
  },
  {
    id: 6,
    customerName: "이채은",
    service: "클리닉",
    dateKey: "2026-05-07",
    dateLabel: "5월 7일",
    time: "16:00",
    tags: ["# 여자", "# 클리닉"],
    request: "손상모 집중 케어 원해요",
    status: "approved",
  },
  {
    id: 7,
    customerName: "정하윤",
    service: "셋팅펌",
    dateKey: "2026-05-08",
    dateLabel: "5월 8일",
    time: "12:30",
    requestedTime: "13:30",
    tags: ["# 여자", "# 펌"],
    request: "컬은 굵게 부탁드려요",
    status: "changeRequest",
  },
  {
    id: 8,
    customerName: "최민석",
    service: "컷",
    dateKey: "2026-05-09",
    dateLabel: "5월 9일",
    time: "15:30",
    tags: ["# 남자", "# 컷"],
    request: "옆머리 투블럭은 너무 짧지 않게 해주세요",
    status: "rejected",
  },
  {
    id: 9,
    customerName: "송예린",
    service: "볼륨매직",
    dateKey: "2026-05-10",
    dateLabel: "5월 10일",
    time: "17:00",
    tags: ["# 여자", "# 매직"],
    request: "뿌리 볼륨은 살려주세요",
    status: "approved",
  },
  {
    id: 10,
    customerName: "문도윤",
    service: "다운펌",
    dateKey: "2026-06-02",
    dateLabel: "6월 2일",
    time: "10:30",
    tags: ["# 남자", "# 다운펌"],
    request: "옆 라인 정리도 같이 부탁드려요",
    status: "approved",
  },
  {
    id: 11,
    customerName: "서가은",
    service: "레이어드컷",
    dateKey: "2026-06-05",
    dateLabel: "6월 5일",
    time: "13:30",
    requestedTime: "14:30",
    tags: ["# 여자", "# 컷"],
    request: "얼굴선 가려지게 부탁드려요",
    status: "changeRequest",
  },
];

export const RESERVATION_FILTER_STATUS_MAP: Record<ReservationFilterKey, ReservationStatusKey[]> = {
  all: ["approved", "rejected", "changeRequest"],
  rejected: ["rejected"],
  approved: ["approved"],
  changeRequest: ["changeRequest"],
};
