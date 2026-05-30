import type { Reservation } from "@/features/shop/model/types/Reservation.types";

export const RESERVATIONS: Reservation[] = [
  { id: "1", customerName: "오용준", date: "10/10", time: "10:00", cuts: ["남자", "다운펌"], status: "reject" },
  { id: "2", customerName: "오용준", date: "10/10", time: "10:00", cuts: ["남자", "다운펌"], status: "approve" },
  { id: "3", customerName: "오용준", date: "10/10", time: "10:00", cuts: ["남자", "다운펌"], status: "time-change" },
  { id: "4", customerName: "오용준", date: "10/10", time: "10:00", cuts: ["남자", "다운펌"], status: "reject" },
  { id: "5", customerName: "오용준", date: "10/10", time: "10:00", cuts: ["남자", "다운펌"], status: "reject" },
];