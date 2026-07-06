import { useState } from "react";
import { useGetMyProfileQuery } from "@/entities/profile/api/query/useGetMyProfile.query.ts";
import { useShopInfoQuery } from "@/entities/shop/api/query/useShopInfo.query.ts";
import { reservationApi } from "@/entities/reservation/api/reservationApi.ts";
import type { ReservationRequest } from "@/entities/reservation/model/Reservation.types.ts";

const getTodayString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const useReservation = () => {
  const [selectedDate, setSelectedDate] = useState<string>(getTodayString());
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDesignerName, setSelectedDesignerName] = useState("");
  const [selectedDesignerId, setSelectedDesignerId] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const myInfo = useGetMyProfileQuery();
  const myShopId = myInfo?.data?.shopMembers[0]?.shopId;
  const shopData = useShopInfoQuery({ shopId: myShopId });
  const designerList = shopData?.data?.designers;

  const handleSave = async () => {
    if (!myShopId) {
      alert("매장 정보가 존재하지 않습니다.");
      return;
    }
    if (!selectedDesignerId) {
      alert("디자이너를 선택해주세요.");
      return;
    }

    const requestBody: ReservationRequest = {
      shop_id: myShopId,
      designerId: selectedDesignerId,
      reserved_at: new Date(selectedDate).toISOString(),
      service_tags: selectedTags,
      memo: "",
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
