import { lightTheme } from "@design-tokens";

import { chartPoints } from "@/pages/home/model/homeDashboardData";
import {
  CHART_AREA_END_OPACITY,
  CHART_AREA_START_OPACITY,
} from "@/pages/home/ui/components/DashboardPrimitives";

const horizontalGridLines = [6, 47, 88, 129, 170, 211];

const RevenueChartSvg = () => {
  const linePath = chartPoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const areaPath = `${linePath} L ${chartPoints.at(-1)?.x ?? 0} 211 L ${chartPoints[0].x} 211 Z`;

  return (
    <svg
      viewBox="0 0 724 217"
      preserveAspectRatio="none"
      className="size-full overflow-visible"
      aria-hidden="true"
    >
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
      {horizontalGridLines.map((y, index) => (
        <line
          key={`x-line-${index}`}
          x1="1"
          x2="723"
          y1={y}
          y2={y}
          stroke={
            index === horizontalGridLines.length - 1
              ? lightTheme.line.normal
              : lightTheme.line.neutral
          }
          strokeDasharray={index === horizontalGridLines.length - 1 ? undefined : "2 2"}
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
  );
};

export { RevenueChartSvg };
