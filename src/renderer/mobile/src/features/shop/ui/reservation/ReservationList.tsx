import { useState } from "react";

import { lightTheme } from "@design-tokens";

import { RESERVATIONS } from "@/features/shop/constrants/reservations";
import type { ReservationStatus } from "@/features/shop/model/types/Reservation.types";

import { ReservationCard } from "./ReservationCard";

export const ReservationList = () => {
  const [statuses, setStatuses] = useState<Record<string, ReservationStatus>>(
    () => Object.fromEntries(RESERVATIONS.map((r) => [r.id, r.status]))
  );

  const handleStatusChange = (id: string, status: ReservationStatus) => {
    setStatuses((prev) => ({ ...prev, [id]: status }));
  };

  return (
    <div
      className="flex flex-col gap-3 overflow-y-auto h-full px-4 py-4"
      style={{ backgroundColor: lightTheme.background.neutral }}
    >
      {RESERVATIONS.map((reservation) => (
        <ReservationCard
          key={reservation.id}
          reservation={reservation}
          status={statuses[reservation.id]}
          onStatusChange={(status) => handleStatusChange(reservation.id, status)}
        />
      ))}
    </div>
  );
};