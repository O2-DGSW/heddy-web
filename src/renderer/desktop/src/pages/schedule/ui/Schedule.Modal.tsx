import { useEffect, type CSSProperties } from "react";
import { lightTheme, palette } from "@design-tokens";

import calendarIcon from "@/pages/schedule/assets/svg/calendar.svg";
import clockIcon from "@/pages/schedule/assets/svg/clock.svg";
import closeIcon from "@/pages/schedule/assets/svg/close.svg";
import dropdownDownIcon from "@/pages/schedule/assets/svg/dropdown-down.svg";
import dropdownUpIcon from "@/pages/schedule/assets/svg/dropdown-up.svg";
import {
  SCHEDULE_COLOR_OPTIONS,
  SCHEDULE_DESIGNERS,
} from "@/pages/schedule/model/Schedule.constant";
import type { ScheduleColorKey } from "@/pages/schedule/model/Schedule.types";

interface ScheduleModalProps {
  selectedColor: ScheduleColorKey;
  onClose: () => void;
  onSelectColor: (color: ScheduleColorKey) => void;
}

const textStyle = {
  letterSpacing: 0,
};

const valueTextStyle = {
  ...textStyle,
  color: lightTheme.line.normal,
};

const labelTextStyle = {
  ...textStyle,
  color: lightTheme.label.assistive,
};

const createMaskStyle = (src: string, color: string): CSSProperties =>
  ({
    backgroundColor: color,
    WebkitMaskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    WebkitMaskSize: "contain",
    maskImage: `url(${src})`,
    maskRepeat: "no-repeat",
    maskPosition: "center",
    maskSize: "contain",
  }) as CSSProperties;

interface MaskIconProps {
  src: string;
  className: string;
  color: string;
}

const MaskIcon = ({ src, className, color }: MaskIconProps) => (
  <span className={`block ${className}`} style={createMaskStyle(src, color)} aria-hidden="true" />
);

const getSwatchColor = (color: ScheduleColorKey) => {
  if (color === "blue") {
    return palette.blue[90];
  }

  if (color === "red") {
    return palette.red[90];
  }

  if (color === "yellow") {
    return palette.yellow[90];
  }

  return palette.main[90];
};

interface TimeFieldProps {
  label: string;
}

const TimeField = ({ label }: TimeFieldProps) => (
  <label className="flex w-[11.375rem] flex-col items-end gap-3">
    <span
      className="h-[1.3125rem] w-[10.6875rem] font-['Pretendard'] text-[1rem] font-medium leading-[1.3]"
      style={labelTextStyle}
    >
      {label}
    </span>
    <span
      className="relative h-[2.625rem] w-full overflow-hidden rounded-[0.625rem]"
      style={{ backgroundColor: lightTheme.background.neutral }}
    >
      <span className="absolute left-1/2 top-1/2 flex w-[9.5625rem] -translate-x-1/2 -translate-y-1/2 items-center justify-between">
        <span className="flex items-center gap-[0.375rem]">
          <MaskIcon
            src={clockIcon}
            className="size-[1.3125rem] shrink-0"
            color={lightTheme.line.normal}
          />
          <span
            className="font-['Pretendard'] text-[0.875rem] font-normal leading-[1.3]"
            style={valueTextStyle}
          >
            10:00
          </span>
        </span>
        <span className="flex h-[1.625rem] w-4 flex-col items-start">
          <MaskIcon
            src={dropdownUpIcon}
            className="mb-[-0.375rem] size-4 shrink-0"
            color={lightTheme.label.disable}
          />
          <MaskIcon
            src={dropdownDownIcon}
            className="size-4 shrink-0"
            color={lightTheme.label.disable}
          />
        </span>
      </span>
    </span>
  </label>
);

const ScheduleModal = ({ selectedColor, onClose, onSelectColor }: ScheduleModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <section
        className="relative h-[33.8125rem] w-[27.5rem] overflow-hidden rounded-[1.25rem] bg-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="schedule-modal-title"
      >
        <div className="absolute left-[1.75rem] top-[1.875rem] flex w-[23.9375rem] flex-col items-end gap-[2.1875rem]">
          <div className="flex w-full flex-col gap-6">
            <div className="flex w-full flex-col gap-[0.5625rem]">
              <div className="flex h-7 w-full items-center justify-between">
                <h2
                  id="schedule-modal-title"
                  className="font-['Pretendard'] text-[1.25rem] font-semibold leading-[1.3]"
                  style={{ ...textStyle, color: lightTheme.label.neutral }}
                >
                  스케줄
                </h2>
                <button
                  type="button"
                  aria-label="스케줄 모달 닫기"
                  className="flex size-7 items-center justify-center"
                  onClick={onClose}
                >
                  <img src={closeIcon} alt="" className="size-7" aria-hidden="true" />
                </button>
              </div>
              <div className="h-px w-full" style={{ backgroundColor: lightTheme.line.alternative }} />
            </div>

            <div className="flex w-full flex-col gap-5">
              <label className="flex h-[4.5625rem] w-full flex-col items-end gap-3">
                <span
                  className="h-[1.1875rem] w-[23.25rem] font-['Pretendard'] text-[1rem] font-medium leading-[1.3]"
                  style={labelTextStyle}
                >
                  예약 날짜
                </span>
                <span
                  className="relative h-[2.625rem] w-full rounded-[0.625rem]"
                  style={{ backgroundColor: lightTheme.background.neutral }}
                >
                  <span className="absolute left-[0.9375rem] top-1/2 flex -translate-y-1/2 items-center gap-[0.375rem]">
                    <MaskIcon
                      src={calendarIcon}
                      className="size-[1.3125rem] shrink-0"
                      color={lightTheme.line.normal}
                    />
                    <span
                      className="font-['Pretendard'] text-[0.875rem] font-normal leading-[1.3]"
                      style={valueTextStyle}
                    >
                      2026/09/09
                    </span>
                  </span>
                </span>
              </label>

              <div className="flex w-full items-center gap-[1.1875rem]">
                <TimeField label="시작 시간" />
                <TimeField label="끝 시간" />
              </div>

              <div className="flex h-[4.5625rem] w-full flex-col items-end gap-3">
                <span
                  className="h-[1.1875rem] w-[23.25rem] font-['Pretendard'] text-[1rem] font-medium leading-[1.3]"
                  style={labelTextStyle}
                >
                  색상 선택
                </span>
                <div className="flex h-[2.625rem] w-full items-center gap-[0.5625rem]">
                  {SCHEDULE_COLOR_OPTIONS.map(color => (
                    <button
                      key={color}
                      type="button"
                      aria-label={`${color} 스케줄 색상`}
                      aria-pressed={color === selectedColor}
                      className="size-[2.625rem] rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#41BE8E]/35"
                      style={{ backgroundColor: getSwatchColor(color) }}
                      onClick={() => onSelectColor(color)}
                    />
                  ))}
                </div>
              </div>

              <label className="flex h-[4.5625rem] w-full flex-col items-end gap-3">
                <span
                  className="h-[1.1875rem] w-[23.25rem] font-['Pretendard'] text-[1rem] font-medium leading-[1.3]"
                  style={labelTextStyle}
                >
                  디자이너 선택
                </span>
                <span
                  className="relative h-[2.625rem] w-full rounded-[0.625rem]"
                  style={{ backgroundColor: lightTheme.background.neutral }}
                >
                  <span className="absolute left-[0.9375rem] top-1/2 flex -translate-y-1/2 items-center gap-[0.375rem]">
                    <MaskIcon
                      src={dropdownDownIcon}
                      className="size-[1.8125rem] shrink-0"
                      color={lightTheme.line.normal}
                    />
                    <span
                      className="font-['Pretendard'] text-[0.875rem] font-normal leading-[1.3]"
                      style={valueTextStyle}
                    >
                      {SCHEDULE_DESIGNERS[0].name}
                    </span>
                  </span>
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-[0.375rem]">
            <button
              type="button"
              className="flex h-8 w-[3.75rem] items-center justify-center rounded-[0.375rem] px-[0.625rem] py-1 font-['Pretendard'] text-[1rem] font-semibold leading-[1.3]"
              style={{
                ...textStyle,
                backgroundColor: lightTheme.background.neutral,
                color: lightTheme.line.normal,
              }}
              onClick={onClose}
            >
              취소
            </button>
            <button
              type="button"
              className="flex h-8 w-[3.75rem] items-center justify-center rounded-[0.375rem] px-[0.625rem] py-1 font-['Pretendard'] text-[1rem] font-semibold leading-[1.3]"
              style={{
                ...textStyle,
                backgroundColor: lightTheme.primary.normal,
                color: lightTheme.fill.normal,
              }}
              onClick={onClose}
            >
              저장
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export { ScheduleModal };
