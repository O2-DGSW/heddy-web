import { Calendar } from "@/shared/ui/calendar";
import { useShopSchedule } from "@/features/shop/model/useShopSchedule.ts";
import {
  DEFAULT_SHOP_SCHEDULE_DATE,
  SHOP_SCHEDULE_WEEK_DAYS,
} from "@/features/shop/constrants/schedule-calendar";
import { font, lightTheme } from "@design-tokens";
import { ScheduleBox } from "@/features/shop/ui/schedule/ScheduleBox.tsx";
import { useGetShopReservationManageQuery } from "@/entities/shop/api/query/useShopReservationManage.query.ts";
import { useGetMyProfileQuery } from "@/entities/profile/api/query/useGetMyProfile.query.ts";

const ShopSchedule = () => {
  const { selectedDate, setSelectedDate, viewMode, setViewMode, shopScheduleData } =
    useShopSchedule();

  const formatToDashString = (dateInput: Date | string) => {
    if (!dateInput) return "";
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return "";

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const myInfo = useGetMyProfileQuery();
  const shopId = myInfo?.data?.shopMembers?.[0]?.shopId;
  const userId = myInfo?.data?.userId;

  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 1);

  const formattedToday = formatToDashString(today);
  const formattedNextMonth = formatToDashString(nextMonth);

  const reservationManagementData = useGetShopReservationManageQuery(
    {
      shop_id: shopId ?? 0,
      designer_id: userId ?? 0,
      date: formattedToday,
      end_date: formattedNextMonth,
      status: "",
    },
    {
      enabled: typeof shopId === "number" && typeof userId === "number",
    }
  );

  const targetDateStr = formatToDashString(selectedDate);

  const filteredReservations =
    reservationManagementData?.data?.reservations?.filter(reservation => {
      const reservationDateStr = formatToDashString(reservation.reserved_at);
      return reservationDateStr === targetDateStr;
    }) || [];

  return (
    <section className="h-full overflow-hidden bg-white pt-[19px]">
      <Calendar
        initialMonthDate={DEFAULT_SHOP_SCHEDULE_DATE}
        markerMap={{}}
        selectedDate={selectedDate}
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
              const startTime = reservation.reserved_at?.slice(11, 16) || "00:00";

              return (
                <ScheduleBox
                  key={reservation.reservation_id}
                  title={reservation.memo || "메모 없음"}
                  startTime={startTime}
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
