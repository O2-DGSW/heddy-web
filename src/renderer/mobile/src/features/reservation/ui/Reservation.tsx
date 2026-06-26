import { font, lightTheme } from "@design-tokens";
import { Calendar } from "@/shared/ui/calendar";
import { CutsTag } from "@/private/shared/ui/cuts-tag/CutsTag.tsx";
import {
  DEFAULT_SHOP_SCHEDULE_DATE,
  SHOP_SCHEDULE_WEEK_DAYS,
} from "@/features/reservation/constants/schedule-calander.ts";
import { useReservation } from "@/features/reservation/model/useReservation.ts";

export const Reservation = () => {
  const {
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
  } = useReservation();

  return (
    <>
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
          viewMode="month"
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

        {/* 시간 선택부 */}
        <div className="w-full overflow-x-auto scrollbar-none">
          <div className="flex w-max gap-2 px-1">
            {items.map(item => {
              const isSelected = selectedItem === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="flex-shrink-0 px-3 py-1 rounded-lg focus:outline-none"
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

        {/* 디자이너 입력부 */}
        <div className="flex w-full flex-col gap-[0.25rem] mt-[1rem]">
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
            className="w-full p-[0.75rem] rounded-lg focus:outline-none"
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

        {/* 시술 태그 선택부 */}
        <div className="flex w-full flex-col gap-[0.25rem] mt-[1rem]">
          <p
            className={`${font.label.medium} w-full`}
            style={{ color: lightTheme.label.assistive }}
          >
            시술 태그
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className="focus:outline-none rounded-lg"
              >
                <CutsTag text={tag} selected={selectedTags.includes(tag)} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
