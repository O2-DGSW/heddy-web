import { useState } from "react";
import { useGetMyProfileQuery } from "@/entities/profile/api/query/useGetMyProfile.query";
import { useShopInfoQuery } from "@/entities/shop/api/query/useShopInfo.query";
import { useShopScheduleQuery } from "@/entities/shop/api/query/useShopSchedule.query";
import { useGetShopReservationManageQuery } from "@/entities/shop/api/query/useShopReservationManage.query.ts";

export const useShopSchedule = () => {
  // 💡 [날짜 공통 헬퍼 함수] 어떤 날짜 형태든 YYYY-MM-DD 스트링으로 안전 변환
  const formatToDashString = (dateInput: Date | string) => {
    if (!dateInput) return "";
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return "";

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 💡 .tsx에 있던 오늘/다음달 날짜 계산 로직 이관
  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 1);

  const formattedToday = formatToDashString(today);
  const formattedNextMonth = formatToDashString(nextMonth);

  // 💡 초기 선택 날짜를 오늘('YYYY-MM-DD')로 기본 설정하여 언디파인드 에러 방지
  const [selectedDate, setSelectedDate] = useState<string | Date>(formattedToday);
  const [viewMode, setViewMode] = useState<"month" | "week">("month");

  // 1. 프로필 정보 조회
  const { data: myProfileData } = useGetMyProfileQuery();
  const myUserId = myProfileData?.userId;
  const shopId = myProfileData?.shopMembers?.[0]?.shopId;

  // 2. 샵 정보 및 디자이너 ID 매칭
  const { data: shopInfoData } = useShopInfoQuery({ shopId });
  const designerId = shopInfoData?.designers?.find(
    designer => designer.designer_id === myUserId
  )?.designer_id;

  // 3. 기존 훅에 있던 스케줄 쿼리 (의존성 검증 보완)
  const targetDateStr = formatToDashString(selectedDate);
  const {
    data: shopScheduleData,
    isLoading,
    isError,
  } = useShopScheduleQuery({
    designerId,
    date: targetDateStr,
    enabled: designerId != null,
  });

  // 4. .tsx에서 관리하던 예약 관리 대장 API 호출 이관
  const reservationManagementData = useGetShopReservationManageQuery(
    {
      shop_id: shopId ?? 0,
      designer_id: myUserId ?? 0,
      date: formattedToday,
      end_date: formattedNextMonth,
      status: "",
    },
    {
      enabled: typeof shopId === "number" && typeof myUserId === "number",
    }
  );

  // 💡 [핵심 비즈니스 로직] 선택 날짜와 reserved_at 비교 필터링
  const filteredReservations =
    reservationManagementData?.data?.reservations?.filter(reservation => {
      const reservationDateStr = formatToDashString(reservation.reserved_at);
      return reservationDateStr === targetDateStr;
    }) || [];

  return {
    selectedDate,
    setSelectedDate,
    viewMode,
    setViewMode,
    targetDateStr,
    filteredReservations,
    shopScheduleData,
    isLoading,
    isError,
  };
};
