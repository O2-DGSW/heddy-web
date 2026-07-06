export interface ReservationRequest {
  shop_id: number;
  designerId: number;
  reserved_at: string;
  service_tags: string[];
  memo: string;
}

export interface NoShowPrediction {
  no_show_score: number;
  risk_level: string;
  no_show_probability: number;
  model_version: string;
}

export interface ReservationResponse {
  reservation_id: number;
  customer_id: number;
  customer_phone_number: string;
  shop_id: number;
  shop_name: string;
  designer_id: number;
  designer_name: string;
  reserved_at: string; // ISO 8601 날짜 문자열
  changed_time: string; // ISO 8601 날짜 문자열
  service_tags: string[];
  status: string;
  memo: string;
  created_at: string; // ISO 8601 날짜 문자열
  no_show_prediction: NoShowPrediction;
}
