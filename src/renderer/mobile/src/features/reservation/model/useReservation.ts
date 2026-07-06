import { useState } from "react";
import { useGetMyProfileQuery } from "@/entities/profile/api/query/useGetMyProfile.query.ts";
import { useShopInfoQuery } from "@/entities/shop/api/query/useShopInfo.query.ts";
import { reservationApi } from "@/entities/reservation/api/reservationApi.ts";
import type { ReservationRequest } from "@/entities/reservation/model/Reservation.types.ts";

const HairTagMap = {
  MALE: "남자",
  FEMALE: "여성",
  FIRST_VISIT: "첫방문",
  CUT: "컷트",
  BANGS_CUT: "앞머리",
  LAYERED_CUT: "레이어드",
  MALE_CUT: "남자컷",
  PERM: "펌",
  DOWN_PERM: "다운펌",
  VOLUME_PERM: "볼륨펌",
  SETTING_PERM: "셋팅펌",
  AS_PERM: "애즈펌",
  IRON_PERM: "아이롱펌",
  STRAIGHT_PERM: "매직",
  VOLUME_STRAIGHT: "볼륨매직",
  COLORING: "염색",
  ROOT_COLORING: "뿌리염색",
  TONE_DOWN: "톤다운",
  BLEACH: "탈색",
  CLINIC: "클리닉",
  CARE: "케어",
  SCALP: "두피",
  SCALP_CARE: "두피케어",
  SPA: "스파",
  RECOVERY: "복구",
  STYLING: "스타일링",
  DRY: "드라이",
  CONSULTATION: "상담",
  RESERVATION: "예약",
} as const;

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
  const [memo, setMemo] = useState("");

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

    const convertedTags = selectedTags
      .map(tagValue => {
        const entry = Object.entries(HairTagMap).find(([_, value]) => value === tagValue);
        return entry ? entry[0] : null;
      })
      .filter((tag): tag is string => tag !== null);

    const requestBody: ReservationRequest = {
      shop_id: myShopId,
      designer_id: selectedDesignerId,
      reserved_at: new Date(selectedDate).toISOString(),
      service_tags: convertedTags,
      memo: memo,
    };

    console.log(requestBody);

    try {
      const response = await reservationApi.postReservation(requestBody);

      // 💡 201 Created 성공 조건 확인
      if (response.status === 201) {
        console.log("예약이 성공적으로 등록되었습니다!");

        // 1. 성공 메시지 띄우기
        setSuccessMessage("예약에 성공했습니다!");

        // 2. 작성된 입력 데이터 모두 초기화 (날짜도 오늘로 리셋)
        setSelectedDate(getTodayString());
        setSelectedTags([]);
        setSelectedDesignerName("");
        setSelectedDesignerId(null);
        setIsDropdownOpen(false);
        setMemo("");

        // 3. 3초 뒤에 성공 메시지만 닫기
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }
    } catch (error) {
      console.error("예약 등록 중 오류 발생:", error);
      alert("예약 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleCancel = () => {
    setSelectedDate(getTodayString()); // 취소 시에도 오늘 날짜로 리셋
    setSelectedTags([]);
    setSelectedDesignerName("");
    setSelectedDesignerId(null);
    setIsDropdownOpen(false);
    setMemo("");
    setSuccessMessage(null);
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
    memo,
    setMemo,
    successMessage,
    handleSave,
    handleCancel,
    handleTagClick,
    handleSelectDesigner,
    toggleDropdown,
  };
};
