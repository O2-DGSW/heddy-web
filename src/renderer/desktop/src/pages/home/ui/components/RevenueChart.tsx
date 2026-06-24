import { lightTheme } from "@design-tokens";

import type { RevenueChartData } from "@/pages/home/model/homeDashboardData";
import {
  AXIS_TEXT_COLOR,
  DashboardCard,
  SelectPill,
} from "@/pages/home/ui/components/DashboardPrimitives";
import { RevenueChartSvg } from "@/pages/home/ui/components/RevenueChartSvg";

const RevenueChart = ({ data }: { data: RevenueChartData }) => {
  return (
    <DashboardCard className="h-[407px] w-full px-[31px] py-[27px]">
      <div className="flex items-center justify-between">
        <div className="font-['Pretendard'] font-bold leading-[1.3]">
          <h2 className="text-[20px] tracking-[-0.4px]" style={{ color: lightTheme.label.neutral }}>
            예상 매출 그래프
          </h2>
          <p
            className="text-[28px] tracking-[-0.56px]"
            style={{ color: lightTheme.primary.normal }}
          >
            ₩ {data.totalValue}
          </p>
        </div>
        <SelectPill label="주간" labelWidth={25} className="w-[65px]" />
      </div>

      <div className="relative mt-11 h-[247px] w-full">
        <div
          className="absolute left-0 top-0 flex h-[217px] w-[42px] flex-col justify-between px-1 text-right font-['Inter'] text-[12px] font-normal leading-normal"
          style={{ color: AXIS_TEXT_COLOR }}
        >
          {data.axisLabels.map(label => (
            <span key={label} className="whitespace-nowrap">
              {label}
            </span>
          ))}
        </div>

        <div className="absolute left-[50px] right-0 top-0 h-[217px]">
          <RevenueChartSvg points={data.points} />
        </div>

        <div
          className="absolute left-0 right-0 top-56 grid pb-2 pl-10 font-['Inter'] text-[12px] font-normal leading-normal"
          style={{
            color: AXIS_TEXT_COLOR,
            gridTemplateColumns: `repeat(${data.xLabels.length}, minmax(0, 1fr))`,
          }}
        >
          {data.xLabels.map((date, index) => (
            <span key={`${date}-${index}`} className="text-center">
              {date}
            </span>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
};

export { RevenueChart };
