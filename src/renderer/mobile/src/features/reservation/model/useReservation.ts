import { useState } from "react";
import { DEFAULT_SHOP_SCHEDULE_DATE } from "@/features/reservation/constants/schedule-calander.ts";
import { useGetMyProfileQuery } from "@/entities/profile/api/query/useGetMyProfile.query.ts";
import { useShopInfoQuery } from "@/entities/shop/api/query/useShopInfo.query.ts";
import { reservationApi } from "@/entities/reservation/api/reservationApi.ts";
import type { ReservationRequest } from "@/entities/reservation/model/Reservation.types.ts";

export const useReservation = () => {
  const [selectedDate, setSelectedDate] = useState(DEFAULT_SHOP_SCHEDULE_DATE);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDesignerName, setSelectedDesignerName] = useState("");
  const [selectedDesignerId, setSelectedDesignerId] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const myInfo = useGetMyProfileQuery();
  const myShopId = myInfo?.data?.shopMembers[0]?.shopId;
  const shopData = useShopInfoQuery({ shopId: myShopId });
  const designerList = shopData?.data?.designers;

  // API 호출 함수
  const handleSave = async () => {
    // 필수 데이터 검증 (shopId와 designerId가 없으면 차단)
    if (!myShopId) {
      alert("매장 정보가 존재하지 않습니다.");
      return;
    }
    if (!selectedDesignerId) {
      alert("디자이너를 선택해주세요.");
      return;
    }

    // ReservationRequest API 규격에 맞게 객체 생성
    const requestBody: ReservationRequest = {
      shop_id: myShopId,
      designerId: selectedDesignerId, // API 스펙 문서에 정의된 camelCase 유지
      reserved_at: new Date(selectedDate).toISOString(), // 날짜 포맷을 ISO 8601 문자열로 변환
      service_tags: selectedTags,
      memo: "", // 현재 UI에 메모 입력란이 없으므로 빈 문자열 처리 (필요시 상태 추가)
    };

    try {
      const response = await reservationApi.postReservation(requestBody);

      if (response.status === 200) {
        console.log("예약이 성공적으로 등록되었습니다!");
      }
    } catch (error) {
      console.error("예약 등록 중 오류 발생:", error);
      console.error("예약 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleCancel = () => {
    setSelectedTags([]);
    setSelectedDesignerName("");
    setSelectedDesignerId(null);
    setIsDropdownOpen(false);
  };

  const handleTagClick = (tagValue: string) => {
    setSelectedTags(prevTags =>
      prevTags.includes(tagValue) ? prevTags.filter(t => t !== tagValue) : [...prevTags, tagValue]
    );
  };

  const handleSelectDesigner = (id: number, name: string) => {
    setSelectedDesignerId(id);
    setSelectedDesignerName(name);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  return {
    selectedDate,
    setSelectedDate,
    selectedTags,
    selectedDesignerName,
    designerList,
    isDropdownOpen,
    handleSave,
    handleCancel,
    handleTagClick,
    handleSelectDesigner,
    toggleDropdown,
  };
};
