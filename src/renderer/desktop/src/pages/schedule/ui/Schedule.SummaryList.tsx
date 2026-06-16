import { lightTheme } from "@design-tokens";

import characterImage from "@/pages/schedule/assets/images/schedule-character.png";
import calendarIcon from "@/pages/schedule/assets/svg/calendar.svg";
import clockIcon from "@/pages/schedule/assets/svg/clock.svg";
import dropdownDownIcon from "@/pages/schedule/assets/svg/dropdown-down.svg";
import type { ScheduleSummaryItem } from "@/pages/schedule/model/Schedule.types";

import { ScheduleEmptyState } from "./Schedule.EmptyState";

interface ScheduleSummaryListProps {
  items: ScheduleSummaryItem[];
}

const lightDropdownFilter =
  "brightness(0) saturate(100%) invert(89%) sepia(2%) saturate(68%) hue-rotate(169deg) brightness(94%) contrast(91%)";

const ScheduleSummaryList = ({ items }: ScheduleSummaryListProps) => {
  if (items.length === 0) {
    return <ScheduleEmptyState />;
  }

  return (
    <div className="flex h-[17.25rem] w-full flex-col gap-3 overflow-hidden">
      {items.map(item => (
        <article
          key={item.id}
          className="relative h-[5.25rem] w-full shrink-0 overflow-hidden rounded-[0.5rem]"
          style={{
            backgroundColor: lightTheme.background.neutral,
            boxShadow: "0 0 0.375rem rgba(0,0,0,0.02)",
          }}
        >
          <div
            className="absolute left-0 top-0 h-full w-[0.3125rem]"
            style={{ backgroundColor: lightTheme.primary.normal }}
          />

          <div className="flex h-full items-center gap-[1.1875rem] px-[1.4375rem]">
            <div className="relative size-[3.25rem] shrink-0 overflow-hidden rounded-full bg-white">
              <img
                src={characterImage}
                alt=""
                className="absolute left-1/2 top-1/2 h-[2.125rem] w-[2.25rem] -translate-x-1/2 -translate-y-1/2 object-contain"
                aria-hidden="true"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex h-[1.4375rem] items-start justify-between">
                <div className="flex min-w-0 items-center gap-1">
                  <span
                    className="truncate font-['Pretendard'] text-[1.125rem] font-bold leading-[1.3]"
                    style={{ color: lightTheme.label.neutral, letterSpacing: 0 }}
                  >
                    {item.customerName}
                  </span>
                  <span
                    className="shrink-0 font-['Pretendard'] text-[1.125rem] font-semibold leading-[1.3]"
                    style={{ color: lightTheme.label.neutral, letterSpacing: 0 }}
                  >
                    님
                  </span>
                </div>

                <button
                  type="button"
                  className="flex h-[1.375rem] w-[3.9375rem] shrink-0 items-center justify-center gap-[0.125rem] rounded-[1.375rem] bg-white"
                >
                  <span
                    className="font-['Pretendard'] text-[0.75rem] font-medium leading-[1.3]"
                    style={{ color: lightTheme.label.alternative, letterSpacing: 0 }}
                  >
                    {item.designerName}
                  </span>
                  <img
                    src={dropdownDownIcon}
                    alt=""
                    className="size-4"
                    style={{ filter: lightDropdownFilter }}
                    aria-hidden="true"
                  />
                </button>
              </div>

              <div className="mt-2 flex h-6 items-center justify-between">
                <div
                  className="flex items-center gap-[0.625rem] font-['Pretendard'] text-[0.875rem] font-normal leading-[1.3]"
                  style={{ color: lightTheme.label.alternative, letterSpacing: 0 }}
                >
                  <span className="flex items-center gap-[0.1875rem]">
                    <img src={calendarIcon} alt="" className="size-[0.9375rem]" aria-hidden="true" />
                    {item.date}
                  </span>
                  <span
                    className="text-[1rem] font-medium"
                    style={{ color: lightTheme.label.assistive, letterSpacing: 0 }}
                  >
                    ·
                  </span>
                  <span className="flex items-center gap-[0.1875rem]">
                    <img src={clockIcon} alt="" className="size-[0.9375rem]" aria-hidden="true" />
                    {item.time}
                  </span>
                </div>

                <div className="flex min-w-0 items-center gap-1">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="shrink-0 rounded-[0.3125rem] px-2 py-1 font-['Pretendard'] text-[0.75rem] font-medium leading-[1.3]"
                      style={{
                        backgroundColor: lightTheme.fill.neutral,
                        color: lightTheme.label.alternative,
                        letterSpacing: 0,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export { ScheduleSummaryList };

