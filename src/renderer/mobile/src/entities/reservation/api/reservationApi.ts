import { api, type ApiResponse } from "@heddy/api";
import type {
  ReservationRequest,
  ReservationResponse,
} from "@/entities/reservation/model/Reservation.types.ts";

export const reservationApi = {
  // 매개변수로 ReservationRequest 타입을 받아서 body로 넘겨주도록 수정했습니다.
  postReservation: async (body: ReservationRequest) => {
    return await api.post<ApiResponse<ReservationResponse>>(`/treatment-records/register`, body);
  },
};
