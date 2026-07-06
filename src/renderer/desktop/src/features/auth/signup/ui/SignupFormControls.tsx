import { Link } from "react-router-dom";
import { lightTheme } from "@design-tokens";

import {
  fieldLabelClassName,
  inputClassName,
  inputStyle,
  primaryRingStyle,
  secondaryButtonClassName,
} from "@/features/auth/signup/ui/SignupFormStyles";
import type {
  SignupFooterProps,
  SignupInlineButtonProps,
  SignupTextFieldProps,
} from "@/features/auth/signup/ui/types";

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

const SignupInlineButton = ({
  children,
  disabled = false,
  isLoading = false,
  onClick,
}: SignupInlineButtonProps) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={`${secondaryButtonClassName} disabled:cursor-not-allowed`}
      style={{
        ...primaryRingStyle,
        backgroundColor: lightTheme.line.alternative,
        color: isDisabled ? lightTheme.line.normal : lightTheme.label.assistive,
        opacity: isDisabled ? 0.6 : 1,
      }}
    >
      {isLoading ? "처리 중" : children}
    </button>
  );
};

const SignupFooter = ({
  disabled,
  isLoading = false,
  label = "다음으로",
  onNext,
}: SignupFooterProps) => (
  <div className="mt-[clamp(10px,3vh,32px)] flex flex-col items-center gap-[clamp(10px,2.5vh,26px)]">
    <button
      type="button"
      disabled={disabled || isLoading}
      onClick={onNext}
      className="h-[clamp(40px,6vh,48px)] w-full rounded-[10px] font-['Pretendard'] text-lg font-semibold leading-[130%] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-ring-color)]/40 focus:ring-offset-2 disabled:cursor-not-allowed"
      style={{
        ...primaryRingStyle,
        backgroundColor: lightTheme.primary.normal,
        color: lightTheme.fill.normal,
        opacity: disabled || isLoading ? 0.5 : 1,
      }}
    >
      {isLoading ? "처리 중..." : label}
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
  SignupFooter,
  SignupInlineButton,
  SignupTextField,
};
