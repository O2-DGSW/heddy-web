import { font, lightTheme } from "@design-tokens";
import { Calendar } from "@/shared/ui/calendar";
import { SHOP_SCHEDULE_WEEK_DAYS } from "@/features/reservation/constants/schedule-calander.ts";
import { useReservation } from "@/features/reservation/model/useReservation.ts";
import React from "react";

const HairTag = {
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

// 값 타입을 순수 타입 형태로 안전하게 추출
type HairTagType = (typeof HairTag)[keyof typeof HairTag];

const HAIR_TAG_ENTRIES = Object.entries(HairTag) as [keyof typeof HairTag, HairTagType][];

export const ReservationPage = () => {
  const {
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
  } = useReservation();

  return (
    <>
      <p
        className={`${font.headline1.bold} text-center py-[1rem]`}
        style={{ color: lightTheme.label.neutral }}
      >
        예약하기
      </p>

      <div className={"flex flex-col items-center gap-[1rem] w-full px-[1rem]"}>
        <div className={"flex flex-row items-center justify-between w-full"}>
          <p className={font.headline2.bold} style={{ color: lightTheme.label.neutral }}>
            날짜 선택
          </p>
          <div />
        </div>
        <div className="w-full h-[1.5px]" style={{ backgroundColor: lightTheme.fill.neutral }} />
        <Calendar
          initialMonthDate={selectedDate}
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

        <p className={`w-full ${font.label.medium}`} style={{ color: lightTheme.label.assistive }}>
          디자이너 찾기
        </p>

        <div className="relative w-[100%]">
          <button
            type="button"
            onClick={toggleDropdown}
            className="w-full p-[0.75rem] rounded-lg text-left"
            style={{
              backgroundColor: lightTheme.background.neutral,
              color: selectedDesignerName ? lightTheme.label.normal : lightTheme.line.normal,
            }}
          >
            {selectedDesignerName || "디자이너 찾기"}
          </button>

          {isDropdownOpen && (
            <div
              className="absolute left-0 top-[110%] w-full rounded-lg shadow-lg z-50 p-2 border max-h-[200px] overflow-y-auto"
              style={{
                backgroundColor: lightTheme.background.neutral,
                borderColor: lightTheme.fill.neutral,
              }}
            >
              <ul className="flex flex-col gap-1">
                {designerList?.map(member => (
                  <li key={member.designer_id}>
                    <button
                      type="button"
                      onClick={() => handleSelectDesigner(member.designer_id, member.name)}
                      className="w-full text-left p-[0.75rem] rounded-lg transition-colors hover:bg-[var(--hover-bg)] hover:text-[var(--hover-text)]"
                      style={
                        {
                          backgroundColor: "transparent",
                          color: lightTheme.label.normal,
                          "--hover-bg": lightTheme.primary.normal,
                          "--hover-text": lightTheme.fill.normal,
                        } as React.CSSProperties
                      }
                    >
                      {member.name}
                    </button>
                  </li>
                ))}

                {(!designerList || designerList.length === 0) && (
                  <li className="text-center p-4 text-xs" style={{ color: lightTheme.line.normal }}>
                    소속된 디자이너가 없습니다.
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <p className={`w-full ${font.label.medium}`} style={{ color: lightTheme.label.assistive }}>
          시술 태그
        </p>

        <div className="w-full">
          <div className="flex flex-wrap w-full gap-2 px-1">
            {HAIR_TAG_ENTRIES.map(([key, value]) => {
              const isSelected = selectedTags.includes(value);

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleTagClick(value)}
                  className="flex-shrink-0 px-4 py-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: isSelected
                      ? lightTheme.primary.normal
                      : lightTheme.background.neutral,
                    color: isSelected ? lightTheme.fill.normal : lightTheme.label.normal,
                  }}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
