import type { ReservationStatus } from "@/features/shop/model/types/Reservation.types.ts";
import { lightTheme } from "@design-tokens";

export const STATUS_CONFIG: Record<ReservationStatus, { label: string; bgColor: string }> = {
  approve: { label: "승인", bgColor: lightTheme.primary.normal },
  reject: { label: "거절", bgColor: lightTheme.status.error },
  "time-change": { label: "시간변경", bgColor: lightTheme.status.warning },
  pending: { label: "대기", bgColor: lightTheme.fill.neutral },
  canceled: { label: "취소", bgColor: lightTheme.line.normal },
  visited: { label: "방문완료", bgColor: "#10B981" },
  "no-show": { label: "노쇼", bgColor: "#EF4444" },
};
