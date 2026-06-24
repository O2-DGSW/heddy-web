export interface ShopScheduleRequest {
  designerId: number;
  date: string;
}

export interface ShopScheduleResponse {
  designerId: number;
  work_date: string;
  is_working: boolean;
  start_time: string;
  end_time: string;
}
