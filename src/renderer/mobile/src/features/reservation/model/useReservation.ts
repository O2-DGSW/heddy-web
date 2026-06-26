import { useEffect, useState } from "react";
import { DEFAULT_SHOP_SCHEDULE_DATE } from "@/features/reservation/constants/schedule-calander.ts";

export const useReservation = () => {
  const [selectedDate, setSelectedDate] = useState(DEFAULT_SHOP_SCHEDULE_DATE);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [designer, setDesigner] = useState("");
  const [storeInfo, setStoreInfo] = useState<{
    selectedDate: string;
    selectedItem: string | null;
    designer: string;
    tags: string[];
  } | null>(null);

  const [errors, setErrors] = useState({
    time: "",
    designer: "",
  });

  const items = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ];

  const tags = ["레이어드컷", "허쉬컷", "빌드펌", "히피펌", "애즈펌", "다운펌", "쉐도우펌"];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  const handleSave = () => {
    const newErrors = {
      time: selectedItem ? "" : "예약 시간을 선택해주세요.",
      designer: designer.trim() ? "" : "디자이너를 입력해주세요.",
    };

    setErrors(newErrors);

    if (newErrors.time || newErrors.designer) {
      return;
    }

    const newStoreInfo = {
      selectedDate,
      selectedItem,
      designer,
      tags: selectedTags,
    };

    console.log(newStoreInfo);
    setStoreInfo(newStoreInfo);
  };

  const handleCancel = () => {
    setSelectedItem(null);
    setSelectedTags([]);
    setDesigner("");
    setStoreInfo(null);
    setErrors({ time: "", designer: "" }); // 에러 메시지도 초기화해주는 게 좋습니다.
  };

  useEffect(() => {
    if (storeInfo) {
      console.log("저장값 변경", storeInfo);
    }
  }, [storeInfo]);

  // 컴포넌트에서 사용할 상태와 함수들을 객체로 리턴합니다.
  return {
    selectedDate,
    setSelectedDate,
    items,
    selectedItem,
    setSelectedItem,
    tags,
    selectedTags,
    toggleTag,
    designer,
    setDesigner,
    errors,
    handleSave,
    handleCancel,
  };
};
