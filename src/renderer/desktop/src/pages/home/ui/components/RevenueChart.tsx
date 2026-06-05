import { lightTheme } from "@design-tokens";

import { chartPoints } from "@/pages/home/model/homeDashboardData";
import {
  AXIS_TEXT_COLOR,
  CHART_AREA_END_OPACITY,
  CHART_AREA_START_OPACITY,
  DashboardCard,
  SelectPill,
} from "@/pages/home/ui/components/DashboardPrimitives";

const RevenueChart = () => {
  const linePath = chartPoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const areaPath = `${linePath} L ${chartPoints.at(-1)?.x ?? 0} 211 L ${chartPoints[0].x} 211 Z`;

  return (
    <DashboardCard className="h-[407px] w-full px-[31px] py-[27px]">
      <div className="flex items-center justify-between">
        <div className="font-['Pretendard'] font-bold leading-[1.3] tracking-normal">
          <h2 className="text-[20px]" style={{ color: lightTheme.label.neutral }}>
            예상 매출 그래프
          </h2>
          <p className="text-[28px]" style={{ color: lightTheme.primary.normal }}>
            ₩ 3,240,000
          </p>
        </div>
        <SelectPill label="주간" labelWidth={25} className="w-[65px]" />
      </div>

      <div className="relative mt-11 h-[247px] w-full">
        <div
          className="absolute left-0 top-0 flex h-[217px] w-[42px] flex-col justify-between px-1 text-right font-['Inter'] text-[12px] font-normal leading-none"
          style={{ color: AXIS_TEXT_COLOR }}
        >
          {["400만", "320만", "240만", "160만", "80만", "0"].map(label => (
            <span key={label} className="whitespace-nowrap">
              {label}
            </span>
          ))}
        </div>

        <div className="absolute left-[50px] right-0 top-0 h-[217px]">
          <svg viewBox="0 0 724 217" className="size-full overflow-visible" aria-hidden="true">
            <defs>
              <linearGradient id="revenue-area-fill" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={lightTheme.primary.normal}
                  stopOpacity={CHART_AREA_START_OPACITY}
                />
                <stop
                  offset="100%"
                  stopColor={lightTheme.primary.normal}
                  stopOpacity={CHART_AREA_END_OPACITY}
                />
              </linearGradient>
            </defs>
            {[6, 47, 88, 129, 170, 211].map((y, index) => (
              <line
                key={`x-line-${index}`}
                x1="1"
                x2="723"
                y1={y}
                y2={y}
                stroke={index === 5 ? lightTheme.line.normal : lightTheme.line.neutral}
                strokeDasharray={index === 5 ? undefined : "2 2"}
              />
            ))}
            {Array.from({ length: 8 }, (_, index) => (
              <line
                key={`y-line-${index}`}
                x1={1 + index * 103.14286}
                x2={1 + index * 103.14286}
                y1="6"
                y2="211"
                stroke={lightTheme.line.neutral}
                strokeDasharray="2 2"
              />
            ))}
            <path d={areaPath} fill="url(#revenue-area-fill)" />
            <path
              d={linePath}
              fill="none"
              stroke={lightTheme.primary.normal}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
            />
            {chartPoints.map(point => (
              <circle
                key={`${point.x}-${point.y}`}
                cx={point.x}
                cy={point.y}
                r="4"
                fill={lightTheme.primary.normal}
                stroke={lightTheme.background.normal}
                strokeWidth="1.5"
              />
            ))}
          </svg>
        </div>

        <div
          className="absolute left-[50px] right-0 top-56 grid grid-cols-7 font-['Inter'] text-[12px] font-normal leading-none"
          style={{ color: AXIS_TEXT_COLOR }}
        >
          {["5/10", "5/11", "5/12", "5/13", "5/14", "5/15", "5/16"].map(date => (
            <span key={date} className="text-center">
              {date}
            </span>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
};

export { RevenueChart };
