import { useEffect, useMemo, useRef, useState } from "react";
import { lightTheme } from "@design-tokens";

import { addMonthsToMonthKey, formatMonthLabel } from "../model/date";
import { getClassName } from "./className";
import { DropdownIcon } from "./DropdownIcon";

const MONTH_OPTION_RANGE = 12;
const MONTH_OPTION_LOAD_SIZE = 12;

interface CalendarMonthSelectorProps {
  buttonClassName: string;
  buttonColor?: string;
  displayedMonthDate: string;
  iconClassName: string;
  labelClassName: string;
  menuClassName?: string;
  onChangeMonth: (date: string) => void;
}

const CalendarMonthSelector = ({
  buttonClassName,
  buttonColor = lightTheme.label.neutral,
  displayedMonthDate,
  iconClassName,
  labelClassName,
  menuClassName,
  onChangeMonth,
}: CalendarMonthSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pastOptionRange, setPastOptionRange] = useState(MONTH_OPTION_RANGE);
  const [futureOptionRange, setFutureOptionRange] = useState(MONTH_OPTION_RANGE);
  const selectorRef = useRef<HTMLDivElement>(null);
  const currentOptionRef = useRef<HTMLButtonElement>(null);
  const monthOptions = useMemo(
    () =>
      Array.from({ length: pastOptionRange + futureOptionRange + 1 }, (_, index) =>
        addMonthsToMonthKey(displayedMonthDate, index - pastOptionRange)
      ),
    [displayedMonthDate, futureOptionRange, pastOptionRange]
  );
  const displayedMonthLabel = formatMonthLabel(displayedMonthDate);

  useEffect(() => {
    if (isOpen) {
      currentOptionRef.current?.scrollIntoView({ block: "center" });
    }
  }, [displayedMonthDate, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!selectorRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  const handleChangeMonth = (date: string) => {
    onChangeMonth(date);
    setIsOpen(false);
  };

  const showPreviousMonths = () => {
    setPastOptionRange(range => range + MONTH_OPTION_LOAD_SIZE);
  };

  const showNextMonths = () => {
    setFutureOptionRange(range => range + MONTH_OPTION_LOAD_SIZE);
  };

  return (
    <div ref={selectorRef} className="relative w-fit">
      <button
        type="button"
        aria-label={`${displayedMonthLabel} 월 선택`}
        className={getClassName("cursor-pointer", buttonClassName)}
        style={{ color: buttonColor }}
        onClick={() => setIsOpen(open => !open)}
      >
        <span className={labelClassName}>{displayedMonthLabel}</span>
        <DropdownIcon className={iconClassName} />
      </button>

      {isOpen && (
        <div
          className={getClassName(
            "absolute left-0 top-full z-20 mt-2 flex max-h-[14.25rem] w-[10.75rem] flex-col overflow-y-auto rounded-[12px] border bg-white py-1 shadow-[0_4px_14px_rgba(0,0,0,0.12)]",
            menuClassName
          )}
          style={{ borderColor: lightTheme.line.alternative }}
        >
          <button
            type="button"
            aria-label="이전 달 더보기"
            className="h-9 shrink-0 cursor-pointer border-b px-4 text-left font-['Pretendard'] text-[13px] font-semibold leading-[1.3] tracking-[-0.26px]"
            style={{
              borderColor: lightTheme.line.alternative,
              backgroundColor: lightTheme.background.neutral,
              color: lightTheme.primary.normal,
            }}
            onClick={showPreviousMonths}
          >
            이전 더보기
          </button>
          {monthOptions.map(monthDate => {
            const isCurrent = monthDate === displayedMonthDate;

            return (
              <button
                key={monthDate}
                ref={isCurrent ? currentOptionRef : undefined}
                type="button"
                aria-label={`${formatMonthLabel(monthDate)}로 이동`}
                className="h-10 shrink-0 cursor-pointer px-4 text-left font-['Pretendard'] text-[14px] font-medium leading-[1.3] tracking-[-0.28px]"
                style={{
                  backgroundColor: isCurrent ? lightTheme.background.neutral : "transparent",
                  color: isCurrent ? lightTheme.primary.normal : lightTheme.label.alternative,
                }}
                onClick={() => handleChangeMonth(monthDate)}
              >
                {formatMonthLabel(monthDate)}
              </button>
            );
          })}
          <button
            type="button"
            aria-label="다음 달 더보기"
            className="h-9 shrink-0 cursor-pointer border-t px-4 text-left font-['Pretendard'] text-[13px] font-semibold leading-[1.3] tracking-[-0.26px]"
            style={{
              borderColor: lightTheme.line.alternative,
              backgroundColor: lightTheme.background.neutral,
              color: lightTheme.primary.normal,
            }}
            onClick={showNextMonths}
          >
            다음 더보기
          </button>
        </div>
      )}
    </div>
  );
};

export { CalendarMonthSelector };
