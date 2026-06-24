import type {
  ShopScheduleRequest,
  ShopScheduleResponse,
} from "@/entities/shop/model/ShopSchedule.types.ts";
import { api } from "@/shared/api";
import type { ApiResponse } from "@heddy/api";

export const shopScheduleApi = {
  getShopWorkSchedule: async ({ designerId, date }: ShopScheduleRequest) => {
    const result = await api.get<ApiResponse<ShopScheduleResponse>>(
      `/designers/${designerId}/work-schedules/${date}`
    );

    return result.data;
  },
};
