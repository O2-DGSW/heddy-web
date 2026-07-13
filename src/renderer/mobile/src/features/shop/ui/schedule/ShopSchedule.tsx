import { Calendar } from "@/shared/ui/calendar";
import { useShopSchedule } from "@/features/shop/model/useShopSchedule.ts";
import { SHOP_SCHEDULE_WEEK_DAYS } from "@/features/shop/constrants/schedule-calendar";
import { font, lightTheme } from "@design-tokens";
import { ScheduleBox } from "@/features/shop/ui/schedule/ScheduleBox.tsx";

const ShopSchedule = () => {
  const {
    selectedDate,
    setSelectedDate,
    viewMode,
    setViewMode,
    targetDateStr,
    filteredReservations,
    shopScheduleData,
  } = useShopSchedule();

  return (
    <section className="h-full overflow-hidden bg-white pt-[19px]">
      <Calendar
        initialMonthDate={targetDateStr}
        markerMap={{}}
        selectedDate={String(selectedDate)}
        variant="mobile"
        viewMode={viewMode}
        weekDays={SHOP_SCHEDULE_WEEK_DAYS}
        className="mx-auto max-w-[393px]"
        onChangeViewMode={setViewMode}
        onSelectDate={setSelectedDate}
        tabs={false}
      />
      <div
        className="flex flex-col h-full p-[1rem]"
        style={{ backgroundColor: lightTheme.fill.normal }}
      >
        <p className={`${font.headline1.bold} mb-[0.5rem]`}>
          {targetDateStr.slice(5, 7)}월 {targetDateStr.slice(8, 10)}일
        </p>
        <div className="flex flex-col gap-[1rem]">
          {filteredReservations.length > 0 ? (
            filteredReservations.map(reservation => {
              return (
                <ScheduleBox
                  key={reservation.reservation_id}
                  title={reservation.memo || "메모 없음"}
                  startTime={shopScheduleData?.data?.start_time || "00:00"}
                  endTime={shopScheduleData?.data?.end_time || "00:00"}
                />
              );
            })
          ) : (
            <p className={`${font.body?.regular} text-gray-400 text-center py-[2rem]`}>
              해당 날짜에 예약 일정이 없습니다.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export { ShopSchedule };
