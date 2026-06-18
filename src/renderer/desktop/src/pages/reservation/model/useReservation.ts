import { useEffect, useMemo, useRef, useState } from "react";

import {
  DEFAULT_RESERVATION_DATE_KEY,
  MIN_RESERVATION_SCALE,
  RESERVATION_CONTENT_HEIGHT_REM,
  RESERVATION_CONTENT_TOP_OFFSET_REM,
  RESERVATION_CONTENT_WIDTH_REM,
  RESERVATION_FILTER_STATUS_MAP,
  RESERVATION_FILTER_TAB_DEFINITIONS,
  RESERVATION_PAGE_HORIZONTAL_PADDING_REM,
  RESERVATION_RECORDS,
  RESERVATION_STATUS_CYCLE,
  RESERVATION_TIME_OPTIONS,
  RESERVATION_WEEK_DAYS,
} from "./Reservation.constant";
import type {
  ReservationFilterKey,
  ReservationRecord,
  ReservationStatusKey,
} from "./Reservation.types";

interface ReservationContainerSize {
  width: number;
  height: number;
}

let cachedRootFontSize: number | null = null;

const getRootFontSize = () => {
  if (cachedRootFontSize) {
    return cachedRootFontSize;
  }

  if (typeof window === "undefined") {
    return 16;
  }

  cachedRootFontSize =
    Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;

  return cachedRootFontSize;
};

const getMonthKey = (dateKey: string) => dateKey.slice(0, 7);

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

const getFirstDateKeyOfMonth = (monthKey: string) => `${monthKey}-01`;

const getNextStatus = (status: ReservationStatusKey) => {
  const currentIndex = RESERVATION_STATUS_CYCLE.indexOf(status);
  const nextIndex = (currentIndex + 1) % RESERVATION_STATUS_CYCLE.length;

  return RESERVATION_STATUS_CYCLE[nextIndex];
};

export const useReservation = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(getReservationScale);
  const [layoutWidthRem, setLayoutWidthRem] = useState(RESERVATION_CONTENT_WIDTH_REM);
  const [reservations, setReservations] = useState<ReservationRecord[]>(RESERVATION_RECORDS);
  const [selectedDateKey, setSelectedDateKey] = useState(DEFAULT_RESERVATION_DATE_KEY);
  const [selectedFilterKey, setSelectedFilterKey] = useState<ReservationFilterKey>("all");
  const [openedReservationId, setOpenedReservationId] = useState<number | null>(null);
  const [activeStatusMenuReservationId, setActiveStatusMenuReservationId] = useState<number | null>(null);
  const [timeChangeReservationId, setTimeChangeReservationId] = useState<number | null>(null);
  const [currentTimeValue, setCurrentTimeValue] = useState("");
  const [changedTimeValue, setChangedTimeValue] = useState("");
  const [isCurrentTimeMenuOpen, setIsCurrentTimeMenuOpen] = useState(false);
  const [isChangedTimeMenuOpen, setIsChangedTimeMenuOpen] = useState(false);
  const [isDetailTimeMenuOpen, setIsDetailTimeMenuOpen] = useState(false);

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
      const nextScale = getReservationScale(containerSize);
      const availableContentWidth =
        containerSize.width - RESERVATION_PAGE_HORIZONTAL_PADDING_REM * 2;

      setScale(nextScale);
      setLayoutWidthRem(Math.max(RESERVATION_CONTENT_WIDTH_REM, availableContentWidth / nextScale));
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

  const selectedMonthKey = getMonthKey(selectedDateKey);
  const selectedMonthDateKey = getFirstDateKeyOfMonth(selectedMonthKey);

  const reservationsForSelectedDate = useMemo(() => {
    return reservations
      .filter(reservation => reservation.dateKey === selectedDateKey)
      .sort((left, right) => left.time.localeCompare(right.time));
  }, [reservations, selectedDateKey]);

  const filteredReservationRows = useMemo(() => {
    const allowedStatuses = RESERVATION_FILTER_STATUS_MAP[selectedFilterKey];

    return reservationsForSelectedDate.filter(reservation => allowedStatuses.includes(reservation.status));
  }, [reservationsForSelectedDate, selectedFilterKey]);

  const filterTabs = useMemo(() => {
    return RESERVATION_FILTER_TAB_DEFINITIONS.map(tab => ({
      ...tab,
      active: tab.key === selectedFilterKey,
    }));
  }, [selectedFilterKey]);

  const setSelectedMonth = (monthKey: string) => {
    const firstReservationInMonth = reservations.find(
      reservation => getMonthKey(reservation.dateKey) === monthKey
    );

    setSelectedDateKey(firstReservationInMonth?.dateKey ?? getFirstDateKeyOfMonth(monthKey));
    setSelectedFilterKey("all");
    setOpenedReservationId(null);
    setActiveStatusMenuReservationId(null);
    setTimeChangeReservationId(null);
    setIsDetailTimeMenuOpen(false);
  };

  const updateReservationStatus = (reservationId: number, status: ReservationStatusKey) => {
    setReservations(currentReservations =>
      currentReservations.map(reservation =>
        reservation.id === reservationId
          ? { ...reservation, status }
          : reservation
      )
    );
  };

  const openedReservation = useMemo(() => {
    if (openedReservationId === null) {
      return null;
    }

    return reservations.find(reservation => reservation.id === openedReservationId) ?? null;
  }, [openedReservationId, reservations]);

  const openedTimeChangeReservation = useMemo(() => {
    if (timeChangeReservationId === null) {
      return null;
    }

    return reservations.find(reservation => reservation.id === timeChangeReservationId) ?? null;
  }, [reservations, timeChangeReservationId]);

  return {
    pageRef,
    scale,
    layoutWidthRem,
    weekDays: RESERVATION_WEEK_DAYS,
    monthDate: selectedMonthDateKey,
    selectedDateKey,
    reservations: reservationsForSelectedDate,
    filterTabs,
    reservationStatusRows: filteredReservationRows,
    openedReservation,
    openedTimeChangeReservation,
    timeOptions: RESERVATION_TIME_OPTIONS,
    currentTimeValue,
    changedTimeValue,
    isDetailTimeMenuOpen,
    isCurrentTimeMenuOpen,
    isChangedTimeMenuOpen,
    activeStatusMenuReservationId,
    setSelectedDateKey: (dateKey: string) => {
      setSelectedDateKey(dateKey);
      setSelectedFilterKey("all");
      setOpenedReservationId(null);
      setActiveStatusMenuReservationId(null);
      setTimeChangeReservationId(null);
      setIsDetailTimeMenuOpen(false);
    },
    setSelectedMonth: (monthDate: string) => setSelectedMonth(getMonthKey(monthDate)),
    setSelectedFilterKey,
    cycleReservationStatus: (reservationId: number) => {
      const reservation = reservations.find(item => item.id === reservationId);

      if (!reservation) {
        return;
      }

      updateReservationStatus(reservationId, getNextStatus(reservation.status));
    },
    setReservationStatus: (reservationId: number, status: ReservationStatusKey) => {
      updateReservationStatus(reservationId, status);
      setActiveStatusMenuReservationId(null);
    },
    toggleStatusMenu: (reservationId: number) => {
      setActiveStatusMenuReservationId(current =>
        current === reservationId ? null : reservationId
      );
      setOpenedReservationId(null);
    },
    openReservation: (reservationId: number) => {
      setOpenedReservationId(reservationId);
      setActiveStatusMenuReservationId(null);
      setTimeChangeReservationId(null);
      setIsDetailTimeMenuOpen(false);
    },
    closeReservation: () => {
      setOpenedReservationId(null);
      setIsDetailTimeMenuOpen(false);
    },
    toggleDetailTimeMenu: () => {
      setIsDetailTimeMenuOpen(current => !current);
    },
    selectDetailTime: (time: string) => {
      if (openedReservationId === null) {
        return;
      }

      setReservations(currentReservations =>
        currentReservations.map(reservation =>
          reservation.id === openedReservationId
            ? {
                ...reservation,
                time,
              }
            : reservation
        )
      );
      setIsDetailTimeMenuOpen(false);
    },
    openTimeChangeModal: (reservationId: number) => {
      const reservation = reservations.find(item => item.id === reservationId);

      if (!reservation) {
        return;
      }

      setTimeChangeReservationId(reservationId);
      setOpenedReservationId(null);
      setActiveStatusMenuReservationId(null);
      setIsDetailTimeMenuOpen(false);
      setCurrentTimeValue(reservation.time);
      setChangedTimeValue(reservation.requestedTime ?? reservation.time);
      setIsCurrentTimeMenuOpen(false);
      setIsChangedTimeMenuOpen(false);
    },
    closeTimeChangeModal: () => {
      setTimeChangeReservationId(null);
      setIsCurrentTimeMenuOpen(false);
      setIsChangedTimeMenuOpen(false);
    },
    toggleCurrentTimeMenu: () => {
      setIsCurrentTimeMenuOpen(current => !current);
      setIsChangedTimeMenuOpen(false);
    },
    toggleChangedTimeMenu: () => {
      setIsChangedTimeMenuOpen(current => !current);
      setIsCurrentTimeMenuOpen(false);
    },
    selectCurrentTime: (time: string) => {
      setCurrentTimeValue(time);
      setIsCurrentTimeMenuOpen(false);
    },
    selectChangedTime: (time: string) => {
      setChangedTimeValue(time);
      setIsChangedTimeMenuOpen(false);
    },
    saveTimeChange: () => {
      if (timeChangeReservationId === null) {
        return;
      }

      setReservations(currentReservations =>
        currentReservations.map(reservation =>
          reservation.id === timeChangeReservationId
            ? {
                ...reservation,
                time: changedTimeValue,
                requestedTime: undefined,
                status: "approved",
              }
            : reservation
        )
      );
      setTimeChangeReservationId(null);
      setIsCurrentTimeMenuOpen(false);
      setIsChangedTimeMenuOpen(false);
    },
  };
};
