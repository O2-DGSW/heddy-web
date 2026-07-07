import { font, lightTheme } from "@design-tokens";
import type { ReservationStatus } from "@/features/shop/model/types/Reservation.types";
import { useReservationStatusDropdown } from "@/features/shop/model/useResevationStatusDropdown.ts";
import { STATUS_CONFIG } from "@/features/shop/constrants/status-config.ts"; // 위에서 만든 훅 임포트

const DROPDOWN_OPTIONS: ReservationStatus[] = ["approve", "reject", "time-change"];

interface ReservationStatusDropdownProps {
  value: ReservationStatus;
  onChange: (status: ReservationStatus) => void;
}

export const ReservationStatusDropdown = ({ value, onChange }: ReservationStatusDropdownProps) => {
  const { isOpen, containerRef, toggleDropdown, closeDropdown } = useReservationStatusDropdown();

  const { label, bgColor } = STATUS_CONFIG[value];

  return (
    <div ref={containerRef} className="relative shrink-0">
      {/* 상태 표시 및 트리거 버튼 */}
      <button
        className={`flex items-center justify-center gap-1 w-20 py-1 rounded-full ${font.caption.semiBold}`}
        style={{ backgroundColor: bgColor, color: lightTheme.label.buttonText }}
        onClick={toggleDropdown} // 💡 주석 해제 및 함수 연결
      >
        {label}
      </button>

      {/* 옵션 리스트 */}
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
                  closeDropdown();
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
