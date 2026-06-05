import {
  RESERVATION_CONTENT_HEIGHT_REM,
  RESERVATION_CONTENT_TOP_OFFSET_REM,
  RESERVATION_PAGE_HORIZONTAL_PADDING_REM,
} from "@/pages/reservation/model/Reservation.constant";
import { useReservation } from "@/pages/reservation/model/useReservation";

import { ReservationNavigationPanel } from "./Reservation.NavigationPanel";
import { ReservationStatusPanel } from "./Reservation.StatusPanel";

const ReservationPage = () => {
  const {
    scale,
    layoutWidthRem,
    weekDays,
    calendarRows,
    reservations,
    filterTabs,
    reservationStatusRows,
    pageRef,
  } = useReservation();
  const layoutHeightRem = RESERVATION_CONTENT_TOP_OFFSET_REM + RESERVATION_CONTENT_HEIGHT_REM;

  return (
    <div
      ref={pageRef}
      className="h-full overflow-hidden bg-[#FAFAFA]"
      style={{
        paddingLeft: `${RESERVATION_PAGE_HORIZONTAL_PADDING_REM}rem`,
        paddingRight: `${RESERVATION_PAGE_HORIZONTAL_PADDING_REM}rem`,
      }}
    >
      <div
        className="shrink-0 overflow-hidden"
        style={{
          width: `${layoutWidthRem * scale}rem`,
          height: `${layoutHeightRem * scale}rem`,
        }}
      >
        <div
          className="origin-top-left"
          style={{
            transform: `scale(${scale})`,
            width: `${layoutWidthRem}rem`,
            height: `${layoutHeightRem}rem`,
          }}
        >
          <div
            className="flex gap-4"
            style={{
              width: `${layoutWidthRem}rem`,
              height: `${RESERVATION_CONTENT_HEIGHT_REM}rem`,
              paddingTop: `${RESERVATION_CONTENT_TOP_OFFSET_REM}rem`,
            }}
          >
            <ReservationNavigationPanel
              weekDays={weekDays}
              calendarRows={calendarRows}
              reservations={reservations}
            />
            <ReservationStatusPanel filterTabs={filterTabs} rows={reservationStatusRows} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { ReservationPage };
