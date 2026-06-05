import { lightTheme } from "@design-tokens";

import dropdownIcon from "@/pages/reservation/assets/dropdown.svg";
import radioButtonIcon from "@/pages/reservation/assets/radio-button.svg";
import type { ReservationStatusPanelProps } from "@/pages/reservation/model/Reservation.types";

const ReservationStatusPanel = ({ filterTabs, rows }: ReservationStatusPanelProps) => {
  return (
    <section className="h-full min-w-0 flex-1 overflow-hidden rounded-xl bg-white shadow-[0_0_0.25rem_rgba(0,0,0,0.08)]">
      <div className="mt-7.75 flex w-full flex-col gap-5">
        <div className="flex w-full items-center justify-between px-5">
          <h2
            className="font-['Pretendard'] text-xl font-bold leading-[1.3]"
            style={{ color: lightTheme.label.neutral }}
          >
            예약 현황
          </h2>

          <div className="flex min-w-0 items-center gap-2">
            {filterTabs.map(tab => (
              <button
                key={tab.label}
                type="button"
                className="flex h-[1.625rem] items-center justify-center rounded-[1rem] px-[0.75rem] py-[0.25rem] font-['Pretendard'] text-xs font-medium leading-[1.3]"
                style={{
                  backgroundColor: tab.active ? lightTheme.primary.normal : lightTheme.fill.neutral,
                  color: tab.active ? lightTheme.label.buttonText : lightTheme.label.alternative,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full">
          <div
            className="flex h-[2.25rem] items-center justify-center font-['Pretendard'] text-lg font-medium leading-[1.3]"
            style={{
              backgroundColor: lightTheme.label.disable,
              color: lightTheme.label.assistive,
            }}
          >
            <div className="grid w-full grid-cols-[4.5rem_3rem_3rem_1.5rem_minmax(6rem,1fr)_2.5rem_minmax(10rem,1.4fr)_2.5rem_5.25rem] px-[2.625rem] text-center">
              <span className="col-start-1">시간</span>
              <span className="col-start-3">고객명</span>
              <span className="col-start-5">시술</span>
              <span className="col-start-7">요청사항</span>
              <span className="col-start-9">상태</span>
            </div>
          </div>

          <div className="flex flex-col">
            {rows.map(row => (
              <div
                key={row.id}
                className="flex h-16 items-center justify-center border-b border-[#F7F7F7]"
              >
                <div
                  className="grid w-full grid-cols-[4.5rem_3rem_3rem_1.5rem_minmax(6rem,1fr)_2.5rem_minmax(10rem,1.4fr)_2.5rem_5.25rem] items-center px-[2.625rem] font-['Pretendard'] text-lg font-semibold leading-[1.3]"
                  style={{ color: lightTheme.label.assistive }}
                >
                  <div className="col-start-1 flex min-w-0 items-center gap-[0.625rem]">
                    <img
                      src={radioButtonIcon}
                      alt=""
                      className="size-[0.875rem]"
                      aria-hidden="true"
                    />
                    <span>10:00</span>
                  </div>
                  <span className="col-start-3 min-w-0 truncate">오용준</span>
                  <span className="col-start-5 min-w-0 truncate text-center">다운펌</span>
                  <span className="col-start-7 flex h-[1.875rem] w-full min-w-0 items-center justify-center overflow-hidden rounded-[1.25rem] border border-[#E8E8E9] bg-white px-[1rem] py-[0.25rem] text-center font-['Pretendard'] text-sm font-medium leading-[1.3]">
                    <span className="block w-full truncate">{row.request}</span>
                  </span>
                  <button
                    type="button"
                    className="col-start-9 flex h-[1.625rem] w-[5.25rem] items-center justify-center overflow-hidden rounded-[1rem] pl-[0.625rem] pr-[0.125rem] font-['Pretendard'] text-sm font-medium leading-[1.3]"
                    style={{
                      backgroundColor: row.statusColor,
                      color: lightTheme.label.buttonText,
                    }}
                  >
                    <span className="-mr-[0.125rem] whitespace-nowrap">{row.status}</span>
                    <img
                      src={dropdownIcon}
                      alt=""
                      className="size-[1.25rem] shrink-0"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { ReservationStatusPanel };
