import { lightTheme } from "@design-tokens";

import type { CalendarViewProps } from "../model/types";
import { getClassName } from "./className";
import { CalendarMonthSelector } from "./CalendarMonthSelector";

const DesktopCalendar = ({
  calendarRows,
  className,
  displayedMonthDate,
  selectedDate,
  weekDays,
  onChangeMonth,
  onSelectDate,
}: CalendarViewProps) => (
  <div className={getClassName("w-[24rem]", className)}>
    <CalendarMonthSelector
      buttonClassName="ml-[0.6875rem] flex h-[1.9375rem] w-fit items-center gap-[0.4375rem]"
      buttonColor={lightTheme.label.alternative}
      displayedMonthDate={displayedMonthDate}
      iconClassName="size-[1.9375rem]"
      labelClassName="font-['Pretendard'] text-[1.5rem] font-bold leading-[1.3] tracking-normal"
      menuClassName="ml-[0.6875rem]"
      onChangeMonth={onChangeMonth}
    />

    <div className="mt-9 flex w-[23.75rem] flex-col gap-[1.125rem]">
      <div className="grid h-[1.4375rem] grid-cols-7 gap-x-[0.375rem] text-center font-['Pretendard'] text-[1.25rem] font-medium leading-[1.3] tracking-normal">
        {weekDays.map((day, index) => (
          <span
            key={day}
            className="w-[2.9375rem]"
            style={{
              color: index === 0 ? lightTheme.status.error : lightTheme.label.alternative,
            }}
          >
            {day}
          </span>
        ))}
      </div>

      {calendarRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid h-[1.875rem] grid-cols-7 items-center justify-items-center gap-x-[0.375rem] text-center font-['Pretendard'] text-[1.25rem] font-semibold leading-[1.3] tracking-normal"
        >
          {row.map(date => {
            const isSelected = date.date === selectedDate;

            return (
              <button
                key={date.date}
                type="button"
                aria-label={date.date}
                className="flex size-[2.625rem] items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#41BE8E]/35"
                style={{
                  backgroundColor: isSelected ? lightTheme.primary.normal : "transparent",
                  color: isSelected
                    ? lightTheme.label.buttonText
                    : date.muted
                      ? lightTheme.line.normal
                      : lightTheme.label.alternative,
                }}
                onClick={() => onSelectDate?.(date.date)}
              >
                {date.day}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  </div>
);

export { DesktopCalendar };
