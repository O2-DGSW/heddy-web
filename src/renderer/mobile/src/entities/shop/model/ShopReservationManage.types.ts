export interface NoShowPrediction {
  no_show_score: number;
  risk_level: string;
  no_show_probability: number;
  model_version: string;
}

export interface ReservationItem {
  reservation_id: number;
  customer_id: number;
  customer_phone_number: string;
  shop_id: number;
  shop_name: string;
  designer_id: number;
  designer_name: string;
  reserved_at: string;
  changed_time: string;
  service_tags: string[];
  status: string;
  memo: string;
  created_at: string;
  no_show_prediction: NoShowPrediction;
}

export interface ShopReservationManageResponse {
  reservations: ReservationItem[];
}
