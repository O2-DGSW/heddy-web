import { lightTheme } from "@design-tokens";

import closeIcon from "@/pages/schedule/assets/svg/close.svg";
import dropdownDownIcon from "@/pages/schedule/assets/svg/dropdown-down.svg";
import dropdownUpIcon from "@/pages/schedule/assets/svg/dropdown-up.svg";
import timeIcon from "@/pages/reservation/assets/svg/time.svg";
import type { ReservationTimeChangeModalProps } from "@/pages/reservation/model/Reservation.types";

interface TimeFieldProps {
  label: string;
  value: string;
  options: string[];
  isMenuOpen: boolean;
  onToggle: () => void;
  onSelect: (time: string) => void;
}

const TimeField = ({
  label,
  value,
  options,
  isMenuOpen,
  onToggle,
  onSelect,
}: TimeFieldProps) => {
  return (
    <div className="relative flex w-[11.375rem] flex-col gap-3">
      <span
        className="pl-[0.6875rem] font-['Pretendard'] text-[1rem] font-medium leading-[1.3]"
        style={{ color: lightTheme.label.assistive }}
      >
        {label}
      </span>

      <button
        type="button"
        className="flex h-[2.625rem] items-center justify-between rounded-[0.625rem] px-[1rem]"
        style={{ backgroundColor: lightTheme.background.neutral }}
        onClick={onToggle}
      >
        <span className="flex items-center gap-[0.375rem]">
          <span className="flex shrink-0 items-center justify-center" style={{ color: lightTheme.label.assistive }}>
            <img src={timeIcon} alt="" className="size-[1.3125rem] shrink-0" aria-hidden="true" />
          </span>
          <span
            className="font-['Pretendard'] text-[0.875rem] font-normal leading-[1.3]"
            style={{ color: lightTheme.label.assistive }}
          >
            {value}
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

      {isMenuOpen ? (
        <div
          className="absolute left-0 top-[5.375rem] z-10 flex max-h-[12rem] w-full flex-col overflow-y-auto rounded-[0.75rem] border bg-white py-[0.25rem] shadow-[0_0_0.5rem_rgba(0,0,0,0.08)]"
          style={{ borderColor: lightTheme.line.alternative }}
        >
          {options.map(option => (
            <button
              key={option}
              type="button"
              className="flex h-[2rem] items-center justify-center font-['Pretendard'] text-[0.875rem] font-medium leading-[1.3]"
              style={{
                color: option === value ? lightTheme.primary.normal : lightTheme.label.alternative,
              }}
              onClick={() => onSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

const ReservationTimeChangeModal = ({
  timeOptions,
  currentTime,
  changedTime,
  isCurrentTimeMenuOpen,
  isChangedTimeMenuOpen,
  onToggleCurrentTimeMenu,
  onToggleChangedTimeMenu,
  onSelectCurrentTime,
  onSelectChangedTime,
  onClose,
  onSave,
}: ReservationTimeChangeModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <section
        className="w-[27.5rem] overflow-hidden rounded-[1.25rem] bg-white shadow-[0_0_0.5rem_rgba(0,0,0,0.08)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-time-change-title"
      >
        <div className="flex flex-col px-[1.75rem] py-[1.875rem]">
          <div className="flex flex-col gap-[0.5625rem]">
            <div className="flex items-center justify-between">
              <h2
                id="reservation-time-change-title"
                className="font-['Pretendard'] text-[1.25rem] font-semibold leading-[1.3]"
                style={{ color: lightTheme.label.neutral }}
              >
                시간 변경
              </h2>

              <button
                type="button"
                aria-label="시간 변경 모달 닫기"
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

          <div className="mt-[2.0625rem] flex items-start gap-[1.1875rem]">
            <TimeField
              label="기존 시간"
              value={currentTime}
              options={timeOptions}
              isMenuOpen={isCurrentTimeMenuOpen}
              onToggle={onToggleCurrentTimeMenu}
              onSelect={onSelectCurrentTime}
            />
            <TimeField
              label="변경 시간"
              value={changedTime}
              options={timeOptions}
              isMenuOpen={isChangedTimeMenuOpen}
              onToggle={onToggleChangedTimeMenu}
              onSelect={onSelectChangedTime}
            />
          </div>

          <div className="mt-[1.75rem] flex items-center justify-end gap-[0.375rem]">
            <button
              type="button"
              className="flex h-8 w-[3rem] items-center justify-center rounded-[0.375rem] font-['Pretendard'] text-[1rem] font-normal leading-[1.3]"
              style={{
                backgroundColor: lightTheme.background.neutral,
                color: lightTheme.line.normal,
              }}
              onClick={onClose}
            >
              취소
            </button>
            <button
              type="button"
              className="flex h-8 w-[3rem] items-center justify-center rounded-[0.375rem] font-['Pretendard'] text-[1rem] font-normal leading-[1.3]"
              style={{
                backgroundColor: lightTheme.primary.normal,
                color: lightTheme.fill.normal,
              }}
              onClick={onSave}
            >
              저장
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export { ReservationTimeChangeModal };
