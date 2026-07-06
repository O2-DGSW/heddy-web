import { font, lightTheme } from "@design-tokens";
import { CutsTag } from "@/private/shared/ui/cuts-tag/CutsTag";
import type { ReservationStatus } from "@/features/shop/model/types/Reservation.types";

import DateIcon from "@/features/shop/assets/reservation/Date.svg?react";
import TimeIcon from "@/features/shop/assets/reservation/Time.svg?react";
import type { ReservationItem } from "@/entities/shop/model/ShopReservationManage.types.ts";
import { ReservationStatusDropdown } from "./ReservationStatusDropdown";

interface ReservationCardProps {
  reservation: ReservationItem;
  status: ReservationStatus;
  onStatusChange: (status: ReservationStatus) => void;
}

export const ReservationCard = ({ reservation, status, onStatusChange }: ReservationCardProps) => {
  const [datePart, timePart] = reservation.reserved_at.split("T");
  const formattedTime = timePart ? timePart.slice(0, 5) : "";

  const HairTagMap = {
    MALE: "남자",
    FEMALE: "여성",
    FIRST_VISIT: "첫방문",
    CUT: "컷트",
    BANGS_CUT: "앞머리",
    LAYERED_CUT: "레이어드",
    MALE_CUT: "남자컷",
    PERM: "펌",
    DOWN_PERM: "다운펌",
    VOLUME_PERM: "볼륨펌",
    SETTING_PERM: "셋팅펌",
    AS_PERM: "애즈펌",
    IRON_PERM: "아이롱펌",
    STRAIGHT_PERM: "매직",
    VOLUME_STRAIGHT: "볼륨매직",
    COLORING: "염색",
    ROOT_COLORING: "뿌리염색",
    TONE_DOWN: "톤다운",
    BLEACH: "탈색",
    CLINIC: "클리닉",
    CARE: "케어",
    SCALP: "두피",
    SCALP_CARE: "두피케어",
    SPA: "스파",
    RECOVERY: "복구",
    STYLING: "스타일링",
    DRY: "드라이",
    CONSULTATION: "상담",
    RESERVATION: "예약",
  } as const;

  return (
    <div
      className="flex items-center gap-3 p-4 rounded-2xl"
      style={{ backgroundColor: lightTheme.background.normal }}
    >
      <div
        className="w-12 h-12 shrink-0 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold"
        style={{ color: lightTheme.label.assistive }}
      ></div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`truncate ${font.headline2.semiBold}`}
            style={{ color: lightTheme.label.normal }}
          >
            고객 {reservation.customer_id} 님
          </span>
          <ReservationStatusDropdown value={status} onChange={onStatusChange} />
        </div>

        <div className="flex items-center gap-1.5 mt-1">
          <DateIcon className="w-3.5 h-3.5 shrink-0" />
          <span className={font.caption.regular} style={{ color: lightTheme.label.assistive }}>
            {datePart}
          </span>
          <span className={font.caption.regular} style={{ color: lightTheme.label.assistive }}>
            ·
          </span>
          <TimeIcon className="w-3.5 h-3.5 shrink-0" />
          <span className={font.caption.regular} style={{ color: lightTheme.label.assistive }}>
            {formattedTime}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-2">
          {reservation.service_tags.map(tag => {
            const convertedTag = HairTagMap[tag as keyof typeof HairTagMap] || tag;

            return <CutsTag key={tag} text={convertedTag} />;
          })}
        </div>
      </div>
    </div>
  );
};
