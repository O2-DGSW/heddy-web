import { useEffect, useState } from "react";

import {
  DESKTOP_BAR_WIDTH_PX,
  DESIGN_MAIN_WIDTH_PX,
  RESERVATION_CALENDAR_ROWS,
  RESERVATION_FILTER_TABS,
  RESERVATION_LIST,
  RESERVATION_STATUS_ROWS,
  RESERVATION_WEEK_DAYS,
} from "./Reservation.constant";

const getReservationScale = () => {
  if (typeof window === "undefined") {
    return 1;
  }

  return Math.min(
    1,
    Math.max(0.32, (window.innerWidth - DESKTOP_BAR_WIDTH_PX) / DESIGN_MAIN_WIDTH_PX)
  );
};

export const useReservation = () => {
  const [scale, setScale] = useState(getReservationScale);

  useEffect(() => {
    const handleResize = () => {
      setScale(getReservationScale());
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    scale,
    weekDays: RESERVATION_WEEK_DAYS,
    calendarRows: RESERVATION_CALENDAR_ROWS,
    reservations: RESERVATION_LIST,
    filterTabs: RESERVATION_FILTER_TABS,
    reservationStatusRows: RESERVATION_STATUS_ROWS,
  };
};
