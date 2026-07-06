import { lightTheme } from "@design-tokens";

import {
  SCHEDULE_CONTENT_BOTTOM_OFFSET_REM,
  SCHEDULE_CONTENT_TOP_OFFSET_REM,
  SCHEDULE_PAGE_LEFT_PADDING_REM,
  SCHEDULE_PAGE_RIGHT_PADDING_REM,
  SCHEDULE_PANEL_GAP_REM,
} from "@/pages/schedule/model/Schedule.constant";
import { useSchedule } from "@/pages/schedule/model/useSchedule";

import { ScheduleBoard } from "./Schedule.Board";
import { ScheduleModal } from "./Schedule.Modal";
import { ScheduleSidebar } from "./Schedule.Sidebar";

const SchedulePage = () => {
  const {
    pageRef,
    scale,
    layoutWidthRem,
    layoutHeightRem,
    rightPanelWidthRem,
    scaledLayoutWidthRem,
    scaledLayoutHeightRem,
    selectedDate,
    calendarMonthDate,
    calendarMarkerMap,
    summaryItems,
    events,
    designers,
    editingEvent,
    visibleWeekDateKeys,
    weekLabels,
    monthLabel,
    isModalOpen,
    isLoading,
    errorMessage,
    actionMessage,
    setCalendarMonthDate,
    selectDate,
    openModal,
    openEventModal,
    closeModal,
    saveSchedule,
    deleteSchedule,
    moveToPreviousDay,
    moveToNextDay,
    moveToToday,
  } = useSchedule();

  return (
    <div
      ref={pageRef}
      className="relative h-full w-full overflow-auto"
      style={{
        backgroundColor: lightTheme.background.alternative,
        paddingBottom: `${SCHEDULE_CONTENT_BOTTOM_OFFSET_REM}rem`,
        paddingLeft: `${SCHEDULE_PAGE_LEFT_PADDING_REM}rem`,
        paddingRight: `${SCHEDULE_PAGE_RIGHT_PADDING_REM}rem`,
        paddingTop: `${SCHEDULE_CONTENT_TOP_OFFSET_REM}rem`,
      }}
    >
      {(isLoading || errorMessage || actionMessage) && (
        <div
          className="pointer-events-none absolute right-10 top-8 z-20 rounded-full px-4 py-2 font-['Pretendard'] text-[14px] font-medium leading-[1.3]"
          style={{
            backgroundColor: lightTheme.background.normal,
            boxShadow: `0 0 4px color-mix(in srgb, ${lightTheme.label.strong} 8%, transparent)`,
            color: errorMessage ? lightTheme.status.error : lightTheme.label.assistive,
          }}
        >
          {errorMessage || actionMessage || "스케줄 정보를 불러오는 중입니다"}
        </div>
      )}

      <div
        className="shrink-0 overflow-visible"
        style={{
          width: `${scaledLayoutWidthRem}rem`,
          height: `${scaledLayoutHeightRem}rem`,
        }}
      >
        <div
          className="origin-top-left"
          style={{
            transform: `scale(${scale})`,
            width: `${layoutWidthRem}rem`,
            height: `${layoutHeightRem}rem`,
          }}
        >
          <div
            className="flex"
            style={{
              width: `${layoutWidthRem}rem`,
              height: `${layoutHeightRem}rem`,
              gap: `${SCHEDULE_PANEL_GAP_REM}rem`,
            }}
          >
            <ScheduleSidebar
              calendarMarkerMap={calendarMarkerMap}
              calendarMonthDate={calendarMonthDate}
              selectedDate={selectedDate}
              summaryItems={summaryItems}
              onChangeCalendarMonth={setCalendarMonthDate}
              onSelectDate={selectDate}
              onSelectEvent={openEventModal}
            />
            <ScheduleBoard
              events={events}
              monthLabel={monthLabel}
              panelWidthRem={rightPanelWidthRem}
              visibleWeekDateKeys={visibleWeekDateKeys}
              weekLabels={weekLabels}
              onMoveNextDay={moveToNextDay}
              onMovePreviousDay={moveToPreviousDay}
              onOpenModal={openModal}
              onSelectEvent={openEventModal}
              onSelectToday={moveToToday}
            />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ScheduleModal
          designers={designers}
          editingEvent={editingEvent}
          initialDate={selectedDate}
          visibleWeekDateKeys={visibleWeekDateKeys}
          onDelete={deleteSchedule}
          onSave={saveSchedule}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export { SchedulePage };
