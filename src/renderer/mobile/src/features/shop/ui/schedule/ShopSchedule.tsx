import { Calendar } from "@/shared/ui/calendar";

import { useShopSchedule } from "@/features/shop/model/useShopSchedule.ts";

import {
  DEFAULT_SHOP_SCHEDULE_DATE,
  SHOP_SCHEDULE_MARKER_MAP,
  SHOP_SCHEDULE_WEEK_DAYS,
} from "@/features/shop/constrants/schedule-calendar";
import { font, lightTheme } from "@design-tokens";
import { ScheduleBox } from "@/features/shop/ui/schedule/ScheduleBox.tsx";

const ShopSchedule = () => {
  const { selectedDate, setSelectedDate, viewMode, setViewMode, shopScheduleData } =
    useShopSchedule();

  return (
    <section className="h-full overflow-hidden bg-white">
      <Calendar
        initialMonthDate={DEFAULT_SHOP_SCHEDULE_DATE}
        markerMap={SHOP_SCHEDULE_MARKER_MAP}
        selectedDate={selectedDate}
        variant="mobile"
        viewMode={viewMode}
        weekDays={SHOP_SCHEDULE_WEEK_DAYS}
        className="mx-auto max-w-[393px]"
        onChangeViewMode={setViewMode}
        onSelectDate={setSelectedDate}
      />
      <div
        className="flex flex-col h-full p-[1rem]"
        style={{ backgroundColor: lightTheme.fill.normal }}
      >
        <p className={`${font.headline1.bold} mb-[0.5rem]`}>
          {selectedDate.slice(6, 7)}월 {selectedDate.slice(8, 10)}일
        </p>
        <div className="flex flex-col gap-[1rem]">
          <ScheduleBox
            title={"용용용"}
            startTime={shopScheduleData?.data?.start_time || "00:00"}
            endTime={shopScheduleData?.data?.end_time || "00:00"}
          />
        </div>
      </div>
    </section>
  );
};

export { ShopSchedule };
