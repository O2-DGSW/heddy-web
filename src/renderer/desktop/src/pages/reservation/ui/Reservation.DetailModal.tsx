import { lightTheme } from "@design-tokens";

import closeIcon from "@/pages/schedule/assets/svg/close.svg";
import dropdownDownIcon from "@/pages/schedule/assets/svg/dropdown-down.svg";
import dropdownUpIcon from "@/pages/schedule/assets/svg/dropdown-up.svg";
import timeIcon from "@/pages/reservation/assets/svg/time.svg";
import type { ReservationDetailModalProps } from "@/pages/reservation/model/Reservation.types";

const ReservationDetailModal = ({
  reservation,
  timeOptions,
  isTimeMenuOpen,
  onToggleTimeMenu,
  onSelectTime,
  onClose,
}: ReservationDetailModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <section
        className="h-[27.5rem] w-[27.5rem] overflow-visible rounded-[1.25rem] bg-white shadow-[0_0_0.5rem_rgba(0,0,0,0.08)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-modal-title"
      >
        <div className="flex h-full flex-col px-[1.75rem] py-[1.875rem]">
          <div className="flex h-full flex-col">
            <div className="flex flex-col gap-[2.0625rem]">
              <div className="flex flex-col gap-[0.5625rem]">
                <div className="flex items-center justify-between">
                  <h2
                    id="reservation-modal-title"
                    className="font-['Pretendard'] text-[1.25rem] font-semibold leading-[1.3]"
                    style={{ color: lightTheme.label.neutral }}
                  >
                    예약
                  </h2>
                  <button
                    type="button"
                    aria-label="예약 상세 모달 닫기"
                    className="flex size-[2rem] items-center justify-center"
                    onClick={onClose}
                  >
                    <img src={closeIcon} alt="" className="size-[2rem]" aria-hidden="true" />
                  </button>
                </div>

                <div
                  className="h-[0.125rem] w-full"
                  style={{ backgroundColor: lightTheme.background.neutral }}
                />
              </div>

              <div className="flex flex-col gap-[1.25rem]">
                <div className="flex gap-[1.1875rem]">
                  <label className="flex w-[11.375rem] flex-col gap-3">
                    <span
                      className="pl-[0.6875rem] font-['Pretendard'] text-[1rem] font-medium leading-[1.3]"
                      style={{ color: lightTheme.label.assistive }}
                    >
                      시술명
                    </span>
                    <div
                      className="flex h-[2.625rem] items-center rounded-[0.625rem] px-[0.9375rem] font-['Pretendard'] text-[0.875rem] font-normal leading-[1.3]"
                      style={{
                        backgroundColor: lightTheme.background.neutral,
                        color: lightTheme.label.assistive,
                      }}
                    >
                      {reservation.service}
                    </div>
                  </label>

                  <label className="flex w-[11.375rem] flex-col gap-3">
                    <span
                      className="pl-[0.6875rem] font-['Pretendard'] text-[1rem] font-medium leading-[1.3]"
                      style={{ color: lightTheme.label.assistive }}
                    >
                      고객명
                    </span>
                    <div
                      className="flex h-[2.625rem] items-center rounded-[0.625rem] px-[0.9375rem] font-['Pretendard'] text-[0.875rem] font-normal leading-[1.3]"
                      style={{
                        backgroundColor: lightTheme.background.neutral,
                        color: lightTheme.label.assistive,
                      }}
                    >
                      {reservation.customerName}
                    </div>
                  </label>
                </div>

                <div className="relative flex flex-col gap-3">
                  <span
                    className="pl-[0.6875rem] font-['Pretendard'] text-[1rem] font-medium leading-[1.3]"
                    style={{ color: lightTheme.label.assistive }}
                  >
                    시간
                  </span>
                  <button
                    type="button"
                    className="flex h-[2.625rem] items-center justify-between rounded-[0.625rem] px-[1rem]"
                    style={{ backgroundColor: lightTheme.background.neutral }}
                    onClick={onToggleTimeMenu}
                  >
                    <span className="flex items-center gap-[0.375rem]">
                      <span className="flex shrink-0 items-center justify-center" style={{ color: lightTheme.label.assistive }}>
                        <img src={timeIcon} alt="" className="size-[1.3125rem] shrink-0" aria-hidden="true" />
                      </span>
                      <span
                        className="font-['Pretendard'] text-[0.875rem] font-normal leading-[1.3]"
                        style={{ color: lightTheme.label.assistive }}
                      >
                        {reservation.time}
                      </span>
                    </span>

                    <span className="flex h-[1.625rem] w-4 flex-col items-start">
                      <img
                        src={dropdownUpIcon}
                        alt=""
                        className="mb-[-0.375rem] size-4 shrink-0"
                        aria-hidden="true"
                      />
                      <img
                        src={dropdownDownIcon}
                        alt=""
                        className="size-4 shrink-0"
                        aria-hidden="true"
                      />
                    </span>
                  </button>

                  {isTimeMenuOpen ? (
                    <div
                      className="absolute left-0 top-[5.375rem] z-20 flex max-h-[13.5rem] w-full flex-col gap-[0.375rem] overflow-y-auto rounded-[0.75rem] border bg-white p-[0.5rem] shadow-[0_0_0.5rem_rgba(0,0,0,0.08)]"
                      style={{ borderColor: lightTheme.line.alternative }}
                    >
                      {timeOptions.map(option => (
                        <button
                          key={option}
                          type="button"
                          className="flex h-[2.25rem] items-center justify-center rounded-[0.5rem] font-['Pretendard'] text-[0.875rem] font-medium leading-[1.3] transition-colors hover:bg-[#F2F4F6]"
                          style={{
                            backgroundColor:
                              option === reservation.time
                                ? lightTheme.background.neutral
                                : "transparent",
                            color:
                              option === reservation.time
                                ? lightTheme.primary.normal
                                : lightTheme.label.alternative,
                          }}
                          onClick={() => onSelectTime(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>

                <label className="flex flex-col gap-3">
                  <span
                    className="pl-[0.6875rem] font-['Pretendard'] text-[1rem] font-medium leading-[1.3]"
                    style={{ color: lightTheme.label.assistive }}
                  >
                    요청사항
                  </span>
                  <div
                    className="h-[4.625rem] rounded-[0.625rem] px-[0.9375rem] py-[0.8125rem] font-['Pretendard'] text-[0.875rem] font-normal leading-[1.3]"
                    style={{
                      backgroundColor: lightTheme.background.neutral,
                      color: lightTheme.label.assistive,
                    }}
                  >
                    {reservation.request}
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export { ReservationDetailModal };
