import type { CalendarDate } from "./types";

const padDatePart = (value: number) => String(value).padStart(2, "0");

export const toDateKey = (date: Date) =>
  `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}-${padDatePart(date.getDate())}`;

export const getTodayDateKey = () => toDateKey(new Date());

export const parseDateKey = (dateKey: string) => {
  const [year = "0", month = "1", day = "1"] = dateKey.split("-");

  return new Date(Number(year), Number(month) - 1, Number(day));
};

export const addDaysToDateKey = (dateKey: string, amount: number) => {
  const date = parseDateKey(dateKey);
  date.setDate(date.getDate() + amount);

  return toDateKey(date);
};

export const getMonthStartKey = (dateKey: string) => {
  const date = parseDateKey(dateKey);

  return toDateKey(new Date(date.getFullYear(), date.getMonth(), 1));
};

export const addMonthsToMonthKey = (monthDate: string, amount: number) => {
  const date = parseDateKey(monthDate);

  return toDateKey(new Date(date.getFullYear(), date.getMonth() + amount, 1));
};

export const formatMonthLabel = (monthDate: string) => {
  const date = parseDateKey(monthDate);

  return `${date.getFullYear()}. ${date.getMonth() + 1}`;
};

export const isSameMonthKey = (dateKey: string, monthDate: string) => {
  const date = parseDateKey(dateKey);
  const month = parseDateKey(monthDate);

  return date.getFullYear() === month.getFullYear() && date.getMonth() === month.getMonth();
};

export const createCalendarRows = (
  monthDate: string,
  markerMap: Record<string, number> = {}
): CalendarDate[][] => {
  const month = parseDateKey(monthDate);
  const firstDate = new Date(month.getFullYear(), month.getMonth(), 1);
  const startDate = new Date(firstDate);
  startDate.setDate(firstDate.getDate() - firstDate.getDay());

  const rows: CalendarDate[][] = [];

  for (let weekIndex = 0; weekIndex < 6; weekIndex += 1) {
    const row: CalendarDate[] = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + weekIndex * 7 + dayIndex);

      const dateKey = toDateKey(date);
      row.push({
        date: dateKey,
        day: String(date.getDate()),
        markerCount: markerMap[dateKey],
        muted: !isSameMonthKey(dateKey, monthDate),
      });
    }

    rows.push(row);
  }

  const lastRow = rows[rows.length - 1];
  if (lastRow?.every(date => date.muted)) {
    rows.pop();
  }

  return rows;
};
