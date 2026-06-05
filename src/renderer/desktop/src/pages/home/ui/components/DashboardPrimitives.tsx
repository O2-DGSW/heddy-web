import type { CSSProperties, ReactNode } from "react";
import { lightTheme } from "@design-tokens";

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

const ArrowIcon = () => (
  <svg
    aria-hidden="true"
    className="size-[14px]"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.5758 2.15073C6.52317 2.09504 6.48203 2.02953 6.45472 1.95794C6.42741 1.88635 6.41447 1.81008 6.41664 1.73348C6.4188 1.65689 6.43604 1.58147 6.46735 1.51154C6.49866 1.44161 6.54344 1.37853 6.59913 1.3259C6.65482 1.27327 6.72034 1.23213 6.79193 1.20482C6.86352 1.17751 6.93979 1.16457 7.01638 1.16674C7.09297 1.1689 7.16839 1.18614 7.23832 1.21745C7.30826 1.24876 7.37134 1.29354 7.42397 1.34923L12.3823 6.59923C12.4847 6.70754 12.5417 6.85093 12.5417 6.99998C12.5417 7.14903 12.4847 7.29242 12.3823 7.40073L7.42397 12.6513C7.37169 12.7082 7.30862 12.7542 7.23843 12.7865C7.16824 12.8188 7.09232 12.8369 7.01509 12.8396C6.93786 12.8424 6.86086 12.8298 6.78855 12.8025C6.71624 12.7752 6.65007 12.7339 6.59388 12.6808C6.5377 12.6277 6.49261 12.5641 6.46125 12.4934C6.42988 12.4228 6.41287 12.3466 6.41119 12.2694C6.4095 12.1921 6.42319 12.1153 6.45145 12.0434C6.47971 11.9714 6.52198 11.9059 6.5758 11.8504L11.1561 6.99998L6.5758 2.15073Z"
      fill={lightTheme.label.assistive}
    />
  </svg>
);

const MoreButton = () => (
  <button
    type="button"
    className="flex items-center gap-2 font-['Pretendard'] text-[16px] font-medium leading-[1.3] tracking-normal"
    style={{ color: lightTheme.label.alternative }}
  >
    전체보기
    <ArrowIcon />
  </button>
);

const DropdownIcon = ({
  color = lightTheme.label.assistive,
  className = "size-5",
}: {
  color?: string;
  className?: string;
}) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.90482 12.3809L14.0318 8.25391H5.77783L9.90482 12.3809Z" fill={color} />
  </svg>
);

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
