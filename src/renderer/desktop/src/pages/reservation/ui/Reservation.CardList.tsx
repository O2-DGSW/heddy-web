import { lightTheme } from "@design-tokens";

import dateIcon from "@/pages/reservation/assets/date.svg";
import customerImage from "@/pages/reservation/assets/reservation-customer.png";
import timeIcon from "@/pages/reservation/assets/time.svg";
import type { ReservationCardListProps } from "@/pages/reservation/model/Reservation.types";

const ReservationCardList = ({ reservations }: ReservationCardListProps) => {
  return (
    <div className="flex h-[11.5rem] w-full flex-col gap-[1rem]">
      {reservations.map(reservation => (
        <article
          key={reservation.id}
          className="h-[5.25rem] w-full shrink-0 overflow-hidden rounded-xl bg-[#F7F7F7] shadow-[0_0_0.375rem_rgba(0,0,0,0.02)]"
        >
          <div className="flex w-full items-center gap-[2rem] px-[1.75rem] pt-[1rem]">
            <div className="relative size-[3.25rem] shrink-0 overflow-hidden rounded-full bg-white">
              <img
                src={customerImage}
                alt=""
                className="absolute left-1/2 top-1/2 h-[2.125rem] w-[2.25rem] -translate-x-1/2 -translate-y-1/2 object-cover"
                aria-hidden="true"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-[0.125rem]">
              <div className="flex w-full items-center justify-between">
                <div
                  className="flex w-[4.125rem] items-center gap-[0.25rem] font-['Pretendard'] text-lg leading-[1.3]"
                  style={{ color: lightTheme.label.neutral }}
                >
                  <span className="font-bold whitespace-nowrap">{reservation.name}</span>
                  <span className="w-[1.125rem] font-semibold">님</span>
                </div>

                <div className="flex min-w-0 items-center gap-[0.25rem]">
                  {reservation.tags.map(tag => (
                    <span
                      key={tag}
                      className="shrink-0 rounded-[0.25rem] bg-[#E6E6E7] px-[0.5rem] py-[0.25rem] font-['Pretendard'] text-xs font-medium leading-[1.3]"
                      style={{ color: lightTheme.label.alternative }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex h-[1.25rem] items-center gap-[0.625rem]">
                <span className="flex items-center gap-[0.25rem]">
                  <img src={dateIcon} alt="" className="size-[1rem]" aria-hidden="true" />
                  <span
                    className="font-['Pretendard'] text-sm font-normal leading-[1.3]"
                    style={{ color: lightTheme.label.alternative }}
                  >
                    {reservation.date}
                  </span>
                </span>
                <span
                  className="font-['Pretendard'] text-base font-medium leading-[1.3]"
                  style={{ color: lightTheme.label.assistive }}
                >
                  ·
                </span>
                <span className="flex items-center gap-[0.25rem]">
                  <img src={timeIcon} alt="" className="size-[1rem]" aria-hidden="true" />
                  <span
                    className="font-['Pretendard'] text-sm font-normal leading-[1.3]"
                    style={{ color: lightTheme.label.alternative }}
                  >
                    {reservation.time}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export { ReservationCardList };
