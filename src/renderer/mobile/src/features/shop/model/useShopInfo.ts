import { useGetMyProfileQuery } from "@/entities/profile/api/query/useGetMyProfile.query.ts";
import { useShopInfoQuery } from "@/entities/shop/api/query/useShopInfo.query.ts";

export const useShopInfo = () => {
  const { data: myProfileResponse } = useGetMyProfileQuery();

  const shopId = myProfileResponse?.shopMembers?.[0]?.shopId;

  const { data: shopInfoResponse } = useShopInfoQuery({
    shopId,
  });

  return shopInfoResponse;
};
