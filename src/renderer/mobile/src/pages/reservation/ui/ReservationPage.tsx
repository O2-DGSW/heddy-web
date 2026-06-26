import { font, lightTheme } from "@design-tokens";
import { Reservation } from "@/features/reservation/ui/Reservation.tsx";

export const ReservationPage = () => {
  return (
    <div
      className="h-screen flex flex-col overflow-hidden" // 1. 전체 화면을 Flex-col로 설정하고 바깥 스크롤을 막음
      style={{ backgroundColor: lightTheme.background.normal }}
    >
      {/* 헤더 (고정) */}
      <p
        className={`${font.headline1.bold} text-center py-[1rem] flex-shrink-0`} // 2. flex-shrink-0으로 헤더 영역이 찌그러지지 않게 보호
        style={{ color: lightTheme.label.neutral }}
      >
        예약하기
      </p>

      {/* Reservation 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto pb-[2rem]">
        {/* 3. 남은 공간(flex-1)을 모두 차지하며 세로 스크롤(overflow-y-auto) 생성 */}
        <Reservation />
      </div>
    </div>
  );
};
