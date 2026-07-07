import { font, lightTheme } from "@design-tokens";
import { Calendar } from "@/shared/ui/calendar";
import { SHOP_SCHEDULE_WEEK_DAYS } from "@/features/reservation/constants/schedule-calander.ts";
import { useReservation } from "@/features/reservation/model/useReservation.ts";
import React from "react";
import { HairTag } from "@/pages/reservation/constant/hairTag.ts";

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
    memo,
    setMemo,
    handleSave,
    handleCancel,
    handleTagClick,
    handleSelectDesigner,
    toggleDropdown,
    successMessage, // 💡 훅에서 성공 메시지 가져오기
  } = useReservation();

  return (
    // 💡 최상단을 relative 포지션으로 감싸서 팝업 위치의 기준을 잡습니다.
    <div className="relative min-h-screen pb-[3rem]">
      {/* 💡 성공 알림 메시지 토스트 배너 (화면 상단 정중앙에 플로팅) */}
      {successMessage && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg border text-center whitespace-nowrap min-w-[200px] ${font.body.semiBold}`}
          style={{
            backgroundColor: "#ffffff",
            borderColor: lightTheme.primary.normal,
            color: lightTheme.primary.normal,
          }}
        >
          {successMessage}
        </div>
      )}

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
          {/* 💡 기존의 애매한 위치에 있던 메시지 태그는 삭제했습니다. */}
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

        <p className={`w-full ${font.label.medium}`} style={{ color: lightTheme.label.assistive }}>
          메모
        </p>

        <div className="w-full">
          <textarea
            value={memo}
            onChange={e => setMemo(e.target.value)}
            placeholder="요청사항을 입력해주세요."
            className="w-full h-[6rem] p-[0.75rem] rounded-lg resize-none outline-none text-sm"
            style={{
              border: `1px solid ${lightTheme.fill.neutral}`,
              backgroundColor: lightTheme.background.neutral,
              color: lightTheme.label.normal,
            }}
          />
        </div>
      </div>
    </div>
  );
};
