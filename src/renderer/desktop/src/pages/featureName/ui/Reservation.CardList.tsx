import { lightTheme } from "@design-tokens";

import dateIcon from "@/pages/featureName/assets/date.svg";
import customerImage from "@/pages/featureName/assets/reservation-customer.png";
import timeIcon from "@/pages/featureName/assets/time.svg";
import type { ReservationCardListProps } from "@/pages/featureName/model/Reservation.types";

const ReservationCardList = ({ reservations }: ReservationCardListProps) => {
  return (
    <div className="flex h-[11.4375rem] w-full flex-col gap-[0.9375rem]">
      {reservations.map(reservation => (
        <article
          key={reservation.id}
          className="h-[5.25rem] w-full shrink-0 overflow-hidden rounded-xl bg-[#F7F7F7] shadow-[0_0_0.375rem_rgba(0,0,0,0.02)]"
        >
          <div className="mx-auto flex w-[27.6875rem] items-center gap-8 pt-4">
            <div className="relative size-[3.25rem] shrink-0 overflow-hidden rounded-full bg-white">
              <img
                src={customerImage}
                alt=""
                className="absolute left-1/2 top-1/2 h-[2.128125rem] w-[2.239375rem] -translate-x-1/2 -translate-y-1/2 object-cover"
                aria-hidden="true"
              />
            </div>

            <div className="flex w-[22.4375rem] flex-col gap-px">
              <div className="flex w-full items-center justify-between">
                <div
                  className="flex w-[4.125rem] items-center gap-1 font-['Pretendard'] text-lg leading-[1.3] tracking-[-0.0225rem]"
                  style={{ color: lightTheme.label.neutral }}
                >
                  <span className="font-bold whitespace-nowrap">{reservation.name}</span>
                  <span className="w-[1.125rem] font-semibold">님</span>
                </div>

                <div className="flex items-center gap-[0.3125rem]">
                  {reservation.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded-[0.3125rem] bg-[#E6E6E7] px-2 py-1 font-['Pretendard'] text-xs font-medium leading-[1.3] tracking-[-0.015rem]"
                      style={{ color: lightTheme.label.alternative }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex h-[1.3125rem] items-center gap-[0.625rem]">
                <span className="flex items-center gap-[0.1875rem]">
                  <img src={dateIcon} alt="" className="size-[0.9375rem]" aria-hidden="true" />
                  <span
                    className="font-['Pretendard'] text-sm font-normal leading-[1.3] tracking-[-0.0175rem]"
                    style={{ color: lightTheme.label.alternative }}
                  >
                    {reservation.date}
                  </span>
                </span>
                <span
                  className="font-['Pretendard'] text-base font-medium leading-[1.3] tracking-[-0.02rem]"
                  style={{ color: lightTheme.label.assistive }}
                >
                  ·
                </span>
                <span className="flex items-center gap-[0.1875rem]">
                  <img src={timeIcon} alt="" className="size-[0.9375rem]" aria-hidden="true" />
                  <span
                    className="font-['Pretendard'] text-sm font-normal leading-[1.3] tracking-[-0.0175rem]"
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
