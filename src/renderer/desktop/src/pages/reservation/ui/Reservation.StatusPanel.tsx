import { lightTheme } from "@design-tokens";

import DropdownIcon from "@/pages/reservation/assets/dropdown.svg?react";
import customerImage from "@/pages/reservation/assets/reservation-customer.png";
import radioButtonIcon from "@/pages/reservation/assets/radio-button.svg";
import {
  RESERVATION_STATUS_META,
  RESERVATION_STATUS_PANEL_MIN_WIDTH_REM,
} from "@/pages/reservation/model/Reservation.constant";
import type {
  ReservationStatusKey,
  ReservationStatusPanelProps,
} from "@/pages/reservation/model/Reservation.types";

const STATUS_MENU_TEXT_COLOR = lightTheme.line.normal;
const STATUS_MENU_OPTIONS: ReservationStatusKey[] = ["approved", "rejected", "changeRequest"];

const ReservationStatusPanel = ({
  filterTabs,
  rows,
  isLoading,
  hasNoConnectedShop,
  activeStatusMenuReservationId,
  onSelectFilter,
  onToggleStatusMenu,
  onSelectStatus,
  onOpenReservation,
  onOpenTimeChangeModal,
}: ReservationStatusPanelProps) => {
  const emptyTitle = hasNoConnectedShop ? "연결된 매장이 없어요" : "예약된 내역이 없어요";
  const emptyDescription = hasNoConnectedShop
    ? "매장 등록 또는 초대 수락 후 예약을 확인할 수 있어요"
    : "다른 날짜를 선택하거나 필터를 변경해보세요";

  return (
    <section
      className="h-full flex-1 overflow-hidden rounded-xl bg-white shadow-[0_0_0.25rem_rgba(0,0,0,0.08)]"
      style={{ minWidth: `${RESERVATION_STATUS_PANEL_MIN_WIDTH_REM}rem` }}
    >
      <div className="flex h-full w-full flex-col gap-5 pt-7.75">
        <div className="flex w-full items-center justify-between px-[1.84375rem]">
          <h2
            className="font-['Pretendard'] text-[1.75rem] font-bold leading-[1.3]"
            style={{ color: lightTheme.label.neutral }}
          >
            예약 현황
          </h2>

          <div className="flex min-w-0 items-center gap-2.5">
            {filterTabs.map(tab => (
              <button
                key={tab.key}
                type="button"
                className="flex h-7 items-center justify-center rounded-2xl px-3.5 py-1.25 font-['Pretendard'] text-sm font-medium leading-[1.3]"
                style={{
                  backgroundColor: tab.active ? lightTheme.primary.normal : lightTheme.fill.neutral,
                  color: tab.active ? lightTheme.label.buttonText : lightTheme.label.alternative,
                }}
                onClick={() => onSelectFilter(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex min-h-0 w-full flex-1 flex-col">
          <div
            className="flex h-9 items-center justify-center font-['Pretendard'] text-lg font-medium leading-[1.3]"
            style={{
              backgroundColor: lightTheme.label.disable,
              color: lightTheme.label.assistive,
            }}
          >
            <div className="grid w-full grid-cols-[4.5rem_2.5rem_3rem_2.5rem_8.875rem_2.5rem_minmax(12.5rem,1fr)_2.5rem_5.231875rem] px-[2.65625rem] text-center">
              <span className="col-start-1 text-center">시간</span>
              <span className="col-start-3 text-left">고객명</span>
              <span className="col-start-5 text-center">시술</span>
              <span className="col-start-7 text-center">요청사항</span>
              <span className="col-start-9 text-center">상태</span>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            {isLoading ? (
              <div
                className="flex flex-1 items-center justify-center font-['Pretendard'] text-xl font-medium leading-[1.3]"
                style={{ color: lightTheme.label.assistive }}
              >
                예약을 불러오는 중입니다
              </div>
            ) : rows.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-[clamp(1rem,1.6vw,1.5rem)]">
                <div className="relative size-[clamp(5.25rem,6vw,7rem)] overflow-hidden rounded-full bg-white shadow-[0_0_0.375rem_rgba(0,0,0,0.02)]">
                  <img
                    src={customerImage}
                    alt=""
                    className="absolute left-1/2 top-1/2 h-[71.052631%] w-[75%] -translate-x-1/2 -translate-y-1/2 object-cover"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <p
                    className="font-['Pretendard'] text-[clamp(1rem,1.12vw,1.25rem)] font-semibold leading-[1.3]"
                    style={{ color: lightTheme.label.alternative }}
                  >
                    {emptyTitle}
                  </p>
                  <p
                    className="font-['Pretendard'] text-[clamp(0.875rem,0.98vw,1.0625rem)] font-medium leading-[1.3]"
                    style={{ color: lightTheme.label.assistive }}
                  >
                    {emptyDescription}
                  </p>
                </div>
              </div>
            ) : (
              rows.map(row => {
                const statusMeta = RESERVATION_STATUS_META[row.status];
                const isStatusMenuOpen = activeStatusMenuReservationId === row.id;

                return (
                  <div
                    key={row.id}
                    className="flex h-16 items-center justify-center border-b border-[#F7F7F7]"
                  >
                    <div className="grid w-full grid-cols-[4.5rem_2.5rem_3rem_2.5rem_8.875rem_2.5rem_minmax(12.5rem,1fr)_2.5rem_5.231875rem] items-center px-[2.65625rem] font-['Pretendard'] text-lg font-semibold leading-[1.3]">
                      <button
                        type="button"
                        className="col-start-1 col-end-8 grid w-full cursor-pointer grid-cols-[4.5rem_2.5rem_3rem_2.5rem_8.875rem_2.5rem_minmax(12.5rem,1fr)] items-center border-0 bg-transparent p-0 text-left font-['Pretendard'] text-lg font-semibold leading-[1.3]"
                        style={{ color: lightTheme.label.assistive }}
                        onClick={() => onOpenReservation(row.id)}
                      >
                        <span className="col-start-1 flex min-w-0 items-center gap-2.5">
                          <img
                            src={radioButtonIcon}
                            alt=""
                            className="size-3.5"
                            aria-hidden="true"
                          />
                          <span>{row.time}</span>
                        </span>
                        <span className="col-start-3 min-w-0 truncate">{row.customerName}</span>
                        <span className="col-start-5 min-w-0 truncate text-center">
                          {row.service}
                        </span>
                        <span
                          className="col-start-7 flex h-8 w-full min-w-0 items-center justify-center overflow-hidden rounded-[1.25rem] border bg-white px-3.75 text-center font-['Pretendard'] text-[1rem] font-medium leading-[1.3]"
                          style={{ borderColor: lightTheme.line.alternative }}
                        >
                          <span className="block w-full truncate">{row.request}</span>
                        </span>
                      </button>
                      <div className="col-start-9 relative flex justify-center">
                        <button
                          type="button"
                          aria-haspopup="menu"
                          aria-expanded={isStatusMenuOpen}
                          className="flex h-6.5 w-[5.231875rem] items-center justify-center overflow-hidden rounded-[0.9375rem] pl-[0.6190625rem] pr-[0.15475rem] font-['Pretendard'] font-medium leading-[1.3]"
                          style={{
                            backgroundColor: statusMeta.color,
                            color: statusMeta.textColor,
                            fontSize: "0.92875rem",
                            letterSpacing: "-0.018575rem",
                          }}
                          onClick={event => {
                            event.stopPropagation();

                            if (row.status === "changeRequest") {
                              onOpenTimeChangeModal(row.id);
                              return;
                            }

                            onToggleStatusMenu(row.id);
                          }}
                        >
                          <span className="mr-[-0.15475rem] whitespace-nowrap">
                            {statusMeta.chipLabel}
                          </span>
                          <DropdownIcon
                            aria-hidden="true"
                            className="size-[1.238125rem] shrink-0"
                            style={{ color: statusMeta.textColor }}
                          />
                        </button>

                        {isStatusMenuOpen ? (
                          <div className="absolute right-0 top-8 z-10 flex w-29.5 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_0_0.5rem_rgba(0,0,0,0.05)]">
                            {STATUS_MENU_OPTIONS.map(option => {
                              const optionMeta = RESERVATION_STATUS_META[option];

                              return (
                                <button
                                  key={option}
                                  type="button"
                                  className="flex h-11.5 items-center justify-center border-b px-3.5 font-['Pretendard'] text-[1rem] font-medium leading-[1.3] transition-colors hover:bg-[#F7F7F7] last:border-b-0"
                                  style={{
                                    color: STATUS_MENU_TEXT_COLOR,
                                    borderColor: lightTheme.line.alternative,
                                  }}
                                  onClick={event => {
                                    event.stopPropagation();

                                    if (option === "changeRequest") {
                                      onSelectStatus(row.id, option);
                                      onOpenTimeChangeModal(row.id);
                                      return;
                                    }

                                    onSelectStatus(row.id, option);
                                  }}
                                >
                                  <span className="whitespace-nowrap text-center">
                                    {optionMeta.optionLabel}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { ReservationStatusPanel };
