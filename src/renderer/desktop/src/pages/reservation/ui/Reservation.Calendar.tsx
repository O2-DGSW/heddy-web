import { Calendar } from "@/shared/ui/calendar";
import type { ReservationCalendarProps } from "@/pages/reservation/model/Reservation.types";

const ReservationCalendar = ({
  monthDate,
  selectedDate,
  weekDays,
  onSelectMonth,
  onSelectDate,
}: ReservationCalendarProps) => {
  return (
    <Calendar
      monthDate={monthDate}
      selectedDate={selectedDate}
      variant="desktop"
      weekDays={weekDays}
      onMonthChange={onSelectMonth}
      onSelectDate={onSelectDate}
    />
  );
};

export { ReservationCalendar };
