import { lightTheme } from "@design-tokens";

import characterImage from "@/pages/schedule/assets/images/schedule-character.png";
import {
  SCHEDULE_COLOR_STYLES,
  SCHEDULE_EVENT_HEIGHT_REM,
} from "@/pages/schedule/model/Schedule.constant";
import type { ScheduleEvent } from "@/pages/schedule/model/Schedule.types";

interface ScheduleEventCardProps {
  event: ScheduleEvent;
  leftRem: number;
  topRem: number;
  widthRem: number;
  onSelect: () => void;
}

const ScheduleEventCard = ({
  event,
  leftRem,
  topRem,
  widthRem,
  onSelect,
}: ScheduleEventCardProps) => {
  const colorStyle = SCHEDULE_COLOR_STYLES[event.color];
  const shouldShowAvatar = widthRem >= 3;
  const shouldShowCustomerName = widthRem >= 5.75;
  const shouldShowDesignerName = widthRem >= 8;
  const shouldShowTags = widthRem >= 12;
  const horizontalPaddingRem = widthRem < 8 ? 0.375 : 0.5625;

  return (
    <button
      type="button"
      aria-label={`${event.customerName}님 ${event.designerName} 스케줄 편집`}
      data-schedule-event-id={event.id}
      data-schedule-event-duration-hours={event.endHour - event.startHour}
      className="absolute cursor-pointer overflow-hidden rounded-[0.4375rem] text-left outline-none transition-shadow hover:ring-2 hover:ring-[#41BE8E]/20 focus-visible:ring-2 focus-visible:ring-[#41BE8E]/35"
      style={{
        left: `${leftRem}rem`,
        top: `${topRem}rem`,
        width: `${widthRem}rem`,
        height: `${SCHEDULE_EVENT_HEIGHT_REM}rem`,
        backgroundColor: colorStyle.background,
      }}
      onClick={onSelect}
    >
      <div
        className="absolute left-0 top-0 h-full w-[0.125rem]"
        style={{ backgroundColor: colorStyle.accent }}
      />

      <div
        className="flex h-full items-center justify-between"
        style={{
          paddingLeft: `${horizontalPaddingRem}rem`,
          paddingRight: `${horizontalPaddingRem}rem`,
        }}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {shouldShowAvatar && (
            <div className="relative size-[1.375rem] shrink-0 overflow-hidden rounded-full bg-white">
              <img
                src={characterImage}
                alt=""
                className="absolute left-1/2 top-1/2 h-[0.95rem] w-[1rem] -translate-x-1/2 -translate-y-1/2 object-contain"
                aria-hidden="true"
              />
            </div>
          )}
          <div
            className="flex min-w-0 flex-1 items-end gap-1 font-['Pretendard'] leading-[1.3]"
            style={{ color: lightTheme.label.neutral, letterSpacing: 0 }}
          >
            {shouldShowCustomerName && (
              <span className="truncate text-[0.75rem] font-medium">{event.customerName}</span>
            )}
            {shouldShowDesignerName && (
              <span className="shrink-0 text-[0.5rem] font-normal">{event.designerName}</span>
            )}
          </div>
        </div>

        {shouldShowTags && (
          <div className="ml-2 flex shrink-0 items-center gap-1">
            {event.tags.map(tag => (
              <span
                key={tag}
                className="flex h-[1.125rem] items-center rounded-[0.3125rem] bg-white px-[0.3125rem] font-['Pretendard'] text-[0.5rem] font-normal leading-[1.3]"
                style={{ color: lightTheme.label.alternative, letterSpacing: 0 }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
};

export { ScheduleEventCard };
