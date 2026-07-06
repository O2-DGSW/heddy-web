import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { getShopDetail } from "@/entities/employee/api/employeeApi";
import {
  getReservations,
  updateReservationStatus as updateReservationStatusApi,
  type ReservationResponse,
} from "@/entities/reservation/api/reservationApi";
import { getMe } from "@/entities/user/api/userApi";
import {
  addDaysToDateKey,
  formatMonthLabel,
  getMonthStartKey,
  getTodayDateKey,
  parseDateKey,
  toDateKey,
} from "@/shared/ui/calendar/model/date";

import {
  MIN_SCHEDULE_SCALE,
  SCHEDULE_BOARD_DAY_COUNT,
  SCHEDULE_CONTENT_BOTTOM_OFFSET_REM,
  SCHEDULE_CONTENT_HEIGHT_REM,
  SCHEDULE_CONTENT_TOP_OFFSET_REM,
  SCHEDULE_CONTENT_WIDTH_REM,
  SCHEDULE_LEFT_PANEL_WIDTH_REM,
  SCHEDULE_PANEL_GAP_REM,
  SCHEDULE_PAGE_LEFT_PADDING_REM,
  SCHEDULE_PAGE_RIGHT_PADDING_REM,
  SCHEDULE_RIGHT_PANEL_WIDTH_REM,
  SCHEDULE_TIME_STEP_MINUTES,
  SCHEDULE_WEEK_DAYS,
} from "./Schedule.constant";
import type {
  ScheduleColorKey,
  ScheduleDesigner,
  ScheduleEvent,
  ScheduleFormValues,
  ScheduleSummaryItem,
} from "./Schedule.types";

interface ScheduleContainerSize {
  height: number;
  width: number;
}

interface ScheduleContainerPadding {
  bottom: number;
  left: number;
  right: number;
  top: number;
}

const DEFAULT_RESERVATION_DURATION_HOURS = 1;

const getRootFontSize = () => {
  if (typeof window === "undefined") {
    return 16;
  }

  const rootFontSize = window.getComputedStyle(document.documentElement)?.fontSize;

  return Number.parseFloat(rootFontSize ?? "") || 16;
};

const getWeekDateKeys = (weekStartDate: string) =>
  Array.from({ length: SCHEDULE_BOARD_DAY_COUNT }, (_, index) =>
    addDaysToDateKey(weekStartDate, index)
  );

const getWeekLabels = (weekDateKeys: string[]) =>
  weekDateKeys.map(dateKey => ({
    date: String(parseDateKey(dateKey).getDate()),
    day: SCHEDULE_WEEK_DAYS[parseDateKey(dateKey).getDay()] ?? "",
  }));

const getFallbackContainerSize = (): ScheduleContainerSize => {
  if (typeof window === "undefined") {
    return {
      width:
        SCHEDULE_PAGE_LEFT_PADDING_REM +
        SCHEDULE_CONTENT_WIDTH_REM +
        SCHEDULE_PAGE_RIGHT_PADDING_REM,
      height:
        SCHEDULE_CONTENT_TOP_OFFSET_REM +
        SCHEDULE_CONTENT_HEIGHT_REM +
        SCHEDULE_CONTENT_BOTTOM_OFFSET_REM,
    };
  }

  const rootFontSize = getRootFontSize();

  return {
    width: window.innerWidth / rootFontSize,
    height: window.innerHeight / rootFontSize,
  };
};

const getFallbackPadding = (): ScheduleContainerPadding => ({
  bottom: SCHEDULE_CONTENT_BOTTOM_OFFSET_REM,
  left: SCHEDULE_PAGE_LEFT_PADDING_REM,
  right: SCHEDULE_PAGE_RIGHT_PADDING_REM,
  top: SCHEDULE_CONTENT_TOP_OFFSET_REM,
});

const getElementPadding = (
  element: HTMLElement | null,
  rootFontSize: number
): ScheduleContainerPadding => {
  if (!element || typeof window === "undefined") {
    return getFallbackPadding();
  }

  const style = window.getComputedStyle(element);

  return {
    bottom: (Number.parseFloat(style.paddingBottom) || 0) / rootFontSize,
    left: (Number.parseFloat(style.paddingLeft) || 0) / rootFontSize,
    right: (Number.parseFloat(style.paddingRight) || 0) / rootFontSize,
    top: (Number.parseFloat(style.paddingTop) || 0) / rootFontSize,
  };
};

const getAvailableContentWidth = (
  containerSize = getFallbackContainerSize(),
  padding = getFallbackPadding()
) => {
  return Math.max(0, containerSize.width - padding.left - padding.right);
};

const getAvailableContentHeight = (
  containerSize = getFallbackContainerSize(),
  padding = getFallbackPadding()
) => {
  return Math.max(0, containerSize.height - padding.top - padding.bottom);
};

const getScheduleScale = (
  containerSize = getFallbackContainerSize(),
  padding = getFallbackPadding()
) => {
  const availableWidthRatio =
    getAvailableContentWidth(containerSize, padding) / SCHEDULE_CONTENT_WIDTH_REM;
  const availableHeightRatio =
    getAvailableContentHeight(containerSize, padding) / SCHEDULE_CONTENT_HEIGHT_REM;
  const viewportScale = Math.min(availableWidthRatio, availableHeightRatio);

  return Math.min(1, Math.max(MIN_SCHEDULE_SCALE, viewportScale));
};

const getHourFromTime = (time: string) => {
  const [hour = "0", minute = "0"] = time.split(":");

  return Number(hour) + Number(minute) / 60;
};

const getTimeFromDateTime = (dateTime?: string | null) => {
  if (!dateTime) {
    return "00:00";
  }

  const timeMatch = dateTime.match(/(?:T|\s)(\d{2}:\d{2})/);

  return timeMatch?.[1] ?? "00:00";
};

const getDateFromDateTime = (dateTime?: string | null) =>
  dateTime?.slice(0, 10) || getTodayDateKey();

const formatTimeFromHour = (hour: number) => {
  const totalMinutes =
    Math.round(Math.round(hour * 60) / SCHEDULE_TIME_STEP_MINUTES) * SCHEDULE_TIME_STEP_MINUTES;
  const normalizedMinutes = ((totalMinutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const timeHour = Math.floor(normalizedMinutes / 60);
  const minute = normalizedMinutes % 60;

  return `${String(timeHour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

const toDateTime = (date: string, time: string) => `${date}T${time}:00`;

const formatSummaryDate = (date: string) => {
  const [, month = "1", day = "1"] = date.split("-");

  return `${Number(month)}/${Number(day)}`;
};

const getMonthEndKey = (monthDate: string) => {
  const date = parseDateKey(monthDate);

  return toDateKey(new Date(date.getFullYear(), date.getMonth() + 1, 0));
};

const getScheduleColor = (status: string): ScheduleColorKey => {
  const normalizedStatus = status.trim().toUpperCase();

  if (normalizedStatus.includes("REJECT")) {
    return "red";
  }

  if (normalizedStatus.includes("CHANGE")) {
    return "yellow";
  }

  if (normalizedStatus.includes("APPROV") || normalizedStatus.includes("CONFIRM")) {
    return "green";
  }

  return "blue";
};

const formatTag = (tag: string) => {
  const trimmedTag = tag.trim();

  if (!trimmedTag) {
    return "";
  }

  return trimmedTag.startsWith("#") ? trimmedTag : `# ${trimmedTag}`;
};

const mapReservationToScheduleEvent = (
  reservation: ReservationResponse,
  visibleWeekDateKeys: string[]
): ScheduleEvent => {
  const date = getDateFromDateTime(reservation.reserved_at);
  const startHour = getHourFromTime(
    getTimeFromDateTime(reservation.changed_time ?? reservation.reserved_at)
  );
  const endHour = Math.min(24, startHour + DEFAULT_RESERVATION_DURATION_HOURS);
  const dayIndex = visibleWeekDateKeys.indexOf(date);
  const tags = (reservation.service_tags ?? []).map(formatTag).filter(Boolean);

  return {
    id: reservation.reservation_id,
    customerName:
      reservation.customer_name?.trim() ||
      reservation.customer_phone_number ||
      `고객 ${reservation.customer_id}`,
    designerId: reservation.designer_id,
    designerName: reservation.designer_name || `디자이너 ${reservation.designer_id}`,
    reservationStatus: reservation.status,
    tags,
    color: getScheduleColor(reservation.status),
    date,
    dayIndex: dayIndex === -1 ? 0 : dayIndex,
    startHour,
    endHour,
  };
};

const createSummaryItem = (event: ScheduleEvent): ScheduleSummaryItem => ({
  id: event.id,
  customerName: event.customerName,
  designerName: event.designerName,
  date: formatSummaryDate(event.date),
  time: formatTimeFromHour(event.startHour),
  tags: event.tags,
});

const getScheduleErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (!(error instanceof Error)) {
    return fallbackMessage;
  }

  if (error.message.includes("401")) {
    return "로그인 후 스케줄 정보를 확인해주세요.";
  }

  if (error.message.includes("404")) {
    return "요청한 스케줄 API를 찾지 못했습니다.";
  }

  if (error.message.includes("500")) {
    return "서버 오류로 스케줄 정보를 불러오지 못했습니다.";
  }

  return error.message || fallbackMessage;
};

export const useSchedule = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [initialDate] = useState(getTodayDateKey);
  const [scale, setScale] = useState(getScheduleScale);
  const [availableContentWidthRem, setAvailableContentWidthRem] =
    useState(getAvailableContentWidth);
  const [shopId, setShopId] = useState<number | null>(null);
  const [designers, setDesigners] = useState<ScheduleDesigner[]>([]);
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [visibleWeekStartDate, setVisibleWeekStartDate] = useState(initialDate);
  const [calendarMonthDate, setCalendarMonthDate] = useState(getMonthStartKey(initialDate));
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [isBootstrapLoading, setIsBootstrapLoading] = useState(true);
  const [isScheduleLoading, setIsScheduleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const layoutHeightRem = SCHEDULE_CONTENT_HEIGHT_REM;

  useLayoutEffect(() => {
    const updateLayout = () => {
      const pageElement = pageRef.current;
      const rootFontSize = getRootFontSize();
      const containerSize = pageElement
        ? {
            width: pageElement.getBoundingClientRect().width / rootFontSize,
            height: pageElement.getBoundingClientRect().height / rootFontSize,
          }
        : getFallbackContainerSize();
      const padding = getElementPadding(pageElement, rootFontSize);
      const nextAvailableContentWidthRem = getAvailableContentWidth(containerSize, padding);
      const nextScale = getScheduleScale(containerSize, padding);

      setAvailableContentWidthRem(currentWidth =>
        Math.abs(currentWidth - nextAvailableContentWidthRem) > 0.001
          ? nextAvailableContentWidthRem
          : currentWidth
      );
      setScale(currentScale =>
        Math.abs(currentScale - nextScale) > 0.001 ? nextScale : currentScale
      );
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

    const loadShopContext = async () => {
      setIsBootstrapLoading(true);
      setErrorMessage("");

      try {
        const me = await getMe();
        const firstShopId = me.shopMembers[0]?.shopId;

        if (!firstShopId) {
          throw new Error("연결된 매장이 없습니다.");
        }

        const shop = await getShopDetail(firstShopId);
        const nextDesigners = shop.designers.map(designer => ({
          id: designer.designer_id,
          name: designer.name || `디자이너 ${designer.designer_id}`,
        }));

        if (!ignore) {
          setShopId(firstShopId);
          setDesigners(nextDesigners);
          setActionMessage(nextDesigners.length === 0 ? "매장에 등록된 디자이너가 없습니다." : "");
        }
      } catch (error) {
        if (!ignore) {
          setShopId(null);
          setDesigners([]);
          setEvents([]);
          setErrorMessage(getScheduleErrorMessage(error, "스케줄 정보를 불러오지 못했습니다."));
        }
      } finally {
        if (!ignore) {
          setIsBootstrapLoading(false);
        }
      }
    };

    loadShopContext();

    return () => {
      ignore = true;
    };
  }, []);

  const visibleWeekDateKeys = useMemo(
    () => getWeekDateKeys(visibleWeekStartDate),
    [visibleWeekStartDate]
  );

  const loadCalendarReservations = useCallback(
    async (monthDate: string, nextVisibleWeekDateKeys = visibleWeekDateKeys) => {
      if (shopId === null) {
        return;
      }

      setIsScheduleLoading(true);
      setErrorMessage("");

      try {
        const reservationResponses = await getReservations({
          shopId,
          date: getMonthStartKey(monthDate),
          endDate: getMonthEndKey(monthDate),
        });

        setEvents(
          reservationResponses.map(reservation =>
            mapReservationToScheduleEvent(reservation, nextVisibleWeekDateKeys)
          )
        );
      } catch (error) {
        setEvents([]);
        setErrorMessage(getScheduleErrorMessage(error, "스케줄 정보를 불러오지 못했습니다."));
      } finally {
        setIsScheduleLoading(false);
      }
    },
    [shopId, visibleWeekDateKeys]
  );

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      if (shopId === null) {
        return;
      }

      setIsScheduleLoading(true);
      setErrorMessage("");

      try {
        const reservationResponses = await getReservations({
          shopId,
          date: getMonthStartKey(calendarMonthDate),
          endDate: getMonthEndKey(calendarMonthDate),
        });

        if (!ignore) {
          setEvents(
            reservationResponses.map(reservation =>
              mapReservationToScheduleEvent(reservation, visibleWeekDateKeys)
            )
          );
        }
      } catch (error) {
        if (!ignore) {
          setEvents([]);
          setErrorMessage(getScheduleErrorMessage(error, "스케줄 정보를 불러오지 못했습니다."));
        }
      } finally {
        if (!ignore) {
          setIsScheduleLoading(false);
        }
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [calendarMonthDate, shopId, visibleWeekDateKeys]);

  const weekLabels = useMemo(() => getWeekLabels(visibleWeekDateKeys), [visibleWeekDateKeys]);
  const monthLabel = useMemo(() => formatMonthLabel(selectedDate), [selectedDate]);
  const visibleEvents = useMemo(
    () => events.filter(event => visibleWeekDateKeys.includes(event.date)),
    [events, visibleWeekDateKeys]
  );
  const summaryItems = useMemo(
    () =>
      events
        .filter(event => event.date === selectedDate)
        .sort((firstEvent, secondEvent) => firstEvent.startHour - secondEvent.startHour)
        .map(createSummaryItem),
    [selectedDate, events]
  );
  const calendarMarkerMap = useMemo(
    () =>
      events.reduce<Record<string, number>>((markerMap, event) => {
        markerMap[event.date] = (markerMap[event.date] ?? 0) + 1;

        return markerMap;
      }, {}),
    [events]
  );
  const editingEvent = useMemo(
    () => events.find(event => event.id === editingEventId) ?? null,
    [editingEventId, events]
  );

  const focusDate = useCallback((date: string) => {
    setSelectedDate(date);
    setCalendarMonthDate(getMonthStartKey(date));
    setVisibleWeekStartDate(date);
  }, []);

  const selectDate = useCallback(
    (date: string) => {
      setActionMessage("");
      focusDate(date);
    },
    [focusDate]
  );

  const moveToPreviousDay = useCallback(() => {
    focusDate(addDaysToDateKey(selectedDate, -1));
  }, [focusDate, selectedDate]);

  const moveToNextDay = useCallback(() => {
    focusDate(addDaysToDateKey(selectedDate, 1));
  }, [focusDate, selectedDate]);

  const moveToToday = useCallback(() => {
    focusDate(getTodayDateKey());
  }, [focusDate]);

  const openModal = useCallback(() => {
    setActionMessage("");
    setEditingEventId(null);
    setIsModalOpen(true);
  }, []);

  const openEventModal = useCallback(
    (eventId: number) => {
      const event = events.find(item => item.id === eventId);

      if (!event) {
        return;
      }

      setActionMessage("");
      setEditingEventId(event.id);
      focusDate(event.date);
      setIsModalOpen(true);
    },
    [events, focusDate]
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingEventId(null);
  }, []);

  const saveSchedule = useCallback(
    async (values: ScheduleFormValues) => {
      if (!values.id) {
        setActionMessage(
          "예약 생성 API에는 고객/서비스 정보가 필요하지만 현재 스케줄 모달에는 해당 입력이 없어 저장하지 않았습니다."
        );
        return;
      }

      const event = events.find(currentEvent => currentEvent.id === values.id);

      if (!event) {
        setActionMessage("수정할 예약을 찾지 못했습니다.");
        return;
      }

      try {
        await updateReservationStatusApi(values.id, {
          status: event.reservationStatus,
          designer_id: values.designerId,
          changed_time: toDateTime(values.date, values.startTime),
        });
        focusDate(values.date);
        await loadCalendarReservations(getMonthStartKey(values.date), getWeekDateKeys(values.date));
        setActionMessage(
          "예약 시간/디자이너 변경을 저장했습니다. 종료 시간은 서버 API가 없어 반영하지 않았습니다."
        );
        closeModal();
      } catch (error) {
        setActionMessage(getScheduleErrorMessage(error, "스케줄을 저장하지 못했습니다."));
      }
    },
    [closeModal, events, focusDate, loadCalendarReservations]
  );

  const deleteSchedule = useCallback(
    (eventId: number) => {
      const event = events.find(currentEvent => currentEvent.id === eventId);

      setActionMessage(
        event
          ? "Swagger에 예약 삭제 API가 없어 서버 데이터를 삭제하지 않았습니다."
          : "삭제할 예약을 찾지 못했습니다."
      );
      closeModal();
    },
    [closeModal, events]
  );

  const layoutWidthRem = Math.max(SCHEDULE_CONTENT_WIDTH_REM, availableContentWidthRem / scale);
  const rightPanelWidthRem = Math.max(
    SCHEDULE_RIGHT_PANEL_WIDTH_REM,
    layoutWidthRem - SCHEDULE_LEFT_PANEL_WIDTH_REM - SCHEDULE_PANEL_GAP_REM
  );

  return {
    pageRef,
    scale,
    layoutWidthRem,
    layoutHeightRem,
    rightPanelWidthRem,
    scaledLayoutWidthRem: layoutWidthRem * scale,
    scaledLayoutHeightRem: layoutHeightRem * scale,
    selectedDate,
    calendarMonthDate,
    calendarMarkerMap,
    summaryItems,
    events: visibleEvents,
    designers,
    editingEvent,
    visibleWeekDateKeys,
    weekLabels,
    monthLabel,
    isModalOpen,
    isLoading: isBootstrapLoading || isScheduleLoading,
    errorMessage,
    actionMessage,
    setCalendarMonthDate,
    selectDate,
    openModal,
    openEventModal,
    closeModal,
    saveSchedule,
    deleteSchedule,
    moveToPreviousDay,
    moveToNextDay,
    moveToToday,
  };
};
