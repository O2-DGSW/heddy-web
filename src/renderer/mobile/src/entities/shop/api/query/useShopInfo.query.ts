import { useQuery } from "@tanstack/react-query";
import { shopInfoApi } from "@/entities/shop/api/shopInfoApi.ts";
import type { ShopInfoRequest } from "@/entities/shop/model/ShopInfo.types.ts";

export const useShopInfoQuery = ({ shopId }: ShopInfoRequest) => {
  const { data, isError, isFetching, isLoading } = useQuery({
    queryKey: ["shopInfo"],
    queryFn: () => {
      if (!shopId) throw new Error("해당 하시는 미용실이 없습니다.");
      return shopInfoApi.getShopInfo({ shopId });
    },
  });

  return { data, isError, isFetching, isLoading };
};
