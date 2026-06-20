import { palette } from "@design-tokens";

import type { ScheduleColorKey, ScheduleDesigner } from "./Schedule.types";

export const SCHEDULE_CONTENT_WIDTH_REM = 85.0625;
export const SCHEDULE_CONTENT_HEIGHT_REM = 51.875;
export const SCHEDULE_CONTENT_TOP_OFFSET_REM = 2.625;
export const SCHEDULE_CONTENT_BOTTOM_OFFSET_REM = 2.5625;
export const SCHEDULE_PAGE_LEFT_PADDING_REM = 2.5625;
export const SCHEDULE_PAGE_RIGHT_PADDING_REM = 2.5;
export const SCHEDULE_LEFT_PANEL_WIDTH_REM = 26.4375;
export const SCHEDULE_RIGHT_PANEL_WIDTH_REM = 57.625;
export const SCHEDULE_PANEL_GAP_REM = 1;
export const MIN_SCHEDULE_SCALE = 0.7;
export const SCHEDULE_CHART_START_HOUR = 0;
export const SCHEDULE_CHART_END_HOUR = 24;
export const SCHEDULE_CHART_HOUR_RANGE = SCHEDULE_CHART_END_HOUR - SCHEDULE_CHART_START_HOUR;
export const SCHEDULE_TIME_STEP_MINUTES = 10;
export const SCHEDULE_CHART_TIME_SLOT_MINUTES = 10;
export const SCHEDULE_CHART_TIME_SLOT_WIDTH_REM = 4.5625;
export const SCHEDULE_CHART_ROW_HEIGHT_REM = 7.625;
export const SCHEDULE_CHART_EVENT_LAYER_LEFT_REM = 6.3125;
export const SCHEDULE_CHART_EVENT_LAYER_TOP_REM = 9;
export const SCHEDULE_CHART_EVENT_LAYER_WIDTH_REM = 47.25;
export const SCHEDULE_CHART_EVENT_LAYER_HEIGHT_REM = 39.1875;
export const SCHEDULE_CHART_GRID_OFFSET_REM = 3.25;
export const SCHEDULE_EVENT_HEIGHT_REM = 2.0625;
export const SCHEDULE_EVENT_LANE_STEP_REM = 2.25;

export const SCHEDULE_BOARD_DAY_COUNT = 5;
export const SCHEDULE_WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];
export const SCHEDULE_TIME_LABELS = Array.from(
  { length: SCHEDULE_CHART_END_HOUR - SCHEDULE_CHART_START_HOUR + 1 },
  (_, index) => `${SCHEDULE_CHART_START_HOUR + index}:00`
);

export const SCHEDULE_DESIGNERS: ScheduleDesigner[] = [
  { id: "oh-yong-jun", name: "오용준" },
  { id: "kim-heddy", name: "김헤디" },
  { id: "lee-designer", name: "이디자이너" },
];

export const DEFAULT_SCHEDULE_DESIGNER_ID = SCHEDULE_DESIGNERS[0]?.id ?? "";

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
