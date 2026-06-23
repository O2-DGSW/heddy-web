import { useEffect, useMemo, useRef, useState } from "react";

import {
  getReservations,
  updateReservationStatus as updateReservationStatusApi,
  type ReservationApiStatus,
  type ReservationResponse,
} from "@/entities/reservation/api/reservationApi";
import { getMe } from "@/entities/user/api/userApi";
import {
  MIN_RESERVATION_SCALE,
  RESERVATION_CONTENT_HEIGHT_REM,
  RESERVATION_CONTENT_TOP_OFFSET_REM,
  RESERVATION_CONTENT_WIDTH_REM,
  RESERVATION_FILTER_STATUS_MAP,
  RESERVATION_FILTER_TAB_DEFINITIONS,
  RESERVATION_PAGE_HORIZONTAL_PADDING_REM,
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

const getTodayDateKey = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${date}`;
};

const getDateKeyFromDateTime = (dateTime: string) => dateTime.slice(0, 10);

const getTimeFromDateTime = (dateTime?: string | null) => {
  if (!dateTime) {
    return "";
  }

  return dateTime.slice(11, 16);
};

const getDateLabel = (dateKey: string) => {
  const [, month, day] = dateKey.split("-");

  return `${Number(month)}월 ${Number(day)}일`;
};

const toReservationStatusKey = (status: string): ReservationStatusKey => {
  const normalizedStatus = status.trim().toUpperCase();

  if (normalizedStatus.includes("REJECT")) {
    return "rejected";
  }

  if (normalizedStatus.includes("CHANGE")) {
    return "changeRequest";
  }

  return "approved";
};

const toReservationApiStatus = (status: ReservationStatusKey): ReservationApiStatus => {
  const statusMap: Record<ReservationStatusKey, ReservationApiStatus> = {
    approved: "APPROVED",
    rejected: "REJECTED",
    changeRequest: "CHANGE_REQUEST",
  };

  return statusMap[status];
};

const toDateTime = (dateKey: string, time: string) => `${dateKey}T${time}:00`;

const mapReservationResponse = (reservation: ReservationResponse): ReservationRecord => {
  const dateKey = getDateKeyFromDateTime(reservation.reserved_at);
  const time = getTimeFromDateTime(reservation.reserved_at);
  const changedTime = getTimeFromDateTime(reservation.changed_time);
  const tags = reservation.service_tags.map(tag => (tag.startsWith("#") ? tag : `# ${tag}`));
  const service =
    reservation.service_name ?? reservation.service_tags[0]?.replace(/^#\s*/, "") ?? "시술";

  return {
    id: reservation.reservation_id,
    customerName:
      reservation.customer_name ??
      reservation.customer_phone_number ??
      `고객 ${reservation.customer_id}`,
    service,
    dateKey,
    dateLabel: getDateLabel(dateKey),
    time,
    requestedTime: changedTime && changedTime !== time ? changedTime : undefined,
    tags,
    request: reservation.memo || "요청사항 없음",
    status: toReservationStatusKey(reservation.status),
  };
};

const getReservationErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (!(error instanceof Error)) {
    return fallbackMessage;
  }

  if (error.message.includes("401")) {
    return "로그인 후 예약 정보를 확인해주세요.";
  }

  return error.message;
};

const getNextStatus = (status: ReservationStatusKey) => {
  const currentIndex = RESERVATION_STATUS_CYCLE.indexOf(status);
  const nextIndex = (currentIndex + 1) % RESERVATION_STATUS_CYCLE.length;

  return RESERVATION_STATUS_CYCLE[nextIndex];
};

export const useReservation = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(getReservationScale);
  const [layoutWidthRem, setLayoutWidthRem] = useState(RESERVATION_CONTENT_WIDTH_REM);
  const [shopId, setShopId] = useState<number | null>(null);
  const [reservations, setReservations] = useState<ReservationRecord[]>([]);
  const [selectedDateKey, setSelectedDateKey] = useState(getTodayDateKey);
  const [selectedFilterKey, setSelectedFilterKey] = useState<ReservationFilterKey>("all");
  const [openedReservationId, setOpenedReservationId] = useState<number | null>(null);
  const [activeStatusMenuReservationId, setActiveStatusMenuReservationId] = useState<number | null>(
    null
  );
  const [timeChangeReservationId, setTimeChangeReservationId] = useState<number | null>(null);
  const [currentTimeValue, setCurrentTimeValue] = useState("");
  const [changedTimeValue, setChangedTimeValue] = useState("");
  const [isCurrentTimeMenuOpen, setIsCurrentTimeMenuOpen] = useState(false);
  const [isChangedTimeMenuOpen, setIsChangedTimeMenuOpen] = useState(false);
  const [isDetailTimeMenuOpen, setIsDetailTimeMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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

  useEffect(() => {
    let ignore = false;

    const loadMe = async () => {
      setIsLoading(true);

      try {
        const me = await getMe();
        const firstShopId = me.shopMembers[0]?.shopId;

        if (!firstShopId) {
          throw new Error("연결된 매장을 찾지 못했습니다.");
        }

        if (!ignore) {
          setShopId(firstShopId);
          setErrorMessage("");
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage(getReservationErrorMessage(error, "사용자 정보를 불러오지 못했습니다."));
          setIsLoading(false);
        }
      }
    };

    loadMe();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (shopId === null) {
      return;
    }

    let ignore = false;

    const loadReservations = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const reservationResponses = await getReservations({
          shopId,
          date: selectedDateKey,
        });

        if (!ignore) {
          setReservations(reservationResponses.map(mapReservationResponse));
        }
      } catch (error) {
        if (!ignore) {
          setReservations([]);
          setErrorMessage(getReservationErrorMessage(error, "예약 목록을 불러오지 못했습니다."));
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadReservations();

    return () => {
      ignore = true;
    };
  }, [selectedDateKey, shopId]);

  const selectedMonthKey = getMonthKey(selectedDateKey);
  const selectedMonthDateKey = getFirstDateKeyOfMonth(selectedMonthKey);

  const reservationsForSelectedDate = useMemo(() => {
    return reservations
      .filter(reservation => reservation.dateKey === selectedDateKey)
      .sort((left, right) => left.time.localeCompare(right.time));
  }, [reservations, selectedDateKey]);

  const filteredReservationRows = useMemo(() => {
    const allowedStatuses = RESERVATION_FILTER_STATUS_MAP[selectedFilterKey];

    return reservationsForSelectedDate.filter(reservation =>
      allowedStatuses.includes(reservation.status)
    );
  }, [reservationsForSelectedDate, selectedFilterKey]);

  const filterTabs = useMemo(() => {
    return RESERVATION_FILTER_TAB_DEFINITIONS.map(tab => ({
      ...tab,
      active: tab.key === selectedFilterKey,
    }));
  }, [selectedFilterKey]);

  const setSelectedMonth = (monthKey: string) => {
    setSelectedDateKey(getFirstDateKeyOfMonth(monthKey));
    setSelectedFilterKey("all");
    setOpenedReservationId(null);
    setActiveStatusMenuReservationId(null);
    setTimeChangeReservationId(null);
    setIsDetailTimeMenuOpen(false);
  };

  const replaceReservation = (nextReservation: ReservationRecord) => {
    setReservations(currentReservations =>
      currentReservations.map(reservation =>
        reservation.id === nextReservation.id ? nextReservation : reservation
      )
    );
  };

  const updateReservationStatus = async (
    reservationId: number,
    status: ReservationStatusKey,
    changedTime?: string
  ) => {
    const reservation = reservations.find(item => item.id === reservationId);

    if (!reservation) {
      return;
    }

    setErrorMessage("");

    try {
      const updatedReservation = await updateReservationStatusApi(reservationId, {
        status: toReservationApiStatus(status),
        changed_time: changedTime ? toDateTime(reservation.dateKey, changedTime) : undefined,
      });

      replaceReservation(mapReservationResponse(updatedReservation));
    } catch (error) {
      setErrorMessage(getReservationErrorMessage(error, "예약 상태를 변경하지 못했습니다."));
    }
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
    isLoading,
    errorMessage,
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
    cycleReservationStatus: async (reservationId: number) => {
      const reservation = reservations.find(item => item.id === reservationId);

      if (!reservation) {
        return;
      }

      await updateReservationStatus(reservationId, getNextStatus(reservation.status));
    },
    setReservationStatus: async (reservationId: number, status: ReservationStatusKey) => {
      await updateReservationStatus(reservationId, status);
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
    selectDetailTime: async (time: string) => {
      if (openedReservationId === null) {
        return;
      }

      const reservation = reservations.find(item => item.id === openedReservationId);

      if (!reservation) {
        return;
      }

      await updateReservationStatus(openedReservationId, reservation.status, time);
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
    saveTimeChange: async () => {
      if (timeChangeReservationId === null) {
        return;
      }

      await updateReservationStatus(timeChangeReservationId, "approved", changedTimeValue);
      setTimeChangeReservationId(null);
      setIsCurrentTimeMenuOpen(false);
      setIsChangedTimeMenuOpen(false);
    },
  };
};
