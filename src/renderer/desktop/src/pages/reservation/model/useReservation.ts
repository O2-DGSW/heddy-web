import { useEffect, useRef, useState } from "react";

import {
  MIN_RESERVATION_SCALE,
  RESERVATION_CONTENT_HEIGHT_REM,
  RESERVATION_CONTENT_TOP_OFFSET_REM,
  RESERVATION_CONTENT_WIDTH_REM,
  RESERVATION_PAGE_HORIZONTAL_PADDING_REM,
  RESERVATION_CALENDAR_ROWS,
  RESERVATION_FILTER_TABS,
  RESERVATION_LIST,
  RESERVATION_STATUS_ROWS,
  RESERVATION_WEEK_DAYS,
} from "./Reservation.constant";

const getRootFontSize = () => {
  if (typeof window === "undefined") {
    return 16;
  }

  return Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
};

interface ReservationContainerSize {
  width: number;
  height: number;
}

const getFallbackContainerSize = (): ReservationContainerSize => {
  if (typeof window === "undefined") {
    return {
      width: RESERVATION_CONTENT_WIDTH_REM + RESERVATION_PAGE_HORIZONTAL_PADDING_REM * 2,
      height: RESERVATION_CONTENT_TOP_OFFSET_REM + RESERVATION_CONTENT_HEIGHT_REM,
    };
  }

  const rootFontSize = getRootFontSize();

  return {
    width: window.innerWidth / rootFontSize,
    height: window.innerHeight / rootFontSize,
  };
};

const getReservationScale = (containerSize = getFallbackContainerSize()) => {
  const availableWidthRatio =
    (containerSize.width - RESERVATION_PAGE_HORIZONTAL_PADDING_REM * 2) /
    RESERVATION_CONTENT_WIDTH_REM;
  const availableHeightRatio =
    containerSize.height / (RESERVATION_CONTENT_TOP_OFFSET_REM + RESERVATION_CONTENT_HEIGHT_REM);
  const viewportScale = Math.min(availableWidthRatio, availableHeightRatio);

  return Math.min(1, Math.max(MIN_RESERVATION_SCALE, viewportScale));
};

const getAvailableContentWidth = (containerSize = getFallbackContainerSize()) => {
  return containerSize.width - RESERVATION_PAGE_HORIZONTAL_PADDING_REM * 2;
};

export const useReservation = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(getReservationScale);
  const [availableContentWidthRem, setAvailableContentWidthRem] =
    useState(getAvailableContentWidth);

  useEffect(() => {
    const updateLayout = () => {
      const pageElement = pageRef.current;
      const rootFontSize = getRootFontSize();
      const containerSize = pageElement
        ? {
            width: pageElement.getBoundingClientRect().width / rootFontSize,
            height: pageElement.getBoundingClientRect().height / rootFontSize,
          }
        : getFallbackContainerSize();

      setAvailableContentWidthRem(getAvailableContentWidth(containerSize));
      setScale(getReservationScale(containerSize));
    };

    updateLayout();

    const resizeObserver = new ResizeObserver(updateLayout);

    if (pageRef.current) {
      resizeObserver.observe(pageRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return {
    pageRef,
    scale,
    layoutWidthRem: Math.max(RESERVATION_CONTENT_WIDTH_REM, availableContentWidthRem / scale),
    weekDays: RESERVATION_WEEK_DAYS,
    calendarRows: RESERVATION_CALENDAR_ROWS,
    reservations: RESERVATION_LIST,
    filterTabs: RESERVATION_FILTER_TABS,
    reservationStatusRows: RESERVATION_STATUS_ROWS,
  };
};
