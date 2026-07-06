import { Calendar } from "@/shared/ui/calendar";
import type { ReservationCalendarProps } from "@/pages/reservation/model/Reservation.types";

const RESERVATION_CALENDAR_SCALE = 1.14;
const DESKTOP_CALENDAR_WIDTH_REM = 24;
const DESKTOP_CALENDAR_HEIGHT_REM = 20.625;

const ReservationCalendar = ({
  monthDate,
  selectedDate,
  weekDays,
  onSelectMonth,
  onSelectDate,
}: ReservationCalendarProps) => {
  return (
    <div
      className="self-start"
      style={{
        height: `${DESKTOP_CALENDAR_HEIGHT_REM * RESERVATION_CALENDAR_SCALE}rem`,
        width: `${DESKTOP_CALENDAR_WIDTH_REM * RESERVATION_CALENDAR_SCALE}rem`,
      }}
    >
      <div
        className="origin-top-left"
        style={{ transform: `scale(${RESERVATION_CALENDAR_SCALE})` }}
      >
        <Calendar
          monthDate={monthDate}
          selectedDate={selectedDate}
          variant="desktop"
          weekDays={weekDays}
          onMonthChange={onSelectMonth}
          onSelectDate={onSelectDate}
        />
      </div>
    </div>
  );
};

export { ReservationCalendar };
