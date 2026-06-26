export interface ReservationRequest {
  shop_id: number;
  designer_id: number;
  reserved_at: string;
  service_tag: string[];
  memo: string;
}
