import { skipToken, useQuery } from "@tanstack/react-query";

import type { ShopScheduleRequest } from "@/entities/shop/model/ShopSchedule.types";
import { shopScheduleApi } from "@/entities/shop/api/shopScheduleApi";

interface UseShopScheduleQueryOptions extends Partial<ShopScheduleRequest> {
  enabled?: boolean;
}

export const useShopScheduleQuery = ({
  designerId,
  date,
  enabled = true,
}: UseShopScheduleQueryOptions) => {
  const canFetchSchedule = enabled && designerId != null && date != null;

  return useQuery({
    queryKey: ["designer_shop_schedule", designerId, date],
    queryFn: canFetchSchedule
      ? () =>
          shopScheduleApi.getShopWorkSchedule({
            designerId,
            date,
          })
      : skipToken,
    enabled: canFetchSchedule,
    retry: false,
  });
};
