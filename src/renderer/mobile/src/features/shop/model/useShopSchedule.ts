import { useState } from "react";

import { useGetMyProfileQuery } from "@/entities/profile/api/query/useGetMyProfile.query";
import { useShopInfoQuery } from "@/entities/shop/api/query/useShopInfo.query";
import { useShopScheduleQuery } from "@/entities/shop/api/query/useShopSchedule.query";

import { DEFAULT_SHOP_SCHEDULE_DATE } from "@/features/shop/constrants/schedule-calendar";

export const useShopSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(DEFAULT_SHOP_SCHEDULE_DATE);

  const [viewMode, setViewMode] = useState<"month" | "week">("month");

  const { data: myProfileData } = useGetMyProfileQuery();

  const shopId = myProfileData?.data?.shopMembers?.[0]?.shopId;

  const { data: shopInfoData } = useShopInfoQuery({ shopId: shopId ?? 0 });

  const designerId = shopInfoData?.designers?.[0]?.designerId;

  const {
    data: shopScheduleData,
    isLoading,
    isError,
  } = useShopScheduleQuery({
    designerId: designerId ?? 0,
    date: selectedDate,
  });

  return {
    selectedDate,
    setSelectedDate,
    viewMode,
    setViewMode,

    shopInfoData,
    shopScheduleData,
    isLoading,
    isError,
  };
};
