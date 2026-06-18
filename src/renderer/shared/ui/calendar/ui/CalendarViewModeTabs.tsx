import { lightTheme } from "@design-tokens";

import { CALENDAR_VIEW_MODE_OPTIONS } from "../model/constants";
import type { CalendarViewMode } from "../model/types";

interface CalendarViewModeTabsProps {
  value: CalendarViewMode;
  onChange?: (mode: CalendarViewMode) => void;
}

const CalendarViewModeTabs = ({ value, onChange }: CalendarViewModeTabsProps) => {
  return (
    <div
      className="mx-auto flex h-[39px] w-[274px] items-center rounded-[20px] px-[2px]"
      style={{ backgroundColor: lightTheme.label.disable }}
    >
      {CALENDAR_VIEW_MODE_OPTIONS.map(mode => {
        const isSelected = mode.value === value;

        return (
          <button
            key={mode.value}
            type="button"
            className="flex h-[29px] flex-1 items-center justify-center rounded-[20px] font-['Pretendard'] text-[18px] font-medium leading-[1.3] tracking-[-0.36px]"
            style={{
              backgroundColor: isSelected ? lightTheme.background.normal : "transparent",
              color: lightTheme.label.assistive,
            }}
            onClick={() => onChange?.(mode.value)}
          >
            {mode.label}
          </button>
        );
      })}
    </div>
  );
};

export { CalendarViewModeTabs };
