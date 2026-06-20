import { Calendar } from "@/shared/ui/calendar";
import { SCHEDULE_WEEK_DAYS } from "@/pages/schedule/model/Schedule.constant";

interface ScheduleCalendarProps {
  markerMap: Record<string, number>;
  monthDate: string;
  selectedDate: string;
  onMonthChange: (date: string) => void;
  onSelectDate: (date: string) => void;
}

const ScheduleCalendar = ({
  markerMap,
  monthDate,
  selectedDate,
  onMonthChange,
  onSelectDate,
}: ScheduleCalendarProps) => {
  return (
    <Calendar
      markerMap={markerMap}
      monthDate={monthDate}
      selectedDate={selectedDate}
      variant="desktop"
      weekDays={SCHEDULE_WEEK_DAYS}
      onMonthChange={onMonthChange}
      onSelectDate={onSelectDate}
    />
  );
};

export { ScheduleCalendar };
