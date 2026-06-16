import { lightTheme } from "@design-tokens";

import dropdownDownIcon from "@/pages/schedule/assets/svg/dropdown-down.svg";
import {
  SCHEDULE_CALENDAR_ROWS,
  SCHEDULE_MONTH_LABEL,
  SCHEDULE_WEEK_DAYS,
} from "@/pages/schedule/model/Schedule.constant";

interface ScheduleCalendarProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const DROPDOWN_NEUTRAL_FILTER =
  "brightness(0) saturate(100%) invert(35%) sepia(4%) saturate(285%) hue-rotate(169deg) brightness(96%) contrast(89%)";

const textStyle = {
  letterSpacing: 0,
};

const ScheduleCalendar = ({ selectedDate, onSelectDate }: ScheduleCalendarProps) => {
  return (
    <div className="w-[24rem]">
      <button type="button" className="ml-[0.6875rem] flex h-[1.9375rem] items-center gap-[0.4375rem]">
        <span
          className="font-['Pretendard'] text-[1.5rem] font-bold leading-[1.3]"
          style={{ ...textStyle, color: lightTheme.label.alternative }}
        >
          {SCHEDULE_MONTH_LABEL}
        </span>
        <img
          src={dropdownDownIcon}
          alt=""
          className="size-[1.9375rem]"
          style={{ filter: DROPDOWN_NEUTRAL_FILTER }}
          aria-hidden="true"
        />
      </button>

      <div className="mt-9 flex w-[23.75rem] flex-col gap-[1.125rem]">
        <div className="grid h-[1.4375rem] grid-cols-7 gap-x-[0.375rem] text-center font-['Pretendard'] text-[1.25rem] font-medium leading-[1.3]">
          {SCHEDULE_WEEK_DAYS.map((day, index) => (
            <span
              key={day}
              className="w-[2.9375rem]"
              style={{
                ...textStyle,
                color: index === 0 ? lightTheme.status.error : lightTheme.label.alternative,
              }}
            >
              {day}
            </span>
          ))}
        </div>

        {SCHEDULE_CALENDAR_ROWS.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid h-[1.875rem] grid-cols-7 items-center justify-items-center gap-x-[0.375rem] text-center font-['Pretendard'] text-[1.25rem] font-semibold leading-[1.3]"
          >
            {row.map(date => {
              const isSelected = date.date === selectedDate;

              return (
                <button
                  key={date.date}
                  type="button"
                  className="flex size-[2.625rem] items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#41BE8E]/35"
                  style={{
                    ...textStyle,
                    backgroundColor: isSelected ? lightTheme.primary.normal : "transparent",
                    color: isSelected
                      ? lightTheme.label.buttonText
                      : date.muted
                        ? lightTheme.line.normal
                        : lightTheme.label.alternative,
                  }}
                  onClick={() => onSelectDate(date.date)}
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
};

export { ScheduleCalendar };

