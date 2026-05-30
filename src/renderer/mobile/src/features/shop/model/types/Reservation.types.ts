export type ReservationStatus = "approve" | "reject" | "time-change";

export type Reservation = {
  id: string;
  customerName: string;
  avatar: string;
  date: string;
  time: string;
  cuts: string[];
  status: ReservationStatus;
};