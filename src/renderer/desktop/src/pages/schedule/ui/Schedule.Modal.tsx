import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, MouseEvent } from "react";
import { lightTheme, palette } from "@design-tokens";

import { getTodayDateKey, parseDateKey } from "@/shared/ui/calendar/model/date";
import dropdownDownIcon from "@/pages/schedule/assets/svg/dropdown-down.svg";
import dropdownUpIcon from "@/pages/schedule/assets/svg/dropdown-up.svg";
import modalCloseIcon from "@/pages/schedule/assets/svg/modal-close.svg";
import modalDateIcon from "@/pages/schedule/assets/svg/modal-date.svg";
import modalDropdownIcon from "@/pages/schedule/assets/svg/modal-dropdown.svg";
import modalTimeIcon from "@/pages/schedule/assets/svg/modal-time.svg";
import {
  DEFAULT_SCHEDULE_DESIGNER_ID,
  SCHEDULE_COLOR_OPTIONS,
  SCHEDULE_DESIGNERS,
  SCHEDULE_TIME_STEP_MINUTES,
} from "@/pages/schedule/model/Schedule.constant";
import type {
  ScheduleColorKey,
  ScheduleEvent,
  ScheduleFormValues,
} from "@/pages/schedule/model/Schedule.types";

interface ScheduleModalProps {
  editingEvent: ScheduleEvent | null;
  initialDate: string;
  visibleWeekDateKeys: string[];
  onClose: () => void;
  onDelete: (eventId: number) => void;
  onSave: (values: ScheduleFormValues) => void;
}

type OpenPopover = "date" | "designer" | "endTime" | "startTime" | null;

interface DateFieldProps {
  isOpen: boolean;
  value: string;
  visibleWeekDateKeys: string[];
  onSelect: (value: string) => void;
  onToggle: () => void;
}

interface TimeFieldProps {
  isOpen: boolean;
  label: string;
  maxMinutes: number;
  minMinutes: number;
  value: string;
  onChange: (value: string) => void;
  onToggle: () => void;
}

interface DesignerFieldProps {
  isOpen: boolean;
  value: string;
  onSelect: (value: string) => void;
  onToggle: () => void;
}

const TIME_STEP_MINUTES = SCHEDULE_TIME_STEP_MINUTES;
const MIN_TIME_MINUTES = 0;
const MAX_TIME_MINUTES = 24 * 60;
const MAX_START_TIME_MINUTES = MAX_TIME_MINUTES - TIME_STEP_MINUTES;
const DEFAULT_DURATION_MINUTES = 20;
const MAX_DEFAULT_START_TIME_MINUTES = MAX_TIME_MINUTES - DEFAULT_DURATION_MINUTES;
const DEFAULT_START_TIME = "10:00";
const DEFAULT_COLOR: ScheduleColorKey = "blue";
const DATE_OPTION_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const textStyle = {
  letterSpacing: "-0.02em",
};

const valueTextStyle = {
  ...textStyle,
  color: lightTheme.label.neutral,
};

const labelTextStyle = {
  ...textStyle,
  color: lightTheme.label.assistive,
};

const fieldButtonClassName =
  "flex h-[2.625rem] w-full cursor-pointer items-center rounded-[0.625rem] px-[0.9375rem] text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#41BE8E]/35";

const popoverClassName =
  "absolute left-0 top-[2.875rem] z-40 flex max-h-[10.5rem] w-full flex-col overflow-y-auto rounded-[0.625rem] border bg-white py-1 shadow-[0_0.375rem_1rem_rgba(0,0,0,0.12)]";

const optionClassName =
  "flex h-9 shrink-0 cursor-pointer items-center px-[0.9375rem] text-left font-['Pretendard'] text-[0.875rem] font-normal leading-[1.3] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#41BE8E]/35";

const padTimePart = (value: number) => String(value).padStart(2, "0");

const getTimeMinutes = (time: string) => {
  const [hour = "0", minute = "0"] = time.split(":");

  return Number(hour) * 60 + Number(minute);
};

const formatTime = (minutes: number, maxMinutes = MAX_TIME_MINUTES) => {
  const clampedMinutes = Math.min(maxMinutes, Math.max(MIN_TIME_MINUTES, minutes));
  const hour = Math.floor(clampedMinutes / 60);
  const minute = clampedMinutes % 60;

  return `${padTimePart(hour)}:${padTimePart(minute)}`;
};

const formatTimeFromHour = (hour: number, maxMinutes = MAX_TIME_MINUTES) =>
  formatTime(Math.round(Math.round(hour * 60) / TIME_STEP_MINUTES) * TIME_STEP_MINUTES, maxMinutes);

const getSteppedTime = (time: string, stepMinutes: number, maxMinutes = MAX_TIME_MINUTES) =>
  formatTime(getTimeMinutes(time) + stepMinutes, maxMinutes);

const getCurrentStepCeilMinutes = () => {
  const now = new Date();
  const currentMinutes =
    now.getHours() * 60 +
    now.getMinutes() +
    now.getSeconds() / 60 +
    now.getMilliseconds() / 60000;

  return Math.ceil(currentMinutes / TIME_STEP_MINUTES) * TIME_STEP_MINUTES;
};

const getDefaultStartTime = (date: string) => {
  if (date !== getTodayDateKey()) {
    return DEFAULT_START_TIME;
  }

  return formatTime(
    Math.min(
      MAX_DEFAULT_START_TIME_MINUTES,
      Math.max(getTimeMinutes(DEFAULT_START_TIME), getCurrentStepCeilMinutes())
    ),
    MAX_DEFAULT_START_TIME_MINUTES
  );
};

const getDefaultEndTime = (startTime: string) =>
  formatTime(getTimeMinutes(startTime) + DEFAULT_DURATION_MINUTES);

const getInitialDate = (initialDate: string, visibleWeekDateKeys: string[]) =>
  visibleWeekDateKeys.includes(initialDate) ? initialDate : visibleWeekDateKeys[0];

const formatDate = (date: string) => date.replaceAll("-", "/");

const getDateOptionLabel = (date: string) => {
  const day = DATE_OPTION_DAYS[parseDateKey(date).getDay()];

  return day ? `${formatDate(date)} ${day}` : formatDate(date);
};

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

const timeOptions = Array.from(
  { length: MAX_TIME_MINUTES / TIME_STEP_MINUTES + 1 },
  (_, index) => formatTime(index * TIME_STEP_MINUTES)
);

const scrollSelectedOptionIntoView = (
  listElement: HTMLDivElement | null,
  selectedElement: HTMLButtonElement | null
) => {
  if (!listElement || !selectedElement) {
    return;
  }

  listElement.scrollTop = Math.max(
    0,
    selectedElement.offsetTop - (listElement.clientHeight - selectedElement.offsetHeight) / 2
  );
};

const useSelectedOptionScroll = (isOpen: boolean, value: string) => {
  const listRef = useRef<HTMLDivElement>(null);
  const selectedOptionRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    scrollSelectedOptionIntoView(listRef.current, selectedOptionRef.current);
  }, [isOpen, value]);

  return { listRef, selectedOptionRef };
};

const DateField = ({
  isOpen,
  value,
  visibleWeekDateKeys,
  onSelect,
  onToggle,
}: DateFieldProps) => {
  const { listRef, selectedOptionRef } = useSelectedOptionScroll(isOpen, value);

  return (
    <div className="flex h-[4.5625rem] w-full flex-col items-end gap-3">
      <span
        className="h-[1.1875rem] w-[23.25rem] font-['Pretendard'] text-[1rem] font-medium leading-[1.3]"
        style={labelTextStyle}
      >
        예약 날짜
      </span>
      <div className="relative w-full">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-label="예약 날짜 선택"
          className={fieldButtonClassName}
          style={{ backgroundColor: lightTheme.background.neutral }}
          onClick={onToggle}
        >
          <span className="flex items-center gap-[0.375rem]">
            <img
              src={modalDateIcon}
              alt=""
              className="size-[1.3125rem] shrink-0"
              aria-hidden="true"
            />
            <span
              className="font-['Pretendard'] text-[0.875rem] font-normal leading-[1.3]"
              style={valueTextStyle}
            >
              {formatDate(value)}
            </span>
          </span>
        </button>

        {isOpen && (
          <div
            ref={listRef}
            className={popoverClassName}
            style={{ borderColor: lightTheme.line.alternative }}
          >
            {visibleWeekDateKeys.map(date => {
              const isSelected = date === value;

              return (
                <button
                  key={date}
                  ref={isSelected ? selectedOptionRef : undefined}
                  type="button"
                  className={optionClassName}
                  style={{
                    backgroundColor: isSelected ? lightTheme.background.neutral : "transparent",
                    color: isSelected ? lightTheme.primary.normal : lightTheme.label.alternative,
                    ...textStyle,
                  }}
                  onClick={() => onSelect(date)}
                >
                  {getDateOptionLabel(date)}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const TimeField = ({
  isOpen,
  label,
  maxMinutes,
  minMinutes,
  value,
  onChange,
  onToggle,
}: TimeFieldProps) => {
  const { listRef, selectedOptionRef } = useSelectedOptionScroll(isOpen, value);
  const options = timeOptions.filter(time => {
    const minutes = getTimeMinutes(time);

    return minutes >= minMinutes && minutes <= maxMinutes;
  });

  return (
    <div className="flex w-[11.375rem] flex-col items-end gap-3">
      <span
        className="h-[1.3125rem] w-[10.6875rem] font-['Pretendard'] text-[1rem] font-medium leading-[1.3]"
        style={labelTextStyle}
      >
        {label}
      </span>
      <div className="relative w-full">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-label={`${label} 선택`}
          className={`${fieldButtonClassName} pr-[2.75rem]`}
          style={{ backgroundColor: lightTheme.background.neutral }}
          onClick={onToggle}
        >
          <span className="flex items-center gap-[0.375rem]">
            <img
              src={modalTimeIcon}
              alt=""
              className="size-[1.3125rem] shrink-0"
              aria-hidden="true"
            />
            <span
              className="font-['Pretendard'] text-[0.875rem] font-normal leading-[1.3]"
              style={valueTextStyle}
            >
              {value}
            </span>
          </span>
        </button>

        <span className="absolute right-[0.8125rem] top-1/2 z-20 flex h-[1.625rem] w-4 -translate-y-1/2 flex-col items-start">
          <button
            type="button"
            aria-label={`${label} ${TIME_STEP_MINUTES}분 증가`}
            className="mb-[-0.375rem] flex size-4 shrink-0 cursor-pointer items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#41BE8E]/35"
            onClick={() => onChange(getSteppedTime(value, TIME_STEP_MINUTES, maxMinutes))}
          >
            <img src={dropdownUpIcon} alt="" className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={`${label} ${TIME_STEP_MINUTES}분 감소`}
            className="flex size-4 shrink-0 cursor-pointer items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#41BE8E]/35"
            onClick={() => onChange(getSteppedTime(value, -TIME_STEP_MINUTES, maxMinutes))}
          >
            <img src={dropdownDownIcon} alt="" className="size-4" aria-hidden="true" />
          </button>
        </span>

        {isOpen && (
          <div
            ref={listRef}
            className={popoverClassName}
            style={{ borderColor: lightTheme.line.alternative }}
          >
            {options.map(time => {
              const isSelected = time === value;

              return (
                <button
                  key={time}
                  ref={isSelected ? selectedOptionRef : undefined}
                  type="button"
                  className={optionClassName}
                  style={{
                    backgroundColor: isSelected ? lightTheme.background.neutral : "transparent",
                    color: isSelected ? lightTheme.primary.normal : lightTheme.label.alternative,
                    ...textStyle,
                  }}
                  onClick={() => onChange(time)}
                >
                  {time}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const DesignerField = ({ isOpen, value, onSelect, onToggle }: DesignerFieldProps) => {
  const { listRef, selectedOptionRef } = useSelectedOptionScroll(isOpen, value);
  const selectedDesigner =
    SCHEDULE_DESIGNERS.find(designer => designer.id === value) ?? SCHEDULE_DESIGNERS[0];

  return (
    <div className="flex h-[4.5625rem] w-full flex-col items-end gap-3">
      <span
        className="h-[1.1875rem] w-[23.25rem] font-['Pretendard'] text-[1rem] font-medium leading-[1.3]"
        style={labelTextStyle}
      >
        디자이너 선택
      </span>
      <div className="relative w-full">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-label="디자이너 선택"
          className={fieldButtonClassName}
          style={{ backgroundColor: lightTheme.background.neutral }}
          onClick={onToggle}
        >
          <span className="flex items-center gap-[0.375rem]">
            <img
              src={modalDropdownIcon}
              alt=""
              className="size-[1.8125rem] shrink-0"
              aria-hidden="true"
            />
            <span
              className="font-['Pretendard'] text-[0.875rem] font-normal leading-[1.3]"
              style={valueTextStyle}
            >
              {selectedDesigner?.name}
            </span>
          </span>
        </button>

        {isOpen && (
          <div
            ref={listRef}
            className={popoverClassName}
            style={{ borderColor: lightTheme.line.alternative }}
          >
            {SCHEDULE_DESIGNERS.map(designer => {
              const isSelected = designer.id === value;

              return (
                <button
                  key={designer.id}
                  ref={isSelected ? selectedOptionRef : undefined}
                  type="button"
                  className={optionClassName}
                  style={{
                    backgroundColor: isSelected ? lightTheme.background.neutral : "transparent",
                    color: isSelected ? lightTheme.primary.normal : lightTheme.label.alternative,
                    ...textStyle,
                  }}
                  onClick={() => onSelect(designer.id)}
                >
                  {designer.name}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const ScheduleModal = ({
  editingEvent,
  initialDate,
  visibleWeekDateKeys,
  onClose,
  onDelete,
  onSave,
}: ScheduleModalProps) => {
  const initialForm = useMemo(() => {
    const defaultDate = editingEvent?.date ?? getInitialDate(initialDate, visibleWeekDateKeys);
    const defaultStartTime = getDefaultStartTime(defaultDate);

    return {
      color: editingEvent?.color ?? DEFAULT_COLOR,
      date: defaultDate,
      designerId: editingEvent?.designerId ?? DEFAULT_SCHEDULE_DESIGNER_ID,
      endTime: editingEvent
        ? formatTimeFromHour(editingEvent.endHour)
        : getDefaultEndTime(defaultStartTime),
      startTime: editingEvent
        ? formatTimeFromHour(editingEvent.startHour, MAX_START_TIME_MINUTES)
        : defaultStartTime,
    };
  }, [editingEvent, initialDate, visibleWeekDateKeys]);
  const [openPopover, setOpenPopover] = useState<OpenPopover>(null);
  const [date, setDate] = useState(initialForm.date);
  const [startTime, setStartTime] = useState(initialForm.startTime);
  const [endTime, setEndTime] = useState(initialForm.endTime);
  const [designerId, setDesignerId] = useState(initialForm.designerId);
  const [color, setColor] = useState<ScheduleColorKey>(initialForm.color);
  const isEditMode = Boolean(editingEvent);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const closePopover = () => setOpenPopover(null);

  const togglePopover = (popover: OpenPopover) => {
    setOpenPopover(currentPopover => (currentPopover === popover ? null : popover));
  };

  const updateStartTime = (value: string) => {
    const nextStartTime = formatTime(getTimeMinutes(value), MAX_START_TIME_MINUTES);
    const nextStartMinutes = getTimeMinutes(nextStartTime);

    setStartTime(nextStartTime);
    setEndTime(currentEndTime =>
      getTimeMinutes(currentEndTime) <= nextStartMinutes
        ? formatTime(nextStartMinutes + DEFAULT_DURATION_MINUTES)
        : currentEndTime
    );
  };

  const updateEndTime = (value: string) => {
    const minEndMinutes = getTimeMinutes(startTime) + TIME_STEP_MINUTES;

    setEndTime(formatTime(Math.max(getTimeMinutes(value), minEndMinutes)));
  };

  const handleSelectDate = (value: string) => {
    setDate(value);
    closePopover();
  };

  const handleSelectDesigner = (value: string) => {
    setDesignerId(value);
    closePopover();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSave({
      id: editingEvent?.id,
      color,
      date,
      designerId,
      endTime,
      startTime,
    });
  };

  const handleBackdropMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onMouseDown={handleBackdropMouseDown}
    >
      <section
        className="relative h-[33.8125rem] w-[27.5rem] overflow-visible rounded-[1.25rem] bg-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="schedule-modal-title"
      >
        <form
          className="absolute left-[1.75rem] top-[1.875rem] flex w-[23.9375rem] flex-col items-end gap-[2.1875rem]"
          onSubmit={handleSubmit}
        >
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
                  className="flex size-7 cursor-pointer items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#41BE8E]/35"
                  onClick={onClose}
                >
                  <img src={modalCloseIcon} alt="" className="size-7" aria-hidden="true" />
                </button>
              </div>
              <div className="h-px w-full" style={{ backgroundColor: lightTheme.line.alternative }} />
            </div>

            <div className="flex w-full flex-col gap-5">
              <DateField
                isOpen={openPopover === "date"}
                value={date}
                visibleWeekDateKeys={visibleWeekDateKeys}
                onSelect={handleSelectDate}
                onToggle={() => togglePopover("date")}
              />

              <div className="flex w-full items-center gap-[1.1875rem]">
                <TimeField
                  isOpen={openPopover === "startTime"}
                  label="시작 시간"
                  maxMinutes={MAX_START_TIME_MINUTES}
                  minMinutes={MIN_TIME_MINUTES}
                  value={startTime}
                  onChange={updateStartTime}
                  onToggle={() => togglePopover("startTime")}
                />
                <TimeField
                  isOpen={openPopover === "endTime"}
                  label="끝 시간"
                  maxMinutes={MAX_TIME_MINUTES}
                  minMinutes={getTimeMinutes(startTime) + TIME_STEP_MINUTES}
                  value={endTime}
                  onChange={updateEndTime}
                  onToggle={() => togglePopover("endTime")}
                />
              </div>

              <div className="flex h-[4.5625rem] w-full flex-col items-end gap-3">
                <span
                  className="h-[1.1875rem] w-[23.25rem] font-['Pretendard'] text-[1rem] font-medium leading-[1.3]"
                  style={labelTextStyle}
                >
                  색상 선택
                </span>
                <div className="flex h-[2.625rem] w-full items-center gap-[0.5625rem]">
                  {SCHEDULE_COLOR_OPTIONS.map(colorOption => (
                    <button
                      key={colorOption}
                      type="button"
                      aria-label={`${colorOption} 스케줄 색상`}
                      aria-pressed={colorOption === color}
                      className="size-[2.625rem] cursor-pointer rounded-full outline-none transition-shadow hover:ring-2 hover:ring-[#41BE8E]/20 focus-visible:ring-2 focus-visible:ring-[#41BE8E]/35"
                      style={{
                        backgroundColor: getSwatchColor(colorOption),
                        boxShadow:
                          colorOption === color
                            ? `inset 0 0 0 0.125rem ${lightTheme.primary.normal}`
                            : undefined,
                      }}
                      onClick={() => setColor(colorOption)}
                    />
                  ))}
                </div>
              </div>

              <DesignerField
                isOpen={openPopover === "designer"}
                value={designerId}
                onSelect={handleSelectDesigner}
                onToggle={() => togglePopover("designer")}
              />
            </div>
          </div>

          <div className="flex w-full items-center justify-between">
            {isEditMode ? (
              <button
                type="button"
                className="flex h-8 w-[3.75rem] cursor-pointer items-center justify-center rounded-[0.375rem] px-[0.625rem] py-1 font-['Pretendard'] text-[1rem] font-semibold leading-[1.3] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#41BE8E]/35"
                style={{
                  ...textStyle,
                  backgroundColor: palette.red[60],
                  color: lightTheme.fill.normal,
                }}
                onClick={() => editingEvent && onDelete(editingEvent.id)}
              >
                삭제
              </button>
            ) : (
              <span />
            )}

            <div className="flex items-center gap-[0.375rem]">
              <button
                type="button"
                className="flex h-8 w-[3.75rem] cursor-pointer items-center justify-center rounded-[0.375rem] px-[0.625rem] py-1 font-['Pretendard'] text-[1rem] font-semibold leading-[1.3] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#41BE8E]/35"
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
                type="submit"
                className="flex h-8 w-[3.75rem] cursor-pointer items-center justify-center rounded-[0.375rem] px-[0.625rem] py-1 font-['Pretendard'] text-[1rem] font-semibold leading-[1.3] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#41BE8E]/35"
                style={{
                  ...textStyle,
                  backgroundColor: lightTheme.primary.normal,
                  color: lightTheme.fill.normal,
                }}
              >
                저장
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export { ScheduleModal };
