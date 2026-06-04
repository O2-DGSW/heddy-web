import {
  DESIGN_MAIN_HEIGHT_REM,
  DESIGN_MAIN_WIDTH_REM,
} from "@/pages/featureName/model/Reservation.constant";
import { useReservation } from "@/pages/featureName/model/useReservation";

import { ReservationNavigationPanel } from "./Reservation.NavigationPanel";
import { ReservationStatusPanel } from "./Reservation.StatusPanel";

const FeatureNamePage = () => {
  const { scale, weekDays, calendarRows, reservations, filterTabs, reservationStatusRows } =
    useReservation();

  return (
    <div
      className="h-[calc(100vh-4.25rem)] overflow-hidden bg-[#FAFAFA]"
      style={{
        height: `${DESIGN_MAIN_HEIGHT_REM * scale}rem`,
      }}
    >
      <div
        className="origin-top-left"
        style={{
          transform: `scale(${scale})`,
          width: `${DESIGN_MAIN_WIDTH_REM}rem`,
          height: `${DESIGN_MAIN_HEIGHT_REM}rem`,
        }}
      >
        <div className="ml-10 mt-[2.625rem] flex h-[51.875rem] w-[85.0625rem] gap-4">
          <ReservationNavigationPanel
            weekDays={weekDays}
            calendarRows={calendarRows}
            reservations={reservations}
          />
          <ReservationStatusPanel filterTabs={filterTabs} rows={reservationStatusRows} />
        </div>
      </div>
    </div>
  );
};

export { FeatureNamePage };
