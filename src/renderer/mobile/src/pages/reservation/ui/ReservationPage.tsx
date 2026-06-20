import { font, lightTheme } from "@design-tokens";
import { Calendar } from "@/shared/ui/calendar";
import { useState } from "react";
import {
  DEFAULT_SHOP_SCHEDULE_DATE,
  SHOP_SCHEDULE_MARKER_MAP,
  SHOP_SCHEDULE_WEEK_DAYS,
} from "@/features/shop/constrants/schedule-calendar.ts";

export const ReservationPage = () => {
  const [selectedDate, setSelectedDate] = useState(DEFAULT_SHOP_SCHEDULE_DATE);

  return (
    <>
      <p
        className={`${font.headline1.bold} text-center py-[1rem]`}
        style={{ color: lightTheme.label.neutral }}
      >
        예약하기
      </p>
      <Calendar
        initialMonthDate={DEFAULT_SHOP_SCHEDULE_DATE}
        markerMap={SHOP_SCHEDULE_MARKER_MAP}
        selectedDate={selectedDate}
        variant="mobile"
        viewMode="week"
        weekDays={SHOP_SCHEDULE_WEEK_DAYS}
        className="mx-auto max-w-[393px]"
        onSelectDate={setSelectedDate}
      />
    </>
  );
};
