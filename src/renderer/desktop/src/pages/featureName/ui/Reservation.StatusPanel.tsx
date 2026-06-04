import { lightTheme } from "@design-tokens";

import dropdownIcon from "@/pages/featureName/assets/dropdown.svg";
import radioButtonIcon from "@/pages/featureName/assets/radio-button.svg";
import type { ReservationStatusPanelProps } from "@/pages/featureName/model/Reservation.types";

const ReservationStatusPanel = ({ filterTabs, rows }: ReservationStatusPanelProps) => {
  return (
    <section className="h-full w-[49.4375rem] overflow-hidden rounded-xl bg-white shadow-[0_0_0.25rem_rgba(0,0,0,0.08)]">
      <div className="mt-[1.9375rem] flex w-full flex-col items-center gap-5">
        <div className="flex w-[45.75rem] items-center justify-between">
          <h2
            className="font-['Pretendard'] text-xl font-bold leading-[1.3] tracking-[-0.025rem]"
            style={{ color: lightTheme.label.neutral }}
          >
            예약 현황
          </h2>

          <div className="flex items-center gap-2">
            {filterTabs.map(tab => (
              <button
                key={tab.label}
                type="button"
                className="flex h-[1.5625rem] items-center justify-center rounded-[0.9375rem] px-3 py-1 font-['Pretendard'] text-xs font-medium leading-[1.3] tracking-[-0.015rem]"
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
            className="flex h-[2.25rem] items-center justify-center font-['Pretendard'] text-lg font-medium leading-[1.3] tracking-[-0.0225rem]"
            style={{
              backgroundColor: lightTheme.label.disable,
              color: lightTheme.label.assistive,
            }}
          >
            <div className="grid w-[44.107rem] grid-cols-[4.5rem_3rem_8.875rem_12.5rem_5.231875rem] gap-x-10 text-center">
              <span>시간</span>
              <span>고객명</span>
              <span>시술</span>
              <span>요청사항</span>
              <span>상태</span>
            </div>
          </div>

          <div className="flex flex-col">
            {rows.map(row => (
              <div
                key={row.id}
                className="flex h-16 items-center justify-center border-b border-[#F7F7F7]"
              >
                <div
                  className="grid w-[44.107rem] grid-cols-[4.5rem_3rem_8.875rem_12.5rem_5.231875rem] items-center gap-x-10 font-['Pretendard'] text-lg font-semibold leading-[1.3] tracking-[-0.0225rem]"
                  style={{ color: lightTheme.label.assistive }}
                >
                  <div className="flex items-center gap-[0.625rem]">
                    <img
                      src={radioButtonIcon}
                      alt=""
                      className="size-[0.875rem]"
                      aria-hidden="true"
                    />
                    <span>10:00</span>
                  </div>
                  <span>오용준</span>
                  <span className="text-center">다운펌</span>
                  <span className="flex h-[1.8125rem] w-[12.5rem] items-center justify-center overflow-hidden rounded-[1.25rem] border border-[#E8E8E9] bg-white px-[0.9375rem] py-[0.1875rem] text-center">
                    <span className="block w-[10.75rem] truncate">{row.request}</span>
                  </span>
                  <button
                    type="button"
                    className="flex h-[1.625rem] w-[5.231875rem] items-center justify-center overflow-hidden rounded-[0.9375rem] pl-[0.6190625rem] pr-[0.15475rem] font-['Pretendard'] text-[0.92875rem] font-medium leading-[1.3] tracking-[-0.018575rem]"
                    style={{
                      backgroundColor: row.statusColor,
                      color: lightTheme.label.buttonText,
                    }}
                  >
                    <span className="-mr-[0.15475rem] whitespace-nowrap">{row.status}</span>
                    <img
                      src={dropdownIcon}
                      alt=""
                      className="size-[1.238125rem] shrink-0"
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
