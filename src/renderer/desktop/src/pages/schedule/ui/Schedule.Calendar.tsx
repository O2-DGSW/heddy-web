import { Calendar } from "@/shared/ui/calendar";
import {
  SCHEDULE_CALENDAR_ROWS,
  SCHEDULE_MONTH_LABEL,
  SCHEDULE_WEEK_DAYS,
} from "@/pages/schedule/model/Schedule.constant";

interface ScheduleCalendarProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const ScheduleCalendar = ({ selectedDate, onSelectDate }: ScheduleCalendarProps) => {
  return (
    <Calendar
      calendarRows={SCHEDULE_CALENDAR_ROWS}
      monthLabel={SCHEDULE_MONTH_LABEL}
      selectedDate={selectedDate}
      variant="desktop"
      weekDays={SCHEDULE_WEEK_DAYS}
      onSelectDate={onSelectDate}
    />
  );
};

export { ScheduleCalendar };
