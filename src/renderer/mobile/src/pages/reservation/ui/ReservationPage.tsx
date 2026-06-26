import { font, lightTheme } from "@design-tokens";
import { Reservation } from "@/features/reservation/ui/Reservation.tsx";

export const ReservationPage = () => {
  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: lightTheme.background.normal }}
    >
      {/* 헤더 (고정) */}
      <p
        className={`${font.headline1.bold} text-center py-[1rem] flex-shrink-0`}
        style={{ color: lightTheme.label.neutral }}
      >
        예약하기
      </p>
      {/* Reservation 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto pb-[2rem]">
        <Reservation />
      </div>
    </div>
  );
};
