import type { CSSProperties, ReactNode } from "react";
import { lightTheme } from "@design-tokens";

import ArrowIcon from "@/pages/home/assets/arrow.svg?react";
import DropdownIconAsset from "@/pages/home/assets/dropdown.svg?react";

const CARD_SHADOW = `0 0 4px color-mix(in srgb, ${lightTheme.label.strong} 8%, transparent)`;
const AXIS_TEXT_COLOR = `color-mix(in srgb, ${lightTheme.label.strong} 70%, transparent)`;
const CHART_AREA_START_OPACITY = 0.12;
const CHART_AREA_END_OPACITY = 0.02;

const DashboardCard = ({
  className = "",
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) => {
  return (
    <section
      className={`rounded-xl ${className}`}
      style={{
        backgroundColor: lightTheme.background.normal,
        boxShadow: CARD_SHADOW,
        ...style,
      }}
    >
      {children}
    </section>
  );
};

const MoreButton = () => (
  <button
    type="button"
    className="flex items-center gap-2 font-['Pretendard'] text-[16px] font-medium leading-[1.3] tracking-normal"
    style={{ color: lightTheme.label.alternative }}
  >
    전체보기
    <ArrowIcon
      aria-hidden="true"
      className="size-[14px]"
      style={{ color: lightTheme.label.assistive }}
    />
  </button>
);

const DropdownIcon = ({
  color = lightTheme.label.assistive,
  className = "size-5",
}: {
  color?: string;
  className?: string;
}) => <DropdownIconAsset aria-hidden="true" className={className} style={{ color }} />;

const SelectPill = ({
  label,
  labelWidth = 36,
  className = "",
}: {
  label: string;
  labelWidth?: number;
  className?: string;
}) => (
  <button
    type="button"
    className={`flex h-[26px] items-center justify-start overflow-hidden whitespace-nowrap rounded-full border pl-[15px] pr-0 font-['Pretendard'] text-[14px] font-medium leading-[1.3] tracking-normal ${className}`}
    style={{
      backgroundColor: lightTheme.background.normal,
      borderColor: lightTheme.line.alternative,
      color: lightTheme.label.assistive,
    }}
  >
    <span className="text-center" style={{ width: `${labelWidth}px` }}>
      {label}
    </span>
    <DropdownIcon />
  </button>
);

export {
  AXIS_TEXT_COLOR,
  CHART_AREA_END_OPACITY,
  CHART_AREA_START_OPACITY,
  DashboardCard,
  DropdownIcon,
  MoreButton,
  SelectPill,
};
