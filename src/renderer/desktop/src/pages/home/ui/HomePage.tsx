import { lightTheme } from "@design-tokens";

import {
  CustomerGradeCard,
  DashboardCanvas,
  ReservationStatusCard,
  RevenueChart,
  SummaryCards,
} from "@/pages/home/ui/components";
import { useHomeDashboard } from "@/pages/home/model/useHomeDashboard";
import { DESKTOP_PAGE_LAYOUT_OFFSET_REM } from "@/shared/constants/Layout.constant";

const HomePage = () => {
  const { viewModel, isLoading } = useHomeDashboard();

  return (
    <div
      data-dashboard-page
      className="relative h-full w-full overflow-hidden"
      style={{
        backgroundColor: lightTheme.background.alternative,
        paddingBottom: `${DESKTOP_PAGE_LAYOUT_OFFSET_REM.bottom}rem`,
        paddingLeft: `${DESKTOP_PAGE_LAYOUT_OFFSET_REM.left}rem`,
        paddingRight: `${DESKTOP_PAGE_LAYOUT_OFFSET_REM.right}rem`,
        paddingTop: `${DESKTOP_PAGE_LAYOUT_OFFSET_REM.top}rem`,
      }}
    >
      {isLoading && (
        <div
          className="pointer-events-none absolute right-10 top-8 z-20 rounded-full px-4 py-2 font-['Pretendard'] text-[14px] font-medium leading-[1.3]"
          style={{
            backgroundColor: lightTheme.background.normal,
            boxShadow: `0 0 4px color-mix(in srgb, ${lightTheme.label.strong} 8%, transparent)`,
            color: lightTheme.label.assistive,
          }}
        >
          대시보드 정보를 불러오는 중입니다
        </div>
      )}
      <DashboardCanvas>
        <div className="flex h-full w-full flex-col gap-4">
          <div className="flex gap-4">
            <div className="min-w-0" style={{ flex: "836 1 0" }}>
              <RevenueChart data={viewModel.revenueChart} />
            </div>
            <div className="min-w-[508px]" style={{ flex: "508 1 0" }}>
              <SummaryCards cards={viewModel.summaryCards} />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-[573px] shrink-0">
              <CustomerGradeCard
                grades={viewModel.customerGrades}
                totalCustomerCount={viewModel.totalCustomerCount}
              />
            </div>
            <div className="min-w-0 flex-1 basis-[772px]">
              <ReservationStatusCard reservations={viewModel.reservations} />
            </div>
          </div>
        </div>
      </DashboardCanvas>
    </div>
  );
};

export { HomePage };
