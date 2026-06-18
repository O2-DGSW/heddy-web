import { Calendar } from "@/shared/ui/calendar";
import {
  DEFAULT_SCHEDULE_DATE,
  SCHEDULE_WEEK_DAYS,
} from "@/pages/schedule/model/Schedule.constant";

interface ScheduleCalendarProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const ScheduleCalendar = ({ selectedDate, onSelectDate }: ScheduleCalendarProps) => {
  return (
    <Calendar
      initialMonthDate={DEFAULT_SCHEDULE_DATE}
      selectedDate={selectedDate}
      variant="desktop"
      weekDays={SCHEDULE_WEEK_DAYS}
      onSelectDate={onSelectDate}
    />
  );
};

export { ScheduleCalendar };
