import type { ReservationNavigationPanelProps } from "@/pages/reservation/model/Reservation.types";

import { ReservationCalendar } from "./Reservation.Calendar";
import { ReservationCardList } from "./Reservation.CardList";

const ReservationNavigationPanel = ({
  weekDays,
  calendarRows,
  reservations,
}: ReservationNavigationPanelProps) => {
  return (
    <section className="h-full w-[34.625rem] overflow-hidden rounded-xl bg-white shadow-[0_0_0.25rem_rgba(0,0,0,0.08)]">
      <div className="mt-[1.9375rem] flex w-full flex-col items-center gap-12 px-[1.65625rem]">
        <ReservationCalendar weekDays={weekDays} calendarRows={calendarRows} />
        <ReservationCardList reservations={reservations} />
      </div>
    </section>
  );
};

export { ReservationNavigationPanel };
