import { lightTheme } from "@design-tokens";

import { SCHEDULE_PANEL_GAP_REM } from "@/pages/schedule/model/Schedule.constant";
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
    editingEvent,
    visibleWeekDateKeys,
    weekLabels,
    monthLabel,
    isModalOpen,
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
      className="h-full w-full overflow-auto p-4 sm:p-6 xl:p-10"
      style={{ backgroundColor: lightTheme.background.alternative }}
    >
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
