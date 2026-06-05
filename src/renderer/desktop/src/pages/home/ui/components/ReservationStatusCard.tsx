import { lightTheme } from "@design-tokens";

import { reservationGridTemplate, reservations } from "@/pages/home/model/homeDashboardData";
import {
  DashboardCard,
  DropdownIcon,
  MoreButton,
  SelectPill,
} from "@/pages/home/ui/components/DashboardPrimitives";

const StatusButton = () => (
  <button
    type="button"
    className="flex h-[26px] min-w-[55.714px] items-center justify-center overflow-hidden whitespace-nowrap rounded-full pl-[9.905px] pr-[2.476px] font-['Pretendard'] text-[14.86px] font-medium leading-[1.3] tracking-normal"
    style={{
      backgroundColor: lightTheme.status.error,
      color: lightTheme.label.buttonText,
    }}
  >
    <span className="mr-[-2.476px]">거절</span>
    <DropdownIcon color={lightTheme.label.buttonText} className="size-[19.81px]" />
  </button>
);

const RadioDot = ({ selected }: { selected: boolean }) => (
  <svg
    aria-hidden="true"
    className="size-[14px] shrink-0"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7ZM3.5424 7C3.5424 8.90958 5.09042 10.4576 7 10.4576C8.90958 10.4576 10.4576 8.90958 10.4576 7C10.4576 5.09042 8.90958 3.5424 7 3.5424C5.09042 3.5424 3.5424 5.09042 3.5424 7Z"
      fill={selected ? lightTheme.primary.normal : lightTheme.line.normal}
    />
  </svg>
);

const ReservationStatusCard = () => (
  <DashboardCard className="h-[407px] w-full overflow-hidden">
    <div className="flex h-[77px] items-center justify-between px-[31px]">
      <h2
        className="font-['Pretendard'] text-[20px] font-bold leading-[1.3] tracking-normal"
        style={{ color: lightTheme.label.neutral }}
      >
        예약 현황
      </h2>
      <MoreButton />
    </div>

    <div className="h-[316px] overflow-hidden">
      <div className="w-full min-w-[772px]">
        <div className="h-9" style={{ backgroundColor: lightTheme.fill.neutral }}>
          <div
            className="mx-[26.5px] grid h-full items-center text-center font-['Pretendard'] text-[18px] font-medium leading-[1.3] tracking-normal"
            style={{
              color: lightTheme.label.assistive,
              columnGap: "60px",
              gridTemplateColumns: reservationGridTemplate,
            }}
          >
            <span className="w-[72px]">시간</span>
            <span className="w-12">고객명</span>
            <span className="w-[225px]">시술</span>
            <span className="w-[78px]">디자이너</span>
            <span className="w-[55.71px]">상태</span>
          </div>
        </div>

        {reservations.map((reservation, index) => (
          <div
            key={`${reservation.time}-${index}`}
            className="h-14 border-b"
            style={{ borderColor: lightTheme.background.neutral }}
          >
            <div
              className="mx-[27px] grid h-full items-center text-center font-['Pretendard'] text-[18px] leading-[1.3] tracking-normal"
              style={{
                color: lightTheme.label.assistive,
                columnGap: "60px",
                gridTemplateColumns: reservationGridTemplate,
              }}
            >
              <div className="flex w-[72px] items-center gap-2.5">
                <RadioDot selected={reservation.selected} />
                <span className="font-semibold">{reservation.time}</span>
              </div>
              <span className="w-12 font-semibold">{reservation.customer}</span>
              <span className="w-[225px] font-semibold">{reservation.procedure}</span>
              <div className="flex w-[78px] justify-center">
                <SelectPill label={reservation.designer} className="w-[78px]" />
              </div>
              <div className="flex w-[55.71px] justify-center">
                <StatusButton />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </DashboardCard>
);

export { ReservationStatusCard };
