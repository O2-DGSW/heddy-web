import { lightTheme } from "@design-tokens";
import { ReservationCard } from "./ReservationCard";
import { useReservationList } from "@/features/shop/model/useReservationList.ts";
import type { ReservationStatus } from "@/features/shop/model/types/Reservation.types";

export const ReservationList = () => {
  const { reservationList, handleStatusChange } = useReservationList();

  const statusMap: Record<string, ReservationStatus> = {
    APPROVED: "approve",
    REJECTED: "reject",
    TIME_CHANGED: "time-change",
  };

  return (
    <div
      className="flex flex-col gap-3 overflow-y-auto h-full px-4 py-4"
      style={{ backgroundColor: lightTheme.background.neutral }}
    >
      {reservationList.map(reservation => {
        const currentStatus =
          statusMap[reservation.status] || (reservation.status.toLowerCase() as ReservationStatus);

        return (
          <ReservationCard
            key={reservation.reservation_id}
            reservation={reservation}
            status={currentStatus}
            onStatusChange={status => handleStatusChange(reservation.reservation_id, status)}
          />
        );
      })}

      {reservationList.length === 0 && (
        <p className="text-center py-8 text-sm" style={{ color: lightTheme.label.assistive }}>
          예약 내역이 없습니다.
        </p>
      )}
    </div>
  );
};
