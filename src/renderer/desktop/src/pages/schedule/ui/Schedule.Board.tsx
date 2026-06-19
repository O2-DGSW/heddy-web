import { useLayoutEffect, useMemo, useRef } from "react";
import { lightTheme, palette } from "@design-tokens";

import chevronLeftIcon from "@/pages/schedule/assets/svg/chevron-left.svg";
import chevronRightIcon from "@/pages/schedule/assets/svg/chevron-right.svg";
import plusIcon from "@/pages/schedule/assets/svg/plus.svg";
import {
  SCHEDULE_CHART_END_HOUR,
  SCHEDULE_CHART_EVENT_LAYER_HEIGHT_REM,
  SCHEDULE_CHART_EVENT_LAYER_LEFT_REM,
  SCHEDULE_CHART_EVENT_LAYER_TOP_REM,
  SCHEDULE_CHART_GRID_OFFSET_REM,
  SCHEDULE_CHART_HOUR_WIDTH_REM,
  SCHEDULE_CHART_INITIAL_HOUR,
  SCHEDULE_CHART_ROW_HEIGHT_REM,
  SCHEDULE_CHART_START_HOUR,
  SCHEDULE_EVENT_LANE_STEP_REM,
  SCHEDULE_MONTH_LABEL,
  SCHEDULE_WEEK_LABELS,
} from "@/pages/schedule/model/Schedule.constant";
import type { ScheduleEvent } from "@/pages/schedule/model/Schedule.types";

import { ScheduleEventCard } from "./Schedule.EventCard";

interface ScheduleBoardProps {
  events: ScheduleEvent[];
  panelWidthRem: number;
  onOpenModal: () => void;
}

const textStyle = {
  letterSpacing: 0,
};

interface PositionedScheduleEvent {
  event: ScheduleEvent;
  lane: number;
}

const CURRENT_HOUR = 11;
const EVENT_TOP_OFFSET_REM = 0.75;
const BOARD_INNER_LEFT_REM = 1.375;
const BOARD_INNER_RIGHT_REM = 1.375;
const BOARD_INNER_TOP_REM = 1.3125;
const BOARD_INNER_BOTTOM_REM = 1.25;
const CHART_TOP_REM = 3.75;
const CHART_SCROLL_VIEW_TOP_REM = 2.1875;
const CHART_SCROLL_VIEW_HEIGHT_REM = 42.25;
const CHART_SCROLL_VIEW_RIGHT_REM = 1.3125;
const TIME_LABEL_LEFT_REM = 1.3125;
const TIME_LABEL_WIDTH_REM = 3.875;
const CHART_SCROLL_END_PADDING_REM = 1.5;
const WEEK_LABEL_LEFT_REM = 1.6875;
const WEEK_LABEL_TOP_REM = 6.1875;
const WEEK_LABEL_STEP_REM = 7.6875;
const EVENT_LAYER_TOP_REM = SCHEDULE_CHART_EVENT_LAYER_TOP_REM - CHART_TOP_REM;
const EVENT_LAYER_TOP_IN_SCROLL_REM = EVENT_LAYER_TOP_REM - CHART_SCROLL_VIEW_TOP_REM;
const HORIZONTAL_LINE_LEFT_REM = 0.8125;
const HORIZONTAL_LINE_RIGHT_REM = 1.25;
const HORIZONTAL_LINE_TOP_REM = 13.125;
const HORIZONTAL_LINE_HEIGHT_REM = 30.5;

const getRootFontSize = () => {
  if (typeof window === "undefined") {
    return 16;
  }

  const rootFontSize = window.getComputedStyle(document.documentElement)?.fontSize;

  return Number.parseFloat(rootFontSize ?? "") || 16;
};

const clampHour = (hour: number) =>
  Math.min(SCHEDULE_CHART_END_HOUR, Math.max(SCHEDULE_CHART_START_HOUR, hour));

const hourToChartRem = (hour: number, shouldClamp = false) =>
  SCHEDULE_CHART_GRID_OFFSET_REM +
  ((shouldClamp ? clampHour(hour) : hour) - SCHEDULE_CHART_START_HOUR) *
    SCHEDULE_CHART_HOUR_WIDTH_REM;

const getTimelineEndHour = (events: ScheduleEvent[], minimumVisibleHourRange: number) => {
  const latestEventEndHour = events.reduce(
    (maxEndHour, event) => Math.max(maxEndHour, event.endHour),
    SCHEDULE_CHART_END_HOUR
  );

  return Math.max(
    SCHEDULE_CHART_END_HOUR,
    SCHEDULE_CHART_START_HOUR + minimumVisibleHourRange,
    Math.ceil(latestEventEndHour)
  );
};

const getTimelineHours = (endHour: number) =>
  Array.from(
    { length: endHour - SCHEDULE_CHART_START_HOUR + 1 },
    (_, index) => SCHEDULE_CHART_START_HOUR + index
  );

const formatTimelineHour = (hour: number) => {
  if (hour <= 24) {
    return `${hour}:00`;
  }

  const wrappedHour = hour % 24;

  return `${wrappedHour === 0 ? 24 : wrappedHour}:00`;
};

const getPositionedEvents = (events: ScheduleEvent[]): PositionedScheduleEvent[] => {
  const laneEndsByDay = new Map<number, number[]>();

  return [...events]
    .sort(
      (firstEvent, secondEvent) =>
        firstEvent.dayIndex - secondEvent.dayIndex ||
        firstEvent.startHour - secondEvent.startHour ||
        firstEvent.endHour - secondEvent.endHour
    )
    .map(event => {
      const laneEnds = laneEndsByDay.get(event.dayIndex) ?? [];
      const availableLaneIndex = laneEnds.findIndex(endHour => endHour <= event.startHour);
      const lane = availableLaneIndex === -1 ? laneEnds.length : availableLaneIndex;

      laneEnds[lane] = event.endHour;
      laneEndsByDay.set(event.dayIndex, laneEnds);

      return { event, lane };
    });
};

const ScheduleBoard = ({ events, panelWidthRem, onOpenModal }: ScheduleBoardProps) => {
  const chartScrollRef = useRef<HTMLDivElement>(null);
  const boardInnerWidthRem = panelWidthRem - BOARD_INNER_LEFT_REM - BOARD_INNER_RIGHT_REM;
  const chartScrollViewportWidthRem =
    boardInnerWidthRem - SCHEDULE_CHART_EVENT_LAYER_LEFT_REM - CHART_SCROLL_VIEW_RIGHT_REM;
  const viewportHourRange = Math.max(
    0,
    Math.ceil(
      (chartScrollViewportWidthRem -
        TIME_LABEL_LEFT_REM -
        TIME_LABEL_WIDTH_REM -
        CHART_SCROLL_END_PADDING_REM) /
        SCHEDULE_CHART_HOUR_WIDTH_REM
    )
  );
  const positionedEvents = useMemo(() => getPositionedEvents(events), [events]);
  const timelineEndHour = useMemo(
    () => getTimelineEndHour(events, viewportHourRange),
    [events, viewportHourRange]
  );
  const timelineHours = useMemo(() => getTimelineHours(timelineEndHour), [timelineEndHour]);
  const chartHourRange = timelineEndHour - SCHEDULE_CHART_START_HOUR;
  const chartScrollContentWidthRem = Math.max(
    chartScrollViewportWidthRem,
    TIME_LABEL_LEFT_REM +
      chartHourRange * SCHEDULE_CHART_HOUR_WIDTH_REM +
      TIME_LABEL_WIDTH_REM +
      CHART_SCROLL_END_PADDING_REM
  );
  const chartGridWidthRem = chartScrollContentWidthRem - SCHEDULE_CHART_GRID_OFFSET_REM;
  const currentHourLeftRem = hourToChartRem(CURRENT_HOUR, true);

  useLayoutEffect(() => {
    const chartScrollElement = chartScrollRef.current;

    if (!chartScrollElement) {
      return;
    }

    chartScrollElement.scrollLeft =
      (SCHEDULE_CHART_INITIAL_HOUR - SCHEDULE_CHART_START_HOUR) *
      SCHEDULE_CHART_HOUR_WIDTH_REM *
      getRootFontSize();
  }, []);

  return (
    <section className="relative h-full min-w-0 flex-1 overflow-hidden rounded-xl bg-white shadow-[0_0_0.25rem_rgba(0,0,0,0.08)]">
      <div
        className="absolute"
        style={{
          left: `${BOARD_INNER_LEFT_REM}rem`,
          top: `${BOARD_INNER_TOP_REM}rem`,
          right: `${BOARD_INNER_RIGHT_REM}rem`,
          bottom: `${BOARD_INNER_BOTTOM_REM}rem`,
        }}
      >
        <div className="flex h-9 items-start justify-between">
          <h1
            className="font-['Pretendard'] text-[1.75rem] font-bold leading-[1.3]"
            style={{ ...textStyle, color: lightTheme.label.alternative }}
          >
            {SCHEDULE_MONTH_LABEL}
          </h1>

          <div className="mt-[0.625rem] flex h-[1.625rem] items-center gap-[0.3125rem]">
            <button
              type="button"
              aria-label="이전 주"
              className="flex size-[1.625rem] items-center justify-center rounded-[0.25rem]"
              style={{ backgroundColor: palette.main[90] }}
            >
              <img src={chevronLeftIcon} alt="" className="size-[1.0625rem]" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="flex h-[1.625rem] w-[2.9375rem] items-center justify-center rounded-[0.3125rem] font-['Pretendard'] text-[0.875rem] font-medium leading-[1.3]"
              style={{
                ...textStyle,
                backgroundColor: lightTheme.fill.normal,
                color: lightTheme.label.alternative,
              }}
            >
              오늘
            </button>
            <button
              type="button"
              aria-label="다음 주"
              className="flex size-[1.625rem] items-center justify-center rounded-[0.25rem]"
              style={{ backgroundColor: palette.main[90] }}
            >
              <img src={chevronRightIcon} alt="" className="size-[1.0625rem]" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="absolute overflow-hidden rounded-[0.75rem]"
          style={{
            left: 0,
            top: `${CHART_TOP_REM}rem`,
            right: 0,
            bottom: 0,
            backgroundColor: lightTheme.background.alternative,
          }}
        >
          <div
            aria-hidden="true"
            className="absolute z-10 rounded-[0.625rem]"
            style={{
              left: `${SCHEDULE_CHART_EVENT_LAYER_LEFT_REM}rem`,
              top: `${EVENT_LAYER_TOP_REM}rem`,
              right: `${CHART_SCROLL_VIEW_RIGHT_REM}rem`,
              height: `${SCHEDULE_CHART_EVENT_LAYER_HEIGHT_REM}rem`,
              backgroundColor: lightTheme.background.normal,
            }}
          />

          <div
            ref={chartScrollRef}
            className="scrollbar-thin absolute z-40 overflow-x-auto overflow-y-hidden"
            role="region"
            aria-label="주간 스케줄 시간표"
            style={{
              left: `${SCHEDULE_CHART_EVENT_LAYER_LEFT_REM}rem`,
              top: `${CHART_SCROLL_VIEW_TOP_REM}rem`,
              right: `${CHART_SCROLL_VIEW_RIGHT_REM}rem`,
              height: `${CHART_SCROLL_VIEW_HEIGHT_REM}rem`,
            }}
          >
            <div
              className="relative h-full"
              style={{ width: `${chartScrollContentWidthRem}rem` }}
            >
              <div
                className="absolute h-[2.0625rem] w-[44.9375rem]"
                style={{
                  left: `${TIME_LABEL_LEFT_REM}rem`,
                  top: 0,
                  width: `${chartScrollContentWidthRem - TIME_LABEL_LEFT_REM}rem`,
                }}
              >
                {timelineHours.map(hour => {
                  const active = hour === CURRENT_HOUR;
                  const label = formatTimelineHour(hour);

                  return (
                    <div
                      key={hour}
                      className="absolute top-0 flex h-[2.0625rem] w-[3.875rem] items-center justify-center rounded-[0.3125rem] font-['Pretendard'] text-[1rem] font-medium leading-[1.3]"
                      style={{
                        ...textStyle,
                        left: `${(hour - SCHEDULE_CHART_START_HOUR) * SCHEDULE_CHART_HOUR_WIDTH_REM}rem`,
                        backgroundColor: active ? palette.main[80] : lightTheme.background.normal,
                        color: active ? lightTheme.primary.normal : lightTheme.label.assistive,
                      }}
                    >
                      {label}
                    </div>
                  );
                })}
              </div>

              <div
                className="absolute"
                style={{
                  left: 0,
                  top: `${EVENT_LAYER_TOP_IN_SCROLL_REM}rem`,
                  width: `${chartScrollContentWidthRem}rem`,
                  height: `${SCHEDULE_CHART_EVENT_LAYER_HEIGHT_REM}rem`,
                }}
              >
                <div
                  className="pointer-events-none absolute top-0 z-10 h-full"
                  style={{
                    left: `${SCHEDULE_CHART_GRID_OFFSET_REM}rem`,
                    width: `${chartGridWidthRem}rem`,
                    backgroundImage: `linear-gradient(to right, ${palette.neutral[95]} 1px, transparent 1px)`,
                    backgroundSize: `${SCHEDULE_CHART_HOUR_WIDTH_REM}rem 100%`,
                  }}
                />

                <div
                  className="pointer-events-none absolute top-0 z-30 h-full w-[0.125rem]"
                  style={{
                    left: `${currentHourLeftRem}rem`,
                    backgroundColor: lightTheme.primary.normal,
                  }}
                />

                <div className="absolute inset-0 z-40">
                  {positionedEvents.map(({ event, lane }) => {
                    const leftRem = hourToChartRem(event.startHour);
                    const topRem =
                      event.dayIndex * SCHEDULE_CHART_ROW_HEIGHT_REM +
                      EVENT_TOP_OFFSET_REM +
                      lane * SCHEDULE_EVENT_LANE_STEP_REM;

                    return (
                      <ScheduleEventCard
                        key={event.id}
                        event={event}
                        leftRem={leftRem}
                        topRem={topRem}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div
            className="pointer-events-none absolute z-[60]"
            style={{
              left: `${WEEK_LABEL_LEFT_REM}rem`,
              top: `${WEEK_LABEL_TOP_REM}rem`,
            }}
          >
            {SCHEDULE_WEEK_LABELS.map((label, index) => (
              <div
                key={`${label.date}-${label.day}`}
                className="absolute flex h-[1.4375rem] w-[4.25rem] items-start font-['Pretendard'] leading-[1.3]"
                style={{
                  top: `${index * WEEK_LABEL_STEP_REM}rem`,
                  color: lightTheme.label.alternative,
                  letterSpacing: 0,
                }}
              >
                <span className="w-[1.5rem] text-[1.125rem] font-semibold">{label.date}</span>
                <span
                  className="text-[1rem] font-medium"
                  style={{ color: lightTheme.label.assistive, letterSpacing: 0 }}
                >
                  {label.day}
                </span>
              </div>
            ))}
          </div>

          <div
            className="pointer-events-none absolute z-30"
            style={{
              left: `${HORIZONTAL_LINE_LEFT_REM}rem`,
              top: `${HORIZONTAL_LINE_TOP_REM}rem`,
              right: `${HORIZONTAL_LINE_RIGHT_REM}rem`,
              height: `${HORIZONTAL_LINE_HEIGHT_REM}rem`,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(to bottom, ${palette.main[80]} 1px, transparent 1px)`,
                backgroundSize: `100% ${SCHEDULE_CHART_ROW_HEIGHT_REM}rem`,
              }}
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="스케줄 추가"
        className="absolute bottom-[1.3125rem] right-[1.375rem] z-[80] flex size-[2.40625rem] items-center justify-center rounded-full transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#41BE8E]/35"
        style={{ backgroundColor: lightTheme.primary.normal }}
        onClick={onOpenModal}
      >
        <img src={plusIcon} alt="" className="size-[2.03125rem]" aria-hidden="true" />
      </button>
    </section>
  );
};

export { ScheduleBoard };
