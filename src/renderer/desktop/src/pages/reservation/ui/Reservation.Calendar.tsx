import { lightTheme } from "@design-tokens";

import DropdownIcon from "@/pages/reservation/assets/dropdown.svg?react";
import type { ReservationCalendarProps } from "@/pages/reservation/model/Reservation.types";

const ReservationCalendar = ({
  monthLabel,
  monthOptions,
  isMonthMenuOpen,
  weekDays,
  calendarRows,
  onToggleMonthMenu,
  onSelectMonth,
  onSelectDate,
}: ReservationCalendarProps) => {
  return (
    <div className="relative w-[30.25rem]">
      <button
        type="button"
        className="flex h-[1.9375rem] items-start gap-[0.4375rem]"
        aria-label="월 선택"
        onClick={onToggleMonthMenu}
      >
        <span
          className="font-['Pretendard'] text-2xl font-bold leading-[1.3]"
          style={{ color: lightTheme.label.alternative }}
        >
          {monthLabel}
        </span>
        <DropdownIcon
          aria-hidden="true"
          className="size-[1.9375rem]"
          style={{ color: lightTheme.line.normal }}
        />
      </button>

      {isMonthMenuOpen && (
        <div
          className="absolute left-0 top-[2.5rem] z-10 w-[8rem] rounded-[1rem] border bg-white p-[0.375rem] shadow-[0_0_0.5rem_rgba(0,0,0,0.08)]"
          style={{ borderColor: lightTheme.line.alternative }}
        >
          {monthOptions.map(option => (
            <button
              key={option.key}
              type="button"
              className="flex h-[2rem] w-full items-center justify-center rounded-[0.75rem] font-['Pretendard'] text-[0.9375rem] font-medium leading-[1.3]"
              style={{
                backgroundColor: option.active ? lightTheme.primary.normal : "transparent",
                color: option.active
                  ? lightTheme.label.buttonText
                  : lightTheme.label.alternative,
              }}
              onClick={() => onSelectMonth(option.key)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      <div className="mt-9 flex w-full flex-col gap-[1.625rem]">
        <div className="flex h-[1.4375rem] items-start justify-center gap-[1.375rem] text-center font-['Pretendard'] text-xl font-medium leading-[1.3]">
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
          <div key={rowIndex} className="flex h-[1.875rem] items-center justify-center gap-[1.375rem] text-center font-['Pretendard'] text-2xl font-semibold leading-[1.3]">
            {row.map(date => (
              <button
                key={date.dateKey}
                type="button"
                className="flex size-[2.9375rem] items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#41BE8E]/35"
                style={{
                  backgroundColor: date.selected ? lightTheme.primary.normal : "transparent",
                  color: date.selected
                    ? lightTheme.label.buttonText
                    : date.muted
                      ? lightTheme.line.normal
                      : lightTheme.label.alternative,
                }}
                onClick={() => onSelectDate(date.dateKey)}
              >
                {date.day}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export { ReservationCalendar };
