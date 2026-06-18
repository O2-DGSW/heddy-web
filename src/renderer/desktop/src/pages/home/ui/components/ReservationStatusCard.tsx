import { lightTheme } from "@design-tokens";

import { reservations } from "@/pages/home/model/homeDashboardData";
import {
  DashboardCard,
  DropdownIcon,
  MoreButton,
  SelectPill,
} from "@/pages/home/ui/components/DashboardPrimitives";

const RESERVATION_GRID_COLUMNS = "72px 48px 225px 78px 55.714px";

const StatusButton = () => (
  <button
    type="button"
    className="flex h-[26px] w-[55.714px] items-center justify-center overflow-hidden whitespace-nowrap rounded-[15px] pl-[9.905px] pr-[2.476px] font-['Pretendard'] text-[14.86px] font-medium leading-[1.3] tracking-[-0.2972px]"
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
  <DashboardCard className="relative h-[407px] w-full overflow-hidden">
    <div className="absolute left-[31px] right-[31px] top-[31px] flex h-[26px] items-center justify-between">
      <h2
        className="flex w-[76px] flex-col justify-center font-['Pretendard'] text-[20px] font-bold leading-[1.3] tracking-[-0.4px]"
        style={{ color: lightTheme.label.neutral }}
      >
        예약 현황
      </h2>
      <MoreButton />
    </div>

    <div className="absolute left-0 right-0 top-[77px] h-[316px] overflow-hidden">
      <div className="w-full">
        <div className="relative h-9" style={{ backgroundColor: lightTheme.label.disable }}>
          <div
            className="absolute left-[22.145px] right-[23.145px] top-1.5 grid items-center justify-between gap-x-[62px] font-['Pretendard'] text-[18px] font-medium leading-[1.3] tracking-[-0.36px]"
            style={{
              color: lightTheme.label.assistive,
              gridTemplateColumns: RESERVATION_GRID_COLUMNS,
            }}
          >
            <span className="w-[72px] text-center">시간</span>
            <span className="w-12">고객명</span>
            <span className="w-[225px] text-center">시술</span>
            <span className="w-[78px] text-center">디자이너</span>
            <span className="w-[55.71px] text-center">상태</span>
          </div>
        </div>

        {reservations.map((reservation, index) => (
          <div
            key={`${reservation.time}-${index}`}
            className="relative h-14 border-b"
            style={{ borderColor: lightTheme.background.neutral }}
          >
            <div
              className="absolute left-[27px] right-[26.286px] top-[15px] grid h-[26px] items-center justify-between gap-x-[60px] font-['Pretendard'] text-[18px] font-semibold leading-[1.3] tracking-[-0.36px]"
              style={{
                color: lightTheme.label.assistive,
                gridTemplateColumns: RESERVATION_GRID_COLUMNS,
              }}
            >
              <div className="flex h-[23px] w-[72px] items-center gap-2.5">
                <RadioDot selected={reservation.selected} />
                <span className="flex w-12 flex-col justify-center">{reservation.time}</span>
              </div>
              <span className="flex w-12 flex-col justify-center">{reservation.customer}</span>
              <span className="flex w-[225px] flex-col justify-center text-center">
                {reservation.procedure}
              </span>
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
