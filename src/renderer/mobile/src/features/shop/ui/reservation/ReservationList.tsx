import { useState, useEffect } from "react";
import { lightTheme } from "@design-tokens";
import type { ReservationStatus } from "@/features/shop/model/types/Reservation.types";
import { ReservationCard } from "./ReservationCard";
import { useGetShopReservationManageQuery } from "@/entities/shop/api/query/useShopReservationManage.query.ts";
import { useGetMyProfileQuery } from "@/entities/profile/api/query/useGetMyProfile.query.ts";

// 날짜 객체를 'YYYY-MM-DD' 문자열로 포맷팅하는 함수
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const ReservationList = () => {
  const myInfo = useGetMyProfileQuery();

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const formattedToday = formatDate(today);
  const formattedNextWeek = formatDate(nextWeek);
  const shopId = myInfo?.data?.shopMembers?.[0]?.shopId;
  const userId = myInfo?.data?.userId;

  const reservationManagementData = useGetShopReservationManageQuery(
    {
      shop_id: shopId ?? 0,
      designer_id: userId ?? 0,
      date: formattedToday,
      end_date: formattedNextWeek,
      status: "",
    },
    {
      enabled: typeof shopId === "number" && typeof userId === "number",
    }
  );

  const reservationList = reservationManagementData?.data?.reservations || [];

  const [statuses, setStatuses] = useState<Record<number, ReservationStatus>>({});

  useEffect(() => {
    if (reservationList.length > 0) {
      const initialStatuses = Object.fromEntries(
        reservationList.map(r => {
          const rawStatus = (r.status || "").toLowerCase();

          const validatedStatus = ["approve", "cancel", "pending", "reject"].includes(rawStatus)
            ? (rawStatus as ReservationStatus)
            : "approve";

          return [r.reservation_id, validatedStatus];
        })
      );
      setStatuses(initialStatuses);
    }
  }, [reservationList]);

  const handleStatusChange = (id: number, status: ReservationStatus) => {
    setStatuses(prev => ({ ...prev, [id]: status }));
  };

  return (
    <div
      className="flex flex-col gap-3 overflow-y-auto h-full px-4 py-4"
      style={{ backgroundColor: lightTheme.background.neutral }}
    >
      {reservationList.map(reservation => (
        <ReservationCard
          key={reservation.reservation_id}
          reservation={reservation}
          status={statuses[reservation.reservation_id] || "approve"}
          onStatusChange={status => handleStatusChange(reservation.reservation_id, status)}
        />
      ))}

      {reservationList.length === 0 && (
        <p className="text-center py-8 text-sm" style={{ color: lightTheme.label.assistive }}>
          예약 내역이 없습니다.
        </p>
      )}
    </div>
  );
};
