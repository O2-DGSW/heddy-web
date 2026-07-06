import { api } from "@/shared/api";

type ApiError = { code: string; message: string } | null;

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  error: ApiError;
};

export type ReservationApiStatus = "APPROVED" | "REJECTED" | "CHANGE_REQUEST" | (string & {});

export type NoShowPredictionResponse = {
  no_show_score?: number;
  risk_level?: string;
  no_show_probability?: number;
  model_version?: string;
};

export type ReservationResponse = {
  reservation_id: number;
  customer_id: number;
  customer_name?: string | null;
  customer_phone_number?: string;
  shop_id: number;
  shop_name: string;
  designer_id: number;
  designer_name: string;
  reserved_at: string;
  changed_time?: string | null;
  service_tags?: string[];
  service_name?: string;
  status: string;
  memo?: string | null;
  created_at: string;
  no_show_prediction?: NoShowPredictionResponse | null;
};

type ShopReservationsResponse = {
  reservations: ReservationResponse[];
};

export type GetReservationsParams = {
  shopId: number;
  date: string;
  endDate?: string;
  designerId?: number;
  status?: string;
};

export type CreateReservationRequest = {
  shop_id: number;
  designer_id: number;
  reserved_at: string;
  service_tags: string[];
  memo?: string;
};

export type UpdateReservationStatusRequest = {
  status: ReservationApiStatus;
  designer_id?: number;
  changed_time?: string;
};

export const getReservations = async ({
  shopId,
  date,
  endDate,
  designerId,
  status,
}: GetReservationsParams) => {
  const res = await api.get<ApiResponse<ShopReservationsResponse>>("/reservations", {
    params: {
      shop_id: shopId,
      date,
      end_date: endDate,
      designer_id: designerId,
      status,
    },
  });

  if (!res.data.success) {
    throw new Error(
      res.data.error?.message || res.data.message || "예약 목록을 불러오지 못했습니다."
    );
  }

  return res.data.data.reservations;
};

export const createReservation = async (body: CreateReservationRequest) => {
  const res = await api.post<ApiResponse<ReservationResponse>>("/reservations/register", body);

  if (!res.data.success) {
    throw new Error(res.data.error?.message || res.data.message || "예약을 등록하지 못했습니다.");
  }

  return res.data.data;
};

export const updateReservationStatus = async (
  reservationId: number,
  body: UpdateReservationStatusRequest
) => {
  const res = await api.patch<ApiResponse<ReservationResponse>>(
    `/reservations/${reservationId}/update-status`,
    body
  );

  if (!res.data.success) {
    throw new Error(
      res.data.error?.message || res.data.message || "예약 상태를 변경하지 못했습니다."
    );
  }

  return res.data.data;
};
