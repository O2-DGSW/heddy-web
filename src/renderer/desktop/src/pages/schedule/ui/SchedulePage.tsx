import { lightTheme } from "@design-tokens";

import {
  SCHEDULE_CONTENT_HEIGHT_REM,
  SCHEDULE_CONTENT_WIDTH_REM,
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
    selectedDate,
    selectedColor,
    summaryItems,
    events,
    isModalOpen,
    setSelectedDate,
    setSelectedColor,
    openModal,
    closeModal,
  } = useSchedule();

  return (
    <div
      ref={pageRef}
      className="h-full w-full overflow-hidden p-4 sm:p-6 xl:p-10"
      style={{ backgroundColor: lightTheme.background.alternative }}
    >
      <div
        className="shrink-0 overflow-visible"
        style={{
          width: `${layoutWidthRem * scale}rem`,
          height: `${layoutHeightRem * scale}rem`,
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
              width: `${SCHEDULE_CONTENT_WIDTH_REM}rem`,
              height: `${SCHEDULE_CONTENT_HEIGHT_REM}rem`,
              gap: `${SCHEDULE_PANEL_GAP_REM}rem`,
            }}
          >
            <ScheduleSidebar
              selectedDate={selectedDate}
              summaryItems={summaryItems}
              onSelectDate={setSelectedDate}
            />
            <ScheduleBoard events={events} onOpenModal={openModal} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ScheduleModal
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export { SchedulePage };
