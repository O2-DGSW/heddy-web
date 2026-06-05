import { lightTheme } from "@design-tokens";

import dropdownIcon from "@/pages/reservation/assets/dropdown.svg";
import { DROPDOWN_FILTER } from "@/pages/reservation/model/Reservation.constant";
import type { ReservationCalendarProps } from "@/pages/reservation/model/Reservation.types";

const ReservationCalendar = ({ weekDays, calendarRows }: ReservationCalendarProps) => {
  return (
    <div className="w-full">
      <button type="button" className="flex h-8 items-start gap-2" aria-label="월 선택">
        <span
          className="font-['Pretendard'] text-2xl font-bold leading-[1.3]"
          style={{ color: lightTheme.label.alternative }}
        >
          2026. 5
        </span>
        <img
          src={dropdownIcon}
          alt=""
          className="size-8"
          style={{ filter: DROPDOWN_FILTER }}
          aria-hidden="true"
        />
      </button>

      <div className="mt-9 flex w-full flex-col gap-6.5">
        <div className="grid h-6 grid-cols-7 justify-items-center text-center font-['Pretendard'] text-xl font-medium leading-[1.3]">
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
            className="grid h-7.5 grid-cols-7 items-center justify-items-center text-center font-['Pretendard'] text-2xl font-semibold leading-[1.3]"
          >
            {row.map(date =>
              date.selected ? (
                <span
                  key={date.day}
                  className="flex size-12 items-center justify-center rounded-full text-[#F5F5F5]"
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
