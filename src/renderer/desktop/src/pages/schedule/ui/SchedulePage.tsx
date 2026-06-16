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
              selectedDate={selectedDate}
              summaryItems={summaryItems}
              onSelectDate={setSelectedDate}
            />
            <ScheduleBoard
              events={events}
              panelWidthRem={rightPanelWidthRem}
              onOpenModal={openModal}
            />
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
