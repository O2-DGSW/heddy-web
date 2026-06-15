import { font, lightTheme } from "@design-tokens";

import { CutsTag } from "@/private/shared/ui/cuts-tag/CutsTag";
import type { Reservation, ReservationStatus } from "@/features/shop/model/types/Reservation.types";

import DateIcon from "@/features/shop/assets/reservation/Date.svg?react";
import TimeIcon from "@/features/shop/assets/reservation/Time.svg?react";

import { ReservationStatusDropdown } from "./ReservationStatusDropdown";

interface ReservationCardProps {
  reservation: Reservation;
  status: ReservationStatus;
  onStatusChange: (status: ReservationStatus) => void;
}

export const ReservationCard = ({ reservation, status, onStatusChange }: ReservationCardProps) => {
  return (
    <div
      className="flex items-center gap-3 p-4 rounded-2xl"
      style={{ backgroundColor: lightTheme.background.normal }}
    >
      <img
        src={reservation.avatar}
        alt={`${reservation.customerName} 프로필`}
        className="w-12 h-12 shrink-0 rounded-full object-cover"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className={`truncate ${font.headline2.semiBold}`} style={{ color: lightTheme.label.normal }}>
            {reservation.customerName} 님
          </span>
          <ReservationStatusDropdown value={status} onChange={onStatusChange} />
        </div>

        <div className="flex items-center gap-1.5 mt-1">
          <DateIcon className="w-3.5 h-3.5 shrink-0" />
          <span className={font.caption.regular} style={{ color: lightTheme.label.assistive }}>
            {reservation.date}
          </span>
          <span className={font.caption.regular} style={{ color: lightTheme.label.assistive }}>·</span>
          <TimeIcon className="w-3.5 h-3.5 shrink-0" />
          <span className={font.caption.regular} style={{ color: lightTheme.label.assistive }}>
            {reservation.time}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-2">
          {reservation.cuts.map((cut) => (
            <CutsTag key={cut} text={cut} />
          ))}
        </div>
      </div>
    </div>
  );
};