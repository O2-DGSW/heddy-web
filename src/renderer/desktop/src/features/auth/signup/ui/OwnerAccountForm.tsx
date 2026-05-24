import { useMemo } from "react";
import { lightTheme } from "@design-tokens";

import { MAIN_CARRIERS, MVNO_CARRIERS } from "@/features/auth/signup/constants/signup";
import { formatPhone } from "@/features/auth/signup/model/formatters";
import type {
  Carrier,
  MvnoCarrier,
  OwnerAccountFormValues,
} from "@/features/auth/signup/model/types";
import {
  fieldLabelClassName,
  inputClassName,
  inputStyle,
  primaryRingStyle,
  SignupFooter,
  SignupInlineButton,
  SignupTextField,
} from "@/features/auth/signup/ui/SignupFormControls";

interface OwnerAccountFormProps {
  form: OwnerAccountFormValues;
  onChange: (form: OwnerAccountFormValues) => void;
  onNext: () => void;
}

const MVNO_SET = new Set<string>(MVNO_CARRIERS);

const isMvnoCarrier = (carrier: Carrier): carrier is MvnoCarrier => MVNO_SET.has(carrier);

const CarrierButton = ({
  carrier,
  selected,
  onSelect,
}: {
  carrier: Carrier;
  selected: boolean;
  onSelect: (carrier: Carrier) => void;
}) => (
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

const OwnerAccountForm = ({ form, onChange, onNext }: OwnerAccountFormProps) => {
  const isValid = useMemo(
    () =>
      Boolean(
        form.id.trim() &&
          form.password &&
          form.passwordConfirm &&
          form.password === form.passwordConfirm &&
          form.representativeName.trim() &&
          form.phone.trim() &&
          form.verificationCode.trim(),
      ),
    [form],
  );

  const isMvnoSelected = isMvnoCarrier(form.carrier);

  return (
    <form className="w-full" aria-label="오너 계정 정보">
      <div className="flex flex-col">
        <SignupTextField
          id="signup-owner-id"
          name="id"
          label="아이디"
          placeholder="아이디"
          value={form.id}
          onChange={(id) => onChange({ ...form, id })}
        />

        <div className="mt-6 flex flex-col gap-1">
          <label
            htmlFor="signup-owner-password"
            className={fieldLabelClassName}
            style={{ color: lightTheme.label.assistive }}
          >
            비밀번호
          </label>
          <div className="flex flex-col gap-1.5">
            <input
              id="signup-owner-password"
              name="password"
              type="password"
              placeholder="비밀번호"
              value={form.password}
              onChange={(event) => onChange({ ...form, password: event.target.value })}
              className={inputClassName}
              style={{ ...primaryRingStyle, ...inputStyle }}
            />
            <input
              id="signup-owner-password-confirm"
              name="passwordConfirm"
              type="password"
              placeholder="비밀번호 확인"
              value={form.passwordConfirm}
              onChange={(event) => onChange({ ...form, passwordConfirm: event.target.value })}
              className={inputClassName}
              style={{ ...primaryRingStyle, ...inputStyle }}
            />
          </div>
        </div>

        <div className="mt-6">
          <SignupTextField
            id="signup-owner-name"
            name="representativeName"
            label="대표자명"
            placeholder="대표자명"
            value={form.representativeName}
            onChange={(representativeName) => onChange({ ...form, representativeName })}
          />
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <label
            htmlFor="signup-owner-phone"
            className={fieldLabelClassName}
            style={{ color: lightTheme.label.assistive }}
          >
            전화번호
          </label>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center gap-[31px]">
              {MAIN_CARRIERS.map((carrier) => (
                <CarrierButton
                  key={carrier}
                  carrier={carrier}
                  selected={form.carrier === carrier}
                  onSelect={(nextCarrier) => onChange({ ...form, carrier: nextCarrier })}
                />
              ))}

              <select
                aria-label="알뜰폰 통신사"
                value={isMvnoSelected ? form.carrier : ""}
                onChange={(event) =>
                  onChange({ ...form, carrier: event.target.value as MvnoCarrier })
                }
                className="h-5 bg-transparent font-['Pretendard'] text-sm font-medium leading-[130%] outline-none focus:ring-2 focus:ring-[var(--primary-ring-color)]/30"
                style={{
                  ...primaryRingStyle,
                  color: isMvnoSelected ? lightTheme.primary.normal : lightTheme.label.assistive,
                }}
              >
                <option value="" disabled>
                  알뜰폰
                </option>
                {MVNO_CARRIERS.map((carrier) => (
                  <option key={carrier} value={carrier}>
                    {carrier}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <input
                id="signup-owner-phone"
                name="phone"
                type="tel"
                placeholder="전화번호"
                value={form.phone}
                onChange={(event) => onChange({ ...form, phone: formatPhone(event.target.value) })}
                className={inputClassName}
                style={{ ...primaryRingStyle, ...inputStyle }}
              />
              <SignupInlineButton>인증번호</SignupInlineButton>
            </div>

            <input
              id="signup-owner-verification-code"
              name="verificationCode"
              type="text"
              placeholder="인증번호"
              value={form.verificationCode}
              onChange={(event) => onChange({ ...form, verificationCode: event.target.value })}
              className={inputClassName}
              style={{ ...primaryRingStyle, ...inputStyle }}
            />
          </div>
        </div>
      </div>

      <SignupFooter disabled={!isValid} onNext={onNext} />
    </form>
  );
};

export { OwnerAccountForm };
