import { api, type ApiResponse } from "@heddy/api";
import type { ShopInfoRequest, ShopInfoResponse } from "@/entities/shop/model/ShopInfo.types.ts";

export const shopInfoApi = {
  getShopInfo: async ({ shopId }: ShopInfoRequest) => {
    const result = await api.get<ApiResponse<ShopInfoResponse>>(`/shops/${shopId}`);
    return result.data.data;
  },
};
