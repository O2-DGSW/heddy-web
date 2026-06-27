import { lightTheme } from "@design-tokens";

import dropdownIcon from "@/features/auth/signup/assets/svg/dropdown.svg";
import { MAIN_CARRIERS, MVNO_CARRIERS } from "@/features/auth/signup/constants/signup";
import { formatPhone } from "@/features/auth/signup/model/formatters";
import type { Carrier, MvnoCarrier } from "@/features/auth/signup/model/types";
import {
  fieldLabelClassName,
  inputClassName,
  inputStyle,
  primaryRingStyle,
} from "@/features/auth/signup/ui/SignupFormStyles";
import { SignupInlineButton } from "@/features/auth/signup/ui/SignupFormControls";
import type {
  CarrierButtonProps,
  PhoneVerificationFieldProps,
} from "@/features/auth/signup/ui/types";

const MVNO_SET = new Set<string>(MVNO_CARRIERS);

const isMvnoCarrier = (carrier: Carrier): carrier is MvnoCarrier => MVNO_SET.has(carrier);

const CarrierButton = ({
  carrier,
  selected,
  onSelect,
}: CarrierButtonProps) => (
  <button
    type="button"
    onClick={() => onSelect(carrier)}
    className="flex h-4 items-center gap-2 font-['Pretendard'] text-sm font-medium leading-[130%] focus:outline-none focus:ring-2 focus:ring-[var(--primary-ring-color)]/30"
    style={{ ...primaryRingStyle, color: lightTheme.label.assistive }}
  >
    <span
      className="flex size-[15px] items-center justify-center rounded-full border-[4px]"
      style={{ borderColor: selected ? lightTheme.primary.normal : lightTheme.line.normal }}
      aria-hidden="true"
    >
      {selected && <span className="size-[7px] rounded-full bg-white" />}
    </span>
    {carrier}
  </button>
);

const PhoneVerificationField = ({
  canSendVerification,
  canVerifyCode,
  carrier,
  isSendingVerification,
  isVerifyingCode,
  phone,
  verificationCode,
  verificationMessage,
  verificationMessageTone,
  onCarrierChange,
  onPhoneChange,
  onSendVerification,
  onVerifyCode,
  onVerificationCodeChange,
}: PhoneVerificationFieldProps) => {
  const isMvnoSelected = isMvnoCarrier(carrier);
  const messageColor =
    verificationMessageTone === "success"
      ? lightTheme.primary.normal
      : verificationMessageTone === "error"
        ? lightTheme.status.error
        : lightTheme.label.assistive;

  return (
    <div className="mt-[clamp(10px,2.8vh,24px)] flex flex-col gap-[clamp(6px,1.5vh,12px)]">
      <label
        htmlFor="signup-owner-phone"
        className={fieldLabelClassName}
        style={{ color: lightTheme.label.assistive }}
      >
        전화번호
      </label>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center gap-[31px]">
          {MAIN_CARRIERS.map((mainCarrier) => (
            <CarrierButton
              key={mainCarrier}
              carrier={mainCarrier}
              selected={carrier === mainCarrier}
              onSelect={onCarrierChange}
            />
          ))}

          <div className="relative h-5 w-[61px] shrink-0">
            <span
              className="absolute left-0 top-0.5 font-['Pretendard'] text-sm font-medium leading-[130%]"
              style={{
                color: isMvnoSelected ? lightTheme.primary.normal : lightTheme.label.assistive,
              }}
              aria-hidden="true"
            >
              알뜰폰
            </span>
            <select
              aria-label="알뜰폰 통신사"
              value={isMvnoSelected ? carrier : ""}
              onChange={(event) => onCarrierChange(event.target.value as MvnoCarrier)}
              className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0 outline-none focus:ring-2 focus:ring-[var(--primary-ring-color)]/30"
              style={primaryRingStyle}
            >
              <option value="" disabled>
                알뜰폰
              </option>
              {MVNO_CARRIERS.map((mvnoCarrier) => (
                <option key={mvnoCarrier} value={mvnoCarrier}>
                  {mvnoCarrier}
                </option>
              ))}
            </select>
            <img
              src={dropdownIcon}
              alt=""
              className="pointer-events-none absolute right-0 top-0 size-5"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <input
            id="signup-owner-phone"
            name="phone"
            type="tel"
            placeholder="전화번호"
            value={phone}
            onChange={(event) => onPhoneChange(formatPhone(event.target.value))}
            className={inputClassName}
            style={{ ...primaryRingStyle, ...inputStyle }}
          />
          <SignupInlineButton
            disabled={!canSendVerification}
            isLoading={isSendingVerification}
            onClick={onSendVerification}
          >
            인증번호
          </SignupInlineButton>
        </div>

        <div className="flex gap-2">
          <input
            id="signup-owner-verification-code"
            name="verificationCode"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="인증번호"
            value={verificationCode}
            onChange={(event) =>
              onVerificationCodeChange(event.target.value.replace(/\D/g, "").slice(0, 6))
            }
            className={inputClassName}
            style={{ ...primaryRingStyle, ...inputStyle }}
          />
          <SignupInlineButton
            disabled={!canVerifyCode}
            isLoading={isVerifyingCode}
            onClick={onVerifyCode}
          >
            확인
          </SignupInlineButton>
        </div>

        {verificationMessage && (
          <p
            className="font-['Pretendard'] text-xs font-normal leading-[150%]"
            style={{ color: messageColor }}
          >
            {verificationMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export { PhoneVerificationField };
