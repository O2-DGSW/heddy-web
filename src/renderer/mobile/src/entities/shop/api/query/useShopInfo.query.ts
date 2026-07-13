import { skipToken, useQuery } from "@tanstack/react-query";
import { shopInfoApi } from "@/entities/shop/api/shopInfoApi.ts";
import type { ShopInfoRequest } from "@/entities/shop/model/ShopInfo.types.ts";

interface UseShopInfoQueryOptions extends Partial<ShopInfoRequest> {
  enabled?: boolean;
}

export const useShopInfoQuery = ({ shopId, enabled = true }: UseShopInfoQueryOptions) => {
  const canFetchShopInfo = enabled && shopId != null;

  const { data, isError, isFetching, isLoading } = useQuery({
    queryKey: ["shopInfo", shopId],
    queryFn: canFetchShopInfo ? () => shopInfoApi.getShopInfo({ shopId }) : skipToken,
    enabled: canFetchShopInfo,
  });

  return { data, isError, isFetching, isLoading };
};
