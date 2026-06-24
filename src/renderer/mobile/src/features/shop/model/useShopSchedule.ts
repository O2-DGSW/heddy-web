import { useEffect, useState } from "react";

import { useGetMyProfileQuery } from "@/entities/profile/api/query/useGetMyProfile.query";
import { useShopInfoQuery } from "@/entities/shop/api/query/useShopInfo.query";
import { useShopScheduleQuery } from "@/entities/shop/api/query/useShopSchedule.query";

import { DEFAULT_SHOP_SCHEDULE_DATE } from "@/features/shop/constrants/schedule-calendar";

export const useShopSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(DEFAULT_SHOP_SCHEDULE_DATE);

  const [viewMode, setViewMode] = useState<"month" | "week">("month");

  const [designerId, setDesignerId] = useState<number>();

  const { data: myProfileData } = useGetMyProfileQuery();

  const myUserId = myProfileData?.userId;
  const shopId = myProfileData?.shopMembers?.[0]?.shopId;

  const { data: shopInfoData } = useShopInfoQuery({
    shopId,
  });

  useEffect(() => {
    const id = shopInfoData?.designers?.find(
      designer => designer.designer_id === myUserId
    )?.designer_id;

    setDesignerId(id);
  }, [shopInfoData, myUserId]);

  const {
    data: shopScheduleData,
    isLoading,
    isError,
  } = useShopScheduleQuery({
    designerId,
    date: selectedDate,
    enabled: designerId != null,
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
