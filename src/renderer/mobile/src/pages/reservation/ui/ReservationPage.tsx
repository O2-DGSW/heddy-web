import { font, lightTheme } from "@design-tokens";
import { Calendar } from "@/shared/ui/calendar";
import { useEffect, useState } from "react";
import {
  DEFAULT_SHOP_SCHEDULE_DATE,
  SHOP_SCHEDULE_WEEK_DAYS,
} from "@/features/reservation/constants/schedule-calander.ts";
import { CutsTag } from "@/private/shared/ui/cuts-tag/CutsTag.tsx";

export const ReservationPage = () => {
  const [selectedDate, setSelectedDate] = useState(DEFAULT_SHOP_SCHEDULE_DATE);

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

  // 시간대 선택
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // 태그 선택
  const tags = ["레이어드컷", "허쉬컷", "빌드펌", "히피펌", "애즈펌", "다운펌", "쉐도우펌"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

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

  const [designer, setDesigner] = useState("");

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

  useEffect(() => {
    console.log("저장값 변경");
  }, [storeInfo]);

  const handleCancel = () => {
    setSelectedItem(null);
    setSelectedTags([]);
    setDesigner("");
    setStoreInfo(null);
  };

  return (
    <div className="" style={{ backgroundColor: lightTheme.background.normal }}>
      {/* 헤더 */}
      <p
        className={`${font.headline1.bold} text-center py-[1rem]`}
        style={{ color: lightTheme.label.neutral }}
      >
        예약하기
      </p>

      {/* 날짜 선택 */}
      <div className={"flex flex-col items-center gap-[1rem] w-full px-[1rem]"}>
        <div className={"flex flex-row items-center justify-between w-full"}>
          <p className={font.headline2.bold} style={{ color: lightTheme.label.neutral }}>
            날짜 선택
          </p>
          <div />
        </div>
        <div className="w-full h-[1.5px]" style={{ backgroundColor: lightTheme.fill.neutral }} />
        <Calendar
          initialMonthDate={DEFAULT_SHOP_SCHEDULE_DATE}
          selectedDate={selectedDate}
          variant="mobile"
          viewMode="week"
          weekDays={SHOP_SCHEDULE_WEEK_DAYS}
          className="mx-auto max-w-[393px]"
          onSelectDate={setSelectedDate}
        />
      </div>

      <div
        className="w-full h-[0.75rem] my-[1rem]"
        style={{ backgroundColor: lightTheme.fill.normal }}
      />

      {/* 예약 정보 */}
      <div className={"flex flex-col items-center gap-[1rem] w-full px-[1rem] mt-[2rem]"}>
        <div className={"flex flex-row items-center justify-between w-full"}>
          <p className={font.headline2.bold} style={{ color: lightTheme.label.neutral }}>
            예약 정보
          </p>
          <div className={`flex flex-row items-center justify-between gap-[0.5rem]`}>
            <button
              onClick={handleCancel}
              className={`${font.label.semiBold} px-[1rem] py-[0.4rem] rounded-lg`}
              style={{
                backgroundColor: lightTheme.background.neutral,
                color: lightTheme.line.normal,
              }}
            >
              취소
            </button>

            <button
              onClick={handleSave}
              className={`${font.label.semiBold} px-[1rem] py-[0.4rem] rounded-lg`}
              style={{
                backgroundColor: lightTheme.primary.normal,
                color: lightTheme.fill.normal,
              }}
            >
              저장
            </button>
          </div>
        </div>
        <div className="w-full h-[1.5px]" style={{ backgroundColor: lightTheme.fill.neutral }} />
        <div className="w-full overflow-x-auto scrollbar-none">
          <div className="flex w-max gap-2 px-1">
            {items.map(item => {
              const isSelected = selectedItem === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="flex-shrink-0 px-3 py-1 rounded-lg"
                  style={{
                    backgroundColor: isSelected
                      ? lightTheme.primary.normal
                      : lightTheme.background.neutral,
                    color: isSelected ? lightTheme.fill.normal : lightTheme.label.normal,
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>
          {errors.time && (
            <p
              className={`${font.caption.regular} mt-1`}
              style={{ color: lightTheme.status.error }}
            >
              {errors.time}
            </p>
          )}
        </div>
        <div className="flex w-[100%] flex-col gap-[0.25rem] mt-[1rem]">
          <p
            className={`${font.label.medium} w-full`}
            style={{ color: lightTheme.label.assistive }}
          >
            디자이너 찾기
          </p>
          <input
            placeholder="디자이너 찾기"
            value={designer}
            onChange={e => setDesigner(e.target.value)}
            className="w-full p-[0.75rem] rounded-lg"
            style={{
              backgroundColor: lightTheme.background.neutral,
              color: lightTheme.line.normal,
            }}
          />
          {errors.designer && (
            <p
              className={`${font.caption.regular} mt-1`}
              style={{ color: lightTheme.status.error }}
            >
              {errors.designer}
            </p>
          )}
        </div>

        <div className="flex w-[100%] flex-col gap-[0.25rem] mt-[1rem]">
          <p
            className={`${font.label.medium} w-full`}
            style={{ color: lightTheme.label.assistive }}
          >
            시술 태그
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button key={tag} type="button" onClick={() => toggleTag(tag)}>
                <CutsTag text={tag} selected={selectedTags.includes(tag)} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
