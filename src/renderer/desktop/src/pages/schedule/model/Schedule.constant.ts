import { palette } from "@design-tokens";

import type {
  ScheduleCalendarDate,
  ScheduleColorKey,
  ScheduleDesigner,
  ScheduleEvent,
  ScheduleSummaryItem,
} from "./Schedule.types";

export const SCHEDULE_CONTENT_WIDTH_REM = 85.0625;
export const SCHEDULE_CONTENT_HEIGHT_REM = 51.875;
export const SCHEDULE_PAGE_PADDING_REM = 2.5;
export const SCHEDULE_LEFT_PANEL_WIDTH_REM = 26.4375;
export const SCHEDULE_RIGHT_PANEL_WIDTH_REM = 57.625;
export const SCHEDULE_PANEL_GAP_REM = 1;
export const MIN_SCHEDULE_SCALE = 0.32;
export const SCHEDULE_CHART_START_HOUR = 0;
export const SCHEDULE_CHART_END_HOUR = 24;
export const SCHEDULE_CHART_INITIAL_HOUR = 9;
export const SCHEDULE_CHART_HOUR_RANGE = SCHEDULE_CHART_END_HOUR - SCHEDULE_CHART_START_HOUR;
export const SCHEDULE_CHART_ROW_HEIGHT_REM = 7.625;
export const SCHEDULE_CHART_EVENT_LAYER_LEFT_REM = 6.3125;
export const SCHEDULE_CHART_EVENT_LAYER_TOP_REM = 9;
export const SCHEDULE_CHART_EVENT_LAYER_WIDTH_REM = 47.25;
export const SCHEDULE_CHART_EVENT_LAYER_HEIGHT_REM = 39.1875;
export const SCHEDULE_CHART_GRID_OFFSET_REM = 3.25;
export const SCHEDULE_CHART_HOUR_WIDTH_REM = 4.5625;
export const SCHEDULE_EVENT_HEIGHT_REM = 2.0625;
export const SCHEDULE_EVENT_WIDTH_REM = 15.3125;
export const SCHEDULE_EVENT_LANE_STEP_REM = 2.25;

export const SCHEDULE_MONTH_LABEL = "2026. 5";
export const DEFAULT_SCHEDULE_DATE = "2026-05-04";
export const EMPTY_SCHEDULE_DATE = "2026-05-05";

export const SCHEDULE_WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];
export const SCHEDULE_TIME_LABELS = Array.from(
  { length: SCHEDULE_CHART_END_HOUR - SCHEDULE_CHART_START_HOUR + 1 },
  (_, index) => `${SCHEDULE_CHART_START_HOUR + index}:00`
);

export const SCHEDULE_WEEK_LABELS = [
  { date: "16", day: "월" },
  { date: "17", day: "화" },
  { date: "18", day: "수" },
  { date: "19", day: "목" },
  { date: "20", day: "금" },
  { date: "21", day: "토" },
  { date: "22", day: "일" },
];

export const SCHEDULE_CALENDAR_ROWS: ScheduleCalendarDate[][] = [
  [
    { date: "2026-04-28", day: "28", muted: true },
    { date: "2026-04-29", day: "29", muted: true },
    { date: "2026-04-30", day: "30", muted: true },
    { date: "2026-04-31", day: "31", muted: true },
    { date: "2026-05-01", day: "1" },
    { date: "2026-05-02", day: "2" },
    { date: "2026-05-03", day: "3" },
  ],
  [
    { date: DEFAULT_SCHEDULE_DATE, day: "4" },
    { date: EMPTY_SCHEDULE_DATE, day: "5" },
    { date: "2026-05-06", day: "6" },
    { date: "2026-05-07", day: "7" },
    { date: "2026-05-08", day: "8" },
    { date: "2026-05-09", day: "9" },
    { date: "2026-05-10", day: "10" },
  ],
  [
    { date: "2026-05-11", day: "11" },
    { date: "2026-05-12", day: "12" },
    { date: "2026-05-13", day: "13" },
    { date: "2026-05-14", day: "14" },
    { date: "2026-05-15", day: "15" },
    { date: "2026-05-16", day: "16" },
    { date: "2026-05-17", day: "17" },
  ],
  [
    { date: "2026-05-18", day: "18" },
    { date: "2026-05-19", day: "19" },
    { date: "2026-05-20", day: "20" },
    { date: "2026-05-21", day: "21" },
    { date: "2026-05-22", day: "22" },
    { date: "2026-05-23", day: "23" },
    { date: "2026-05-24", day: "24" },
  ],
  [
    { date: "2026-05-25", day: "25" },
    { date: "2026-05-26", day: "26" },
    { date: "2026-05-27", day: "27" },
    { date: "2026-05-28", day: "28" },
    { date: "2026-05-29", day: "29" },
    { date: "2026-05-30", day: "30" },
    { date: "2026-06-01", day: "1", muted: true },
  ],
];

export const SCHEDULE_DESIGNERS: ScheduleDesigner[] = [
  { id: "oh-yong-jun", name: "오용준" },
  { id: "kim-heddy", name: "김헤디" },
  { id: "lee-designer", name: "이디자이너" },
];

export const SCHEDULE_SUMMARY_ITEMS: ScheduleSummaryItem[] = [
  {
    id: 1,
    customerName: "오용준",
    designerName: "오용준",
    date: "10/10",
    time: "10:00",
    tags: ["# 남자", "# 다운펌"],
  },
  {
    id: 2,
    customerName: "오용준",
    designerName: "오용준",
    date: "10/10",
    time: "10:00",
    tags: ["# 남자", "# 다운펌"],
  },
  {
    id: 3,
    customerName: "오용준",
    designerName: "오용준",
    date: "10/10",
    time: "10:00",
    tags: ["# 남자", "# 다운펌"],
  },
];

export const SCHEDULE_SUMMARY_BY_DATE: Record<string, ScheduleSummaryItem[]> = {
  [DEFAULT_SCHEDULE_DATE]: SCHEDULE_SUMMARY_ITEMS,
};

const FIGMA_EVENT_LAYER_GRID_OFFSET_PX = 52;
const FIGMA_HOUR_WIDTH_PX = 73;
const FIGMA_EVENT_WIDTH_PX = 245;
const FIGMA_EVENT_DURATION_HOURS = FIGMA_EVENT_WIDTH_PX / FIGMA_HOUR_WIDTH_PX;
const FIGMA_VISIBLE_START_HOUR = 9;

const getFigmaStartHour = (xPx: number) =>
  FIGMA_VISIBLE_START_HOUR + (xPx - FIGMA_EVENT_LAYER_GRID_OFFSET_PX) / FIGMA_HOUR_WIDTH_PX;

const createScheduleEvent = (
  id: number,
  color: ScheduleColorKey,
  dayIndex: number,
  xPx: number
): ScheduleEvent => {
  const startHour = getFigmaStartHour(xPx);

  return {
    id,
    customerName: "오용준",
    designerName: "디자이너",
    tags: ["# 남자", "# 다운펌"],
    color,
    dayIndex,
    startHour,
    endHour: startHour + FIGMA_EVENT_DURATION_HOURS,
  };
};

const createScheduleEventAtHour = (
  id: number,
  color: ScheduleColorKey,
  dayIndex: number,
  startHour: number
): ScheduleEvent => ({
  id,
  customerName: "오용준",
  designerName: "디자이너",
  tags: ["# 남자", "# 다운펌"],
  color,
  dayIndex,
  startHour,
  endHour: startHour + FIGMA_EVENT_DURATION_HOURS,
});

export const SCHEDULE_EVENTS: ScheduleEvent[] = [
  createScheduleEvent(1, "red", 0, -15),
  createScheduleEvent(2, "green", 0, 239),
  createScheduleEvent(3, "blue", 0, 493),
  createScheduleEvent(4, "yellow", 0, -90),
  createScheduleEvent(5, "green", 0, 99),
  createScheduleEvent(6, "green", 1, 24),
  createScheduleEvent(7, "blue", 1, 52),
  createScheduleEvent(8, "yellow", 1, 327),
  createScheduleEvent(9, "red", 1, 479),
  createScheduleEvent(10, "yellow", 2, 33),
  createScheduleEvent(11, "blue", 2, 217),
  createScheduleEvent(12, "red", 2, 552),
  createScheduleEvent(13, "green", 3, 3),
  createScheduleEvent(14, "blue", 3, 74),
  createScheduleEvent(15, "yellow", 3, 328),
  createScheduleEvent(16, "yellow", 4, 31),
  createScheduleEvent(17, "red", 4, 368),
  createScheduleEvent(18, "green", 4, 506),
  createScheduleEventAtHour(19, "blue", 0, 19.25),
  createScheduleEventAtHour(20, "yellow", 1, 20.5),
  createScheduleEventAtHour(21, "green", 2, 21.25),
  createScheduleEventAtHour(22, "red", 3, 22),
  createScheduleEventAtHour(23, "blue", 4, 22.75),
];

export const SCHEDULE_COLOR_STYLES: Record<
  ScheduleColorKey,
  {
    background: string;
    accent: string;
  }
> = {
  blue: {
    background: palette.blue[90],
    accent: palette.blue[50],
  },
  green: {
    background: palette.main[90],
    accent: palette.main[50],
  },
  red: {
    background: palette.red[90],
    accent: palette.red[70],
  },
  yellow: {
    background: palette.yellow[90],
    accent: palette.yellow[50],
  },
};

export const SCHEDULE_COLOR_OPTIONS: ScheduleColorKey[] = ["blue", "red", "yellow", "green"];
