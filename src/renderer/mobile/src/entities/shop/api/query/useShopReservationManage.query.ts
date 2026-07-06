import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { shopReservationManageApi } from "@/entities/shop/api/shopReservationManageApi.ts";
import type { ShopReservationManageResponse } from "@/entities/shop/model/ShopReservationManage.types.ts";

interface ShopReservationManageRequest {
  shop_id: number;
  designer_id: number;
  date: string;
  end_date: string;
  status: string;
}

export const useGetShopReservationManageQuery = (
  params: ShopReservationManageRequest,
  options?: Omit<UseQueryOptions<ShopReservationManageResponse, Error>, "queryKey" | "queryFn">
) => {
  const { shop_id, date, end_date, designer_id, status } = params;

  const { data, isError, isFetching, isLoading } = useQuery({
    queryKey: ["shopResManage", shop_id, designer_id, date, end_date, status],
    queryFn: () =>
      shopReservationManageApi.getShopReservation({ shop_id, date, end_date, designer_id, status }),
    ...options,
  });

  return { data, isError, isFetching, isLoading };
};
