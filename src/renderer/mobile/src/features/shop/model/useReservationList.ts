import { useState, useEffect } from "react";
import type { ReservationStatus } from "@/features/shop/model/types/Reservation.types";
import { useGetShopReservationManageQuery } from "@/entities/shop/api/query/useShopReservationManage.query.ts";
import { useGetMyProfileQuery } from "@/entities/profile/api/query/useGetMyProfile.query.ts";

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const useReservationList = () => {
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

  return {
    reservationList,
    statuses,
    handleStatusChange,
  };
};
