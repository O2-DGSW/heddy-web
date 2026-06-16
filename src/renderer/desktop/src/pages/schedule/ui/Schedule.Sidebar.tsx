import type { ScheduleSummaryItem } from "@/pages/schedule/model/Schedule.types";

import { ScheduleCalendar } from "./Schedule.Calendar";
import { ScheduleSummaryList } from "./Schedule.SummaryList";

interface ScheduleSidebarProps {
  selectedDate: string;
  summaryItems: ScheduleSummaryItem[];
  onSelectDate: (date: string) => void;
}

const ScheduleSidebar = ({ selectedDate, summaryItems, onSelectDate }: ScheduleSidebarProps) => {
  return (
    <section className="h-full w-[26.4375rem] shrink-0 overflow-hidden rounded-xl bg-white shadow-[0_0_0.25rem_rgba(0,0,0,0.08)]">
      <div className="flex w-full flex-col items-center px-[1.3125rem] pt-6">
        <ScheduleCalendar selectedDate={selectedDate} onSelectDate={onSelectDate} />
        <div className="mt-[3.8125rem] w-[24rem]">
          <ScheduleSummaryList items={summaryItems} />
        </div>
      </div>
    </section>
  );
};

export { ScheduleSidebar };
