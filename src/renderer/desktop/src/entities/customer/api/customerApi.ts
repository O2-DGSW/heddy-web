import { api } from "@/shared/api";

type ApiError = { code: string; message: string } | null;

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  error: ApiError;
};

export type MetricsResponse = {
  total_customer_count: number;
  churn_risk_customer_count: number;
  today_reservation_count: number;
  today_visitor_count: number;
  monthly_new_regular_customer_count: number;
};

export type CustomerGradeResponse = {
  customer_id: string;
  customer_grade: string;
  visit_count_6months: number;
  grade_updated_at: string;
};

export type TodayReservationResponse = {
  reservation_id: string;
  time: string;
  customer_id: string;
  customer_name: string;
  service_name: string;
  designer_name: string;
  status: string;
};

export type DashboardResponse = {
  metrics: MetricsResponse;
  customer_grades: CustomerGradeResponse[];
  today_reservations: TodayReservationResponse[];
  calculated_at: string;
};

export type SalesPredictionPeriodType = "DAY" | "MONTH" | "QUARTER";

export type SalesPredictionParams = {
  periodType?: SalesPredictionPeriodType;
  predictionCount?: number;
};

export type SalesChartPoint = {
  quarter: string;
  sales: number;
  order_count: number;
  point_type: string;
};

export type QuarterlySalesPredictResponse = {
  period_type: string;
  base_quarter: string;
  predicted_sales_total: number;
  predicted_order_count_total: number;
  chart: SalesChartPoint[];
  basis: string;
};

export type CustomerChurn = {
  customer_id: string;
  customer_name: string;
  churn_score: number;
  churn_level: string;
  days_since_last_visit: number;
};

export type ShopChurnResponse = {
  total: number;
  customers: CustomerChurn[];
};

export const getCustomerDashboard = async (shopId: number, date?: string) => {
  const res = await api.get<ApiResponse<DashboardResponse>>(
    `/shops/${shopId}/analytics/dashboard`,
    {
      params: {
        date,
      },
    }
  );

  if (!res.data.success) {
    throw new Error(
      res.data.error?.message || res.data.message || "고객 요약 정보를 불러오지 못했습니다."
    );
  }

  return res.data.data;
};

export const getQuarterlySalesPredict = async (
  shopId: number,
  params: SalesPredictionParams = {}
) => {
  const res = await api.post<ApiResponse<QuarterlySalesPredictResponse>>(
    `/shops/${shopId}/analytics/sales/beauty-salon/quarterly-predict`,
    null,
    {
      params,
    }
  );

  if (!res.data.success) {
    throw new Error(
      res.data.error?.message || res.data.message || "매출 예측 정보를 불러오지 못했습니다."
    );
  }

  return res.data.data;
};

export const getShopChurnCustomers = async (shopId: number) => {
  const res = await api.get<ApiResponse<ShopChurnResponse>>(`/shops/${shopId}/analytics/churn`, {
    params: {
      limit: 1000,
    },
  });

  if (!res.data.success) {
    throw new Error(
      res.data.error?.message || res.data.message || "고객 목록을 불러오지 못했습니다."
    );
  }

  return res.data.data;
};
