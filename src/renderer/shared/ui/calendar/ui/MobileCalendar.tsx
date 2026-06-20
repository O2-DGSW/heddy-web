import { useMemo } from "react";
import { lightTheme, palette } from "@design-tokens";

import type { CalendarViewProps } from "../model/types";
import { getClassName } from "./className";
import { CalendarMonthSelector } from "./CalendarMonthSelector";
import { CalendarViewModeTabs } from "./CalendarViewModeTabs";
import { ScheduleMarkers } from "./ScheduleMarkers";

const MobileCalendar = ({
  calendarRows,
  className,
  displayedMonthDate,
  selectedDate,
  viewMode = "month",
  weekDays,
  onChangeMonth,
  onChangeViewMode,
  onSelectDate,
  tabs,
}: CalendarViewProps) => {
  const displayedRows = useMemo(() => {
    if (viewMode === "week") {
      const weekRow = calendarRows.find(row => row.some(date => date.date === selectedDate));
      return weekRow ? [weekRow] : [calendarRows[0]];
    }
    return calendarRows;
  }, [calendarRows, viewMode, selectedDate]);

  return (
    <div className={getClassName("w-full overflow-visible bg-white", className)}>
      <div className={"flex flex-col gap-[2rem]"}>
        {tabs ? <CalendarViewModeTabs value={viewMode} onChange={onChangeViewMode} /> : null}

        <div className="mx-auto flex w-[338px] flex-col gap-[23px]">
          <CalendarMonthSelector
            buttonClassName="flex h-[26px] w-fit items-start gap-[7px]"
            displayedMonthDate={displayedMonthDate}
            iconClassName="mt-[1px] size-6"
            labelClassName="font-['Pretendard'] text-[20px] font-bold leading-[1.3] tracking-[-0.4px]"
            onChangeMonth={onChangeMonth}
          />

          <div className="flex w-full flex-col items-center gap-2">
            <div className="flex w-full items-center gap-[35px] text-center font-['Pretendard'] text-[14px] font-medium leading-[1.3] tracking-[-0.28px]">
              {weekDays.map((day, index) => (
                <span
                  key={day}
                  className="w-[18px]"
                  style={{
                    color: index === 0 ? lightTheme.status.error : lightTheme.label.alternative,
                  }}
                >
                  {day}
                </span>
              ))}
            </div>

            {displayedRows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex w-full items-center gap-[35px] text-center font-['Pretendard'] text-[14px] font-semibold leading-[1.3] tracking-[-0.28px]"
              >
                {row.map((date, dateIndex) => {
                  const isSelected = date.date === selectedDate;
                  const isMutedSunday = date.muted && dateIndex === 0;

                  return (
                    <button
                      key={date.date}
                      type="button"
                      aria-label={date.date}
                      className="flex h-[36px] w-[18px] flex-col items-center outline-none"
                      onClick={() => onSelectDate?.(date.date)}
                    >
                      <span
                        className={getClassName(
                          "flex items-center justify-center",
                          isSelected ? "size-[26px] rounded-full" : "size-[18px]"
                        )}
                        style={{
                          backgroundColor: isSelected ? lightTheme.primary.normal : "transparent",
                          color: isSelected
                            ? lightTheme.label.buttonText
                            : isMutedSunday
                              ? palette.red[90]
                              : date.muted
                                ? lightTheme.line.normal
                                : lightTheme.label.alternative,
                        }}
                      >
                        {date.day}
                      </span>
                      <ScheduleMarkers count={date.markerCount} />
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { MobileCalendar };
