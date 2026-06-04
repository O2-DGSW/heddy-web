import { lightTheme } from "@design-tokens";

import dropdownIcon from "@/pages/featureName/assets/dropdown.svg";
import { DROPDOWN_FILTER } from "@/pages/featureName/model/Reservation.constant";
import type { ReservationCalendarProps } from "@/pages/featureName/model/Reservation.types";

const ReservationCalendar = ({ weekDays, calendarRows }: ReservationCalendarProps) => {
  return (
    <div className="w-[30.25rem]">
      <button
        type="button"
        className="flex h-[1.9375rem] items-start gap-[0.4375rem]"
        aria-label="월 선택"
      >
        <span
          className="font-['Pretendard'] text-2xl font-bold leading-[1.3] tracking-[-0.03rem]"
          style={{ color: lightTheme.label.alternative }}
        >
          2026. 5
        </span>
        <img
          src={dropdownIcon}
          alt=""
          className="size-[1.9375rem]"
          style={{ filter: DROPDOWN_FILTER }}
          aria-hidden="true"
        />
      </button>

      <div className="mt-9 flex w-full flex-col gap-[1.625rem]">
        <div className="grid h-[1.4375rem] grid-cols-[repeat(7,2.9375rem)] justify-center gap-x-[1.375rem] text-center font-['Pretendard'] text-xl font-medium leading-[1.3] tracking-[-0.025rem]">
          {weekDays.map((day, index) => (
            <span
              key={day}
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
            className="grid h-[1.875rem] grid-cols-[repeat(7,2.9375rem)] items-center justify-center gap-x-[1.375rem] text-center font-['Pretendard'] text-2xl font-semibold leading-[1.3] tracking-[-0.03rem]"
          >
            {row.map(date =>
              date.selected ? (
                <span
                  key={date.day}
                  className="flex size-[2.9375rem] items-center justify-center rounded-full text-[#F5F5F5]"
                  style={{ backgroundColor: lightTheme.primary.normal }}
                >
                  {date.day}
                </span>
              ) : (
                <span
                  key={date.day}
                  style={{
                    color: date.muted ? lightTheme.line.normal : lightTheme.label.alternative,
                  }}
                >
                  {date.day}
                </span>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export { ReservationCalendar };
