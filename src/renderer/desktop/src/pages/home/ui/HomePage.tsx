import { lightTheme } from "@design-tokens";

import {
  CustomerGradeCard,
  DashboardCanvas,
  ReservationStatusCard,
  RevenueChart,
  SummaryCards,
} from "@/pages/home/ui/components";
import { DESKTOP_PAGE_LAYOUT_OFFSET_REM } from "@/shared/constants/Layout.constant";

const HomePage = () => {
  return (
    <div
      data-dashboard-page
      className="h-full w-full overflow-hidden"
      style={{
        backgroundColor: lightTheme.background.alternative,
        paddingBottom: `${DESKTOP_PAGE_LAYOUT_OFFSET_REM.bottom}rem`,
        paddingLeft: `${DESKTOP_PAGE_LAYOUT_OFFSET_REM.left}rem`,
        paddingRight: `${DESKTOP_PAGE_LAYOUT_OFFSET_REM.right}rem`,
        paddingTop: `${DESKTOP_PAGE_LAYOUT_OFFSET_REM.top}rem`,
      }}
    >
      <DashboardCanvas>
        <div className="flex h-full w-full flex-col gap-4">
          <div className="flex gap-4">
            <div className="min-w-0" style={{ flex: "836 1 0" }}>
              <RevenueChart />
            </div>
            <div className="min-w-[508px]" style={{ flex: "508 1 0" }}>
              <SummaryCards />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-[573px] shrink-0">
              <CustomerGradeCard />
            </div>
            <div className="min-w-0 flex-1 basis-[772px]">
              <ReservationStatusCard />
            </div>
          </div>
        </div>
      </DashboardCanvas>
    </div>
  );
};

export { HomePage };
