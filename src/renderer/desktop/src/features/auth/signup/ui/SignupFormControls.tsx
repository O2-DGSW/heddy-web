import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { lightTheme } from "@design-tokens";

import type {
  SignupFooterProps,
  SignupInlineButtonProps,
  SignupTextFieldProps,
} from "@/features/auth/signup/ui/types";

const primaryRingStyle = {
  "--primary-ring-color": lightTheme.primary.normal,
} as CSSProperties;

const inputStyle = {
  backgroundColor: lightTheme.background.neutral,
  color: lightTheme.label.neutral,
};

const fieldLabelClassName = "pl-0.5 font-['Pretendard'] text-sm font-medium leading-[130%]";

const inputClassName =
  "h-[47px] w-full rounded-[10px] px-3.5 font-['Pretendard'] text-xs font-normal leading-[130%] outline-none placeholder:text-[#c1c2c3] focus:ring-2 focus:ring-[var(--primary-ring-color)]/30";

const secondaryButtonClassName =
  "h-[47px] w-[78px] shrink-0 rounded-[10px] font-['Pretendard'] text-sm font-medium leading-[130%] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-ring-color)]/30";

const SignupTextField = ({
  id,
  label,
  name,
  placeholder,
  value,
  type = "text",
  onChange,
}: SignupTextFieldProps) => (
  <div className="flex flex-col gap-1">
    <label
      htmlFor={id}
      className={fieldLabelClassName}
      style={{ color: lightTheme.label.assistive }}
    >
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={event => onChange(event.target.value)}
      className={inputClassName}
      style={{ ...primaryRingStyle, ...inputStyle }}
    />
  </div>
);

const SignupInlineButton = ({ children }: SignupInlineButtonProps) => (
  <button
    type="button"
    className={secondaryButtonClassName}
    style={{
      ...primaryRingStyle,
      backgroundColor: lightTheme.line.alternative,
      color: lightTheme.line.normal,
    }}
  >
    {children}
  </button>
);

const SignupFooter = ({ disabled, onNext }: SignupFooterProps) => (
  <div className="mt-8 flex flex-col items-center gap-[26px] [@media(max-height:900px)]:gap-[18px]">
    <button
      type="button"
      disabled={disabled}
      onClick={onNext}
      className="h-12 w-full rounded-[10px] font-['Pretendard'] text-lg font-semibold leading-[130%] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-ring-color)]/40 focus:ring-offset-2 disabled:cursor-not-allowed"
      style={{
        ...primaryRingStyle,
        backgroundColor: lightTheme.primary.normal,
        color: lightTheme.fill.normal,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      다음으로
    </button>

    <div className="flex items-center gap-6 font-['Pretendard'] text-sm font-medium leading-[130%]">
      <span style={{ color: lightTheme.label.assistive }}>이미 계정이 있으신가요?</span>
      <Link
        to="/login"
        className="underline underline-offset-2"
        style={{ color: lightTheme.primary.normal }}
      >
        로그인
      </Link>
    </div>
  </div>
);

export {
  fieldLabelClassName,
  inputClassName,
  inputStyle,
  primaryRingStyle,
  SignupFooter,
  SignupInlineButton,
  SignupTextField,
};
