import { useState } from "react";

import { Calendar } from "@/shared/ui/calendar";

import {
  DEFAULT_SHOP_SCHEDULE_DATE,
  SHOP_SCHEDULE_MARKER_MAP,
  SHOP_SCHEDULE_WEEK_DAYS,
} from "@/features/shop/constrants/schedule-calendar";

const ShopSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(DEFAULT_SHOP_SCHEDULE_DATE);
  const [viewMode, setViewMode] = useState<"month" | "week">("month");

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
    </section>
  );
};

export { ShopSchedule };
