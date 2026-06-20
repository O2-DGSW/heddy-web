import { useMemo, useState } from "react";

import { DEFAULT_WEEK_DAYS } from "./model/constants.ts";
import {
  createCalendarRows,
  getMonthStartKey,
  isSameMonthKey,
  toDateKey,
} from "./model/date.ts";
import type { CalendarProps } from "./model/types.ts";
import { DesktopCalendar } from "./ui/DesktopCalendar.tsx";
import { MobileCalendar } from "./ui/MobileCalendar.tsx";

const Calendar = ({
  initialMonthDate,
  markerMap,
  monthDate,
  onMonthChange,
  onSelectDate,
  selectedDate,
  variant = "desktop",
  weekDays = DEFAULT_WEEK_DAYS,
  ...props
}: CalendarProps) => {
  const [internalMonthDate, setInternalMonthDate] = useState(() =>
    getMonthStartKey(initialMonthDate ?? monthDate ?? selectedDate ?? toDateKey(new Date()))
  );
  const displayedMonthDate = monthDate ? getMonthStartKey(monthDate) : internalMonthDate;
  const calendarRows = useMemo(
    () => createCalendarRows(displayedMonthDate, markerMap),
    [displayedMonthDate, markerMap]
  );

  const changeMonth = (date: string) => {
    const nextMonthDate = getMonthStartKey(date);

    if (!monthDate) {
      setInternalMonthDate(nextMonthDate);
    }

    onMonthChange?.(nextMonthDate);
  };

  const selectDate = (date: string) => {
    if (!isSameMonthKey(date, displayedMonthDate)) {
      changeMonth(date);
    }

    onSelectDate?.(date);
  };

  const viewProps = {
    ...props,
    calendarRows,
    displayedMonthDate,
    selectedDate,
    weekDays,
    onChangeMonth: changeMonth,
    onSelectDate: selectDate,
  };

  if (variant === "mobile") {
    return <MobileCalendar {...viewProps} />;
  }

  return <DesktopCalendar {...viewProps} />;
};

export { Calendar };
