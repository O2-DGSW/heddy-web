import { api, type ApiResponse } from "@heddy/api";
import type { ShopReservationManageResponse } from "@/entities/shop/model/ShopReservationManage.types.ts";

interface ShopReservationManageRequest {
  shop_id: number;
  date: string;
  end_date: string;
  designer_id: number;
  status: string;
}

export const shopReservationManageApi = {
  getShopReservation: async (params: ShopReservationManageRequest) => {
    const result = await api.get<ApiResponse<ShopReservationManageResponse>>("/reservations", {
      params,
    });

    return result.data.data;
  },
};
