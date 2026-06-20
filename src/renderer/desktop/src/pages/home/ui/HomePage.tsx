import { lightTheme } from "@design-tokens";

import {
  CustomerGradeCard,
  DashboardCanvas,
  ReservationStatusCard,
  RevenueChart,
  SummaryCards,
} from "@/pages/home/ui/components";

const HomePage = () => {
  return (
    <div
      data-dashboard-page
      className="h-full w-full overflow-hidden"
      style={{
        backgroundColor: lightTheme.background.alternative,
        paddingBottom: "2.5625rem",
        paddingLeft: "2.5625rem",
        paddingRight: "2.5rem",
        paddingTop: "2.625rem",
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
