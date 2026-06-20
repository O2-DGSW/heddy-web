import type { ScheduleSummaryItem } from "@/pages/schedule/model/Schedule.types";

import { ScheduleCalendar } from "./Schedule.Calendar";
import { ScheduleSummaryList } from "./Schedule.SummaryList";

interface ScheduleSidebarProps {
  calendarMarkerMap: Record<string, number>;
  calendarMonthDate: string;
  selectedDate: string;
  summaryItems: ScheduleSummaryItem[];
  onChangeCalendarMonth: (date: string) => void;
  onSelectDate: (date: string) => void;
  onSelectEvent: (eventId: number) => void;
}

const ScheduleSidebar = ({
  calendarMarkerMap,
  calendarMonthDate,
  selectedDate,
  summaryItems,
  onChangeCalendarMonth,
  onSelectDate,
  onSelectEvent,
}: ScheduleSidebarProps) => {
  return (
    <section className="h-full w-[26.4375rem] shrink-0 overflow-hidden rounded-xl bg-white shadow-[0_0_0.25rem_rgba(0,0,0,0.08)]">
      <div className="flex w-full flex-col items-center px-[1.3125rem] pt-6">
        <ScheduleCalendar
          markerMap={calendarMarkerMap}
          monthDate={calendarMonthDate}
          selectedDate={selectedDate}
          onMonthChange={onChangeCalendarMonth}
          onSelectDate={onSelectDate}
        />
        <div className="mt-[3.8125rem] w-[24rem]">
          <ScheduleSummaryList items={summaryItems} onSelectItem={onSelectEvent} />
        </div>
      </div>
    </section>
  );
};

export { ScheduleSidebar };
