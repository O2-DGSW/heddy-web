import type { ReservationNavigationPanelProps } from "@/pages/featureName/model/Reservation.types";

import { ReservationCalendar } from "./Reservation.Calendar";
import { ReservationCardList } from "./Reservation.CardList";

const ReservationNavigationPanel = ({
  weekDays,
  calendarRows,
  reservations,
}: ReservationNavigationPanelProps) => {
  return (
    <section className="h-full w-[34.625rem] overflow-hidden rounded-xl bg-white shadow-[0_0_0.25rem_rgba(0,0,0,0.08)]">
      <div className="mx-auto mt-[1.9375rem] flex w-[31.25rem] flex-col items-center gap-12">
        <ReservationCalendar weekDays={weekDays} calendarRows={calendarRows} />
        <ReservationCardList reservations={reservations} />
      </div>
    </section>
  );
};

export { ReservationNavigationPanel };
