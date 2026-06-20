import { font, lightTheme } from "@design-tokens";
import { Calendar } from "@/shared/ui/calendar";
import { useEffect, useState } from "react";
import {
  DEFAULT_SHOP_SCHEDULE_DATE,
  SHOP_SCHEDULE_WEEK_DAYS,
} from "@/features/reservation/constants/schedule-calander.ts";

export const ReservationPage = () => {
  const [selectedDate, setSelectedDate] = useState(DEFAULT_SHOP_SCHEDULE_DATE);

  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const [storeInfo, setStoreInfo] = useState<{
    selectedDate: string;
    selectedItem: number | null;
    designer: string;
  } | null>(null);

  const [designer, setDesigner] = useState("");

  const handleSave = () => {
    const newStoreInfo = {
      selectedDate,
      selectedItem,
      designer,
    };

    setStoreInfo(newStoreInfo);
    console.log(newStoreInfo); // 저장할 값
  };

  useEffect(() => {
    console.log("저장값 변경");
  }, [storeInfo]);

  const handleCancel = () => {
    setSelectedItem(null);
    setDesigner("");
    setStoreInfo(null);
  };

  return (
    <>
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
                  className="flex-shrink-0 px-4 py-2 rounded-lg"
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
        </div>
        <input
          placeholder="디자이너 찾기"
          value={designer}
          onChange={e => setDesigner(e.target.value)}
          className="w-[90%] p-[0.75rem] rounded-lg"
          style={{
            backgroundColor: lightTheme.background.neutral,
            color: lightTheme.line.normal,
          }}
        />
      </div>
    </>
  );
};
