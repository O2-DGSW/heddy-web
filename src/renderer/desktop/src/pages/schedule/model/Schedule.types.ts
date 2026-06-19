export type ScheduleColorKey = "blue" | "green" | "red" | "yellow";

export interface ScheduleCalendarDate {
  date: string;
  day: string;
  muted?: boolean;
}

export interface ScheduleSummaryItem {
  id: number;
  customerName: string;
  designerName: string;
  date: string;
  time: string;
  tags: string[];
}

export interface ScheduleEvent {
  id: number;
  customerName: string;
  designerName: string;
  designerId: string;
  tags: string[];
  color: ScheduleColorKey;
  date: string;
  dayIndex: number;
  startHour: number;
  endHour: number;
}

export interface ScheduleDesigner {
  id: string;
  name: string;
}

export interface ScheduleFormValues {
  id?: number;
  color: ScheduleColorKey;
  date: string;
  designerId: string;
  endTime: string;
  startTime: string;
}
