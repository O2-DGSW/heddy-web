import { RESERVATION_NAVIGATION_PANEL_WIDTH_REM } from "@/pages/reservation/model/Reservation.constant";
import type { ReservationNavigationPanelProps } from "@/pages/reservation/model/Reservation.types";

import { ReservationCalendar } from "./Reservation.Calendar";
import { ReservationCardList } from "./Reservation.CardList";

const ReservationNavigationPanel = ({
  monthDate,
  selectedDate,
  weekDays,
  onSelectMonth,
  onSelectDate,
  reservations,
}: ReservationNavigationPanelProps) => {
  return (
    <section
      className="h-full overflow-hidden rounded-xl bg-white shadow-[0_0_0.25rem_rgba(0,0,0,0.08)]"
      style={{ width: `${RESERVATION_NAVIGATION_PANEL_WIDTH_REM}rem` }}
    >
      <div className="flex h-full w-full flex-col items-center gap-[3rem] px-[1.6875rem] pb-[1.9375rem] pt-[1.9375rem]">
        <ReservationCalendar
          monthDate={monthDate}
          selectedDate={selectedDate}
          weekDays={weekDays}
          onSelectMonth={onSelectMonth}
          onSelectDate={onSelectDate}
        />
        <div className="min-h-0 w-full flex-1">
          <ReservationCardList reservations={reservations} />
        </div>
      </div>
    </section>
  );
};

export { ReservationNavigationPanel };
