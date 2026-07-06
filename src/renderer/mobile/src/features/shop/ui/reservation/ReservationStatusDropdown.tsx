import { useEffect, useRef, useState } from "react";
import { font, lightTheme } from "@design-tokens";
import type { ReservationStatus } from "@/features/shop/model/types/Reservation.types";

export const STATUS_CONFIG: Record<ReservationStatus, { label: string; bgColor: string }> = {
  approve: {
    label: "승인",
    bgColor: lightTheme.primary.normal,
  },
  reject: {
    label: "거절",
    bgColor: lightTheme.status.error,
  },
  "time-change": {
    label: "시간변경",
    bgColor: lightTheme.status.warning,
  },
  pending: {
    label: "대기",
    bgColor: lightTheme.fill.neutral,
  },
  canceled: {
    label: "취소",
    bgColor: lightTheme.line.normal,
  },
  visited: {
    label: "방문완료",
    bgColor: "#10B981",
  },
  "no-show": {
    label: "노쇼",
    bgColor: "#EF4444",
  },
};

const DROPDOWN_OPTIONS: ReservationStatus[] = ["approve", "reject", "time-change"];

interface ReservationStatusDropdownProps {
  value: ReservationStatus;
  onChange: (status: ReservationStatus) => void;
}

export const ReservationStatusDropdown = ({ value, onChange }: ReservationStatusDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const { label, bgColor } = STATUS_CONFIG[value];

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        className={`flex items-center justify-center gap-1 w-20 py-1 rounded-full ${font.caption.semiBold}`}
        style={{ backgroundColor: bgColor, color: lightTheme.label.buttonText }}
        // onClick={() => setIsOpen(prev => !prev)}
      >
        {label}
      </button>

      {isOpen && (
        <ul
          className="absolute right-0 top-full mt-1 w-28 rounded-xl overflow-hidden z-10"
          style={{
            backgroundColor: lightTheme.background.normal,
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          }}
        >
          {DROPDOWN_OPTIONS.map(option => (
            <li key={option}>
              <button
                className={`w-full flex items-center gap-1.5 px-4 py-2.5 ${font.label.regular}`}
                style={{ color: lightTheme.label.neutral }}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {value === option && <span style={{ color: lightTheme.primary.normal }}>✓</span>}
                {STATUS_CONFIG[option].label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
