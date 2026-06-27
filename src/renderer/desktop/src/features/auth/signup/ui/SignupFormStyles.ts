import type { CSSProperties } from "react";
import { lightTheme } from "@design-tokens";

export const primaryRingStyle = {
  "--primary-ring-color": lightTheme.primary.normal,
} as CSSProperties;

export const inputStyle = {
  backgroundColor: lightTheme.background.neutral,
  color: lightTheme.label.neutral,
};

export const fieldLabelClassName =
  "pl-0.5 font-['Pretendard'] text-sm font-medium leading-[130%]";

export const inputClassName =
  "h-[clamp(38px,6vh,47px)] w-full rounded-[10px] px-3.5 font-['Pretendard'] text-xs font-normal leading-[130%] outline-none placeholder:text-[#c1c2c3] focus:ring-2 focus:ring-[var(--primary-ring-color)]/30";

export const secondaryButtonClassName =
  "h-[clamp(38px,6vh,47px)] w-[78px] shrink-0 rounded-[10px] font-['Pretendard'] text-sm font-medium leading-[130%] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-ring-color)]/30";
