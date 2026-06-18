import { lightTheme } from "@design-tokens";

import dateIcon from "@/pages/reservation/assets/date.svg";
import customerImage from "@/pages/reservation/assets/reservation-customer.png";
import timeIcon from "@/pages/reservation/assets/time.svg";
import type { ReservationCardListProps } from "@/pages/reservation/model/Reservation.types";

const ReservationCardList = ({
  reservations,
}: ReservationCardListProps) => {
  return (
    <div className="flex h-full w-full flex-col gap-[0.9375rem]">
      {reservations.length === 0 ? (
        <div
          className="flex h-full items-center justify-center rounded-xl bg-[#F7F7F7] font-['Pretendard'] text-base font-medium leading-[1.3]"
          style={{ color: lightTheme.label.assistive }}
        >
          선택한 날짜에 예약이 없습니다
        </div>
      ) : (
        reservations.map(reservation => {
          return (
            <div
              key={reservation.id}
              className="h-21 w-full shrink-0 overflow-hidden rounded-xl text-left shadow-[0_0_0.375rem_rgba(0,0,0,0.02)]"
              style={{
                backgroundColor: "#F7F7F7",
                boxShadow: "0 0 0.375rem rgba(0,0,0,0.02)",
              }}
            >
              <div className="flex w-full items-center gap-8 px-7 pt-4">
                <div className="relative size-13 shrink-0 overflow-hidden rounded-full bg-white">
                  <img
                    src={customerImage}
                    alt=""
                    className="absolute left-1/2 top-1/2 h-[2.1281875rem] w-[2.23925rem] -translate-x-1/2 -translate-y-1/2 object-cover"
                    aria-hidden="true"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-[0.375rem]">
                  <div className="flex w-full items-center justify-between">
                    <div
                      className="flex w-[4.5rem] items-center gap-1 font-['Pretendard'] text-xl leading-[1.3]"
                      style={{ color: lightTheme.label.neutral }}
                    >
                      <span className="font-bold whitespace-nowrap">{reservation.customerName}</span>
                      <span className="w-4.5 font-semibold">님</span>
                    </div>

                    <div className="flex min-w-0 items-center gap-1">
                      {reservation.tags.map(tag => (
                        <span
                          key={tag}
                          className="shrink-0 rounded-sm bg-[#E6E6E7] px-2 py-1 font-['Pretendard'] text-sm font-medium leading-[1.3]"
                          style={{ color: lightTheme.label.alternative }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex h-5 items-center gap-2.5">
                    <span className="flex items-center gap-1">
                      <img src={dateIcon} alt="" className="size-[1rem]" aria-hidden="true" />
                      <span
                        className="font-['Pretendard'] text-base font-normal leading-[1.3]"
                        style={{ color: lightTheme.label.alternative }}
                      >
                        {reservation.dateLabel}
                      </span>
                    </span>
                    <span
                      className="font-['Pretendard'] text-base font-medium leading-[1.3]"
                      style={{ color: lightTheme.label.assistive }}
                    >
                      ·
                    </span>
                    <span className="flex items-center gap-1">
                      <img src={timeIcon} alt="" className="size-[1rem]" aria-hidden="true" />
                      <span
                        className="font-['Pretendard'] text-base font-normal leading-[1.3]"
                        style={{ color: lightTheme.label.alternative }}
                      >
                        {reservation.time}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export { ReservationCardList };
