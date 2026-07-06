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

  return (
    <div
      className="flex items-center gap-3 p-4 rounded-2xl"
      style={{ backgroundColor: lightTheme.background.normal }}
    >
      <div
        className="w-12 h-12 shrink-0 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold"
        style={{ color: lightTheme.label.assistive }}
      >
        User
      </div>

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
          {reservation.service_tags.map(tag => (
            <CutsTag key={tag} text={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};
