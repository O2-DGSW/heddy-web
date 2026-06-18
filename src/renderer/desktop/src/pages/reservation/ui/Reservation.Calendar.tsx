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
    <div className="relative w-121">
      <button
        type="button"
        className="flex h-7.75 items-start gap-1.75"
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
          className="size-7.75"
          style={{ color: lightTheme.line.normal }}
        />
      </button>

      {isMonthMenuOpen && (
        <div
          className="absolute left-0 top-[2.5rem] z-20 flex w-[7.5rem] flex-col overflow-hidden rounded-[0.75rem] border bg-white py-[0.25rem] shadow-[0_0_0.5rem_rgba(0,0,0,0.08)]"
          style={{ borderColor: lightTheme.line.alternative }}
        >
          {monthOptions.map(option => (
            <button
              key={option.key}
              type="button"
              className="flex h-[2rem] w-full items-center justify-center whitespace-nowrap font-['Pretendard'] text-[0.9375rem] font-medium leading-[1.3] transition-colors hover:bg-[#F7F7F7]"
              style={{
                color: option.active
                  ? lightTheme.primary.normal
                  : lightTheme.label.alternative,
              }}
              onClick={() => onSelectMonth(option.key)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      <div className="mt-9 flex w-full flex-col gap-6.5">
        <div className="flex h-5.75 items-start justify-center gap-5.5 text-center font-['Pretendard'] text-xl font-medium leading-[1.3]">
          {weekDays.map((day, index) => (
            <span
              key={day}
              className="w-11.75"
              style={{
                color: index === 0 ? lightTheme.status.error : lightTheme.label.alternative,
              }}
            >
              {day}
            </span>
          ))}
        </div>

        {calendarRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex h-7.5 items-center justify-center gap-5.5 text-center font-['Pretendard'] text-2xl font-semibold leading-[1.3]">
            {row.map(date => (
              <button
                key={date.dateKey}
                type="button"
                className="flex size-11.75 items-center justify-center rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#41BE8E]/35"
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
