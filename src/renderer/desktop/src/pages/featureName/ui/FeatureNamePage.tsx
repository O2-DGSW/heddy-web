import { useEffect, useState } from "react";
import { lightTheme } from "@design-tokens";

import dateIcon from "../assets/date.svg";
import dropdownIcon from "../assets/dropdown.svg";
import radioButtonIcon from "../assets/radio-button.svg";
import timeIcon from "../assets/time.svg";
import customerImage from "../assets/reservation-customer.png";

const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

interface CalendarDate {
  day: string;
  muted?: boolean;
  selected?: boolean;
}

const calendarRows: CalendarDate[][] = [
  [
    { day: "28", muted: true },
    { day: "29", muted: true },
    { day: "30", muted: true },
    { day: "31", muted: true },
    { day: "1" },
    { day: "2" },
    { day: "3" },
  ],
  [
    { day: "4", selected: true },
    { day: "5" },
    { day: "6" },
    { day: "7" },
    { day: "8" },
    { day: "9" },
    { day: "10" },
  ],
  [
    { day: "11" },
    { day: "12" },
    { day: "13" },
    { day: "14" },
    { day: "15" },
    { day: "16" },
    { day: "17" },
  ],
  [
    { day: "18" },
    { day: "19" },
    { day: "20" },
    { day: "21" },
    { day: "22" },
    { day: "23" },
    { day: "24" },
  ],
  [
    { day: "25" },
    { day: "26" },
    { day: "27" },
    { day: "28" },
    { day: "29" },
    { day: "30" },
    { day: "1", muted: true },
  ],
];

const reservations = [
  { id: 1, name: "오용준", date: "10월 10일", time: "10:00", tags: ["# 남자", "# 다운펌"] },
  { id: 2, name: "오용준", date: "10월 10일", time: "10:00", tags: ["# 남자", "# 다운펌"] },
  { id: 3, name: "오용준", date: "10월 10일", time: "10:00", tags: ["# 남자", "# 다운펌"] },
];

const filterTabs = [{ label: "전체", active: true }, { label: "거절" }, { label: "변경 요청" }];

const reservationStatusRows = [
  { id: 1, request: "앞머리 길게 해주세요", status: "거절", statusColor: lightTheme.status.error },
  {
    id: 2,
    request: "앞머리 길게 해주세요",
    status: "시간 변경",
    statusColor: lightTheme.status.warning,
  },
  {
    id: 3,
    request: "앞머리 길게 해주세요ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ",
    status: "거절",
    statusColor: lightTheme.status.error,
  },
  {
    id: 4,
    request: "앞머리 길게 해주세요",
    status: "승인",
    statusColor: lightTheme.status.success,
  },
  { id: 5, request: "앞머리 길게 해주세요", status: "거절", statusColor: lightTheme.status.error },
];

const DESIGN_MAIN_WIDTH_PX = 1442;
const DESIGN_MAIN_HEIGHT_REM = 57.0625;
const DESIGN_MAIN_WIDTH_REM = 90.125;
const DESKTOP_BAR_WIDTH_PX = 68;
const DROPDOWN_FILTER =
  "brightness(0) saturate(100%) invert(36%) sepia(7%) saturate(235%) hue-rotate(169deg) brightness(94%) contrast(88%)";

const getReservationScale = () => {
  if (typeof window === "undefined") {
    return 1;
  }

  return Math.min(
    1,
    Math.max(0.32, (window.innerWidth - DESKTOP_BAR_WIDTH_PX) / DESIGN_MAIN_WIDTH_PX)
  );
};

const FeatureNamePage = () => {
  const [scale, setScale] = useState(getReservationScale);

  useEffect(() => {
    const handleResize = () => {
      setScale(getReservationScale());
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="h-[calc(100vh-4.25rem)] overflow-hidden bg-[#FAFAFA]"
      style={{
        height: `${DESIGN_MAIN_HEIGHT_REM * scale}rem`,
      }}
    >
      <div
        className="origin-top-left"
        style={{
          transform: `scale(${scale})`,
          width: `${DESIGN_MAIN_WIDTH_REM}rem`,
          height: `${DESIGN_MAIN_HEIGHT_REM}rem`,
        }}
      >
        <div className="ml-10 mt-[2.625rem] flex h-[51.875rem] w-[85.0625rem] gap-4">
          <section className="h-full w-[34.625rem] overflow-hidden rounded-xl bg-white shadow-[0_0_0.25rem_rgba(0,0,0,0.08)]">
            <div className="mx-auto mt-[1.9375rem] flex w-[31.25rem] flex-col items-center gap-12">
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
                          color:
                            index === 0 ? lightTheme.status.error : lightTheme.label.alternative,
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
                              color: date.muted
                                ? lightTheme.line.normal
                                : lightTheme.label.alternative,
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
                            <img
                              src={dateIcon}
                              alt=""
                              className="size-[0.9375rem]"
                              aria-hidden="true"
                            />
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
                            <img
                              src={timeIcon}
                              alt=""
                              className="size-[0.9375rem]"
                              aria-hidden="true"
                            />
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
            </div>
          </section>

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
                        backgroundColor: tab.active
                          ? lightTheme.primary.normal
                          : lightTheme.fill.neutral,
                        color: tab.active
                          ? lightTheme.label.buttonText
                          : lightTheme.label.alternative,
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
                  {reservationStatusRows.map(row => (
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
        </div>
      </div>
    </div>
  );
};

export { FeatureNamePage };
