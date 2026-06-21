import type { ShopScheduleRequest } from "@/entities/shop/model/ShopSchedule.types.ts";
import { useQuery } from "@tanstack/react-query";
import { shopScheduleApi } from "@/entities/shop/api/shopScheduleApi.ts";

export const useShopScheduleQuery = ({ designerId, date }: ShopScheduleRequest) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["designer_shop_schedule", designerId, date],
    queryFn: () =>
      shopScheduleApi.getShopWorkSchedule({
        designerId,
        date,
      }),
    retry: false,
  });

  return { data, isError, isLoading };
};
