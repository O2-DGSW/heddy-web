import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";

import {
  addDaysToDateKey,
  formatMonthLabel,
  getMonthStartKey,
  getTodayDateKey,
  parseDateKey,
} from "@/shared/ui/calendar/model/date";

import {
  MIN_SCHEDULE_SCALE,
  SCHEDULE_BOARD_DAY_COUNT,
  SCHEDULE_CONTENT_BOTTOM_OFFSET_REM,
  SCHEDULE_CONTENT_HEIGHT_REM,
  SCHEDULE_CONTENT_TOP_OFFSET_REM,
  SCHEDULE_CONTENT_WIDTH_REM,
  SCHEDULE_DESIGNERS,
  SCHEDULE_LEFT_PANEL_WIDTH_REM,
  SCHEDULE_PANEL_GAP_REM,
  SCHEDULE_PAGE_LEFT_PADDING_REM,
  SCHEDULE_PAGE_RIGHT_PADDING_REM,
  SCHEDULE_RIGHT_PANEL_WIDTH_REM,
  SCHEDULE_TIME_STEP_MINUTES,
  SCHEDULE_WEEK_DAYS,
} from "./Schedule.constant";
import { SCHEDULE_EVENTS } from "./Schedule.mock";
import type { ScheduleEvent, ScheduleFormValues, ScheduleSummaryItem } from "./Schedule.types";

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

const DEFAULT_CUSTOMER_NAME = "오용준";
const DEFAULT_TAGS = ["# 남자", "# 다운펌"];

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

const formatTimeFromHour = (hour: number) => {
  const totalMinutes =
    Math.round(Math.round(hour * 60) / SCHEDULE_TIME_STEP_MINUTES) * SCHEDULE_TIME_STEP_MINUTES;
  const normalizedMinutes = ((totalMinutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const timeHour = Math.floor(normalizedMinutes / 60);
  const minute = normalizedMinutes % 60;

  return `${String(timeHour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

const formatSummaryDate = (date: string) => {
  const [, month = "1", day = "1"] = date.split("-");

  return `${Number(month)}/${Number(day)}`;
};

const getDesigner = (designerId: string) =>
  SCHEDULE_DESIGNERS.find(item => item.id === designerId) ?? SCHEDULE_DESIGNERS[0];

const createEventFromValues = (
  id: number,
  values: ScheduleFormValues,
  visibleWeekDateKeys: string[]
): ScheduleEvent => {
  const designer = getDesigner(values.designerId);
  const startHour = getHourFromTime(values.startTime);
  const endHour = Math.max(
    startHour + SCHEDULE_TIME_STEP_MINUTES / 60,
    getHourFromTime(values.endTime)
  );
  const dayIndex = visibleWeekDateKeys.indexOf(values.date);

  return {
    id,
    customerName: DEFAULT_CUSTOMER_NAME,
    designerId: designer?.id ?? values.designerId,
    designerName: designer?.name ?? DEFAULT_CUSTOMER_NAME,
    tags: DEFAULT_TAGS,
    color: values.color,
    date: values.date,
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

export const useSchedule = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const nextEventIdRef = useRef(SCHEDULE_EVENTS.length + 1);
  const [initialDate] = useState(getTodayDateKey);
  const [scale, setScale] = useState(getScheduleScale);
  const [availableContentWidthRem, setAvailableContentWidthRem] =
    useState(getAvailableContentWidth);
  const [events, setEvents] = useState(SCHEDULE_EVENTS);
  const [visibleWeekStartDate, setVisibleWeekStartDate] = useState(initialDate);
  const [calendarMonthDate, setCalendarMonthDate] = useState(getMonthStartKey(initialDate));
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
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

  const visibleWeekDateKeys = useMemo(
    () => getWeekDateKeys(visibleWeekStartDate),
    [visibleWeekStartDate]
  );
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
    setEditingEventId(null);
    setIsModalOpen(true);
  }, []);

  const openEventModal = useCallback(
    (eventId: number) => {
      const event = events.find(item => item.id === eventId);

      if (!event) {
        return;
      }

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

  const createSchedule = useCallback(
    (values: ScheduleFormValues) => {
      const nextEventId = nextEventIdRef.current;

      nextEventIdRef.current += 1;

      setEvents(currentEvents => [
        ...currentEvents,
        createEventFromValues(nextEventId, values, visibleWeekDateKeys),
      ]);
      focusDate(values.date);
      closeModal();
    },
    [closeModal, focusDate, visibleWeekDateKeys]
  );

  const updateSchedule = useCallback(
    (values: ScheduleFormValues) => {
      if (!values.id) {
        return;
      }

      setEvents(currentEvents =>
        currentEvents.map(event =>
          event.id === values.id
            ? {
                ...createEventFromValues(values.id, values, visibleWeekDateKeys),
                customerName: event.customerName,
                tags: event.tags,
              }
            : event
        )
      );
      focusDate(values.date);
      closeModal();
    },
    [closeModal, focusDate, visibleWeekDateKeys]
  );

  const deleteSchedule = useCallback(
    (eventId: number) => {
      setEvents(currentEvents => currentEvents.filter(event => event.id !== eventId));
      closeModal();
    },
    [closeModal]
  );

  const saveSchedule = useCallback(
    (values: ScheduleFormValues) => {
      if (values.id) {
        updateSchedule(values);
        return;
      }

      createSchedule(values);
    },
    [createSchedule, updateSchedule]
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
    editingEvent,
    visibleWeekDateKeys,
    weekLabels,
    monthLabel,
    isModalOpen,
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
