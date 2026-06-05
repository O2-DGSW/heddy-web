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
      className="h-full w-full overflow-auto p-4 sm:p-6 xl:p-10"
      style={{ backgroundColor: lightTheme.background.alternative }}
    >
      <DashboardCanvas>
        <div className="flex h-full flex-col gap-4">
          <div className="flex gap-4">
            <div className="min-w-[836px] flex-1">
              <RevenueChart />
            </div>
            <SummaryCards />
          </div>
          <div className="flex gap-4">
            <div className="w-[573px] shrink-0">
              <CustomerGradeCard />
            </div>
            <div className="min-w-[772px] flex-1">
              <ReservationStatusCard />
            </div>
          </div>
        </div>
      </DashboardCanvas>
    </div>
  );
};

export { HomePage };
