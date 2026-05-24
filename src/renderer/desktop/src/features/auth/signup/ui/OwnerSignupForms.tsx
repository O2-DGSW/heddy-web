import { useMemo, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { lightTheme } from "@design-tokens";

import {
  MAIN_CARRIERS,
  MVNO_CARRIERS,
  SHOP_CATEGORIES,
} from "@/features/auth/signup/constants/signup";
import {
  formatBusinessNumber,
  formatLandline,
  formatPhone,
} from "@/features/auth/signup/model/formatters";
import type {
  Carrier,
  MvnoCarrier,
  OwnerAccountFormValues,
  OwnerShopFormValues,
} from "@/features/auth/signup/model/types";

interface OwnerAccountFormProps {
  form: OwnerAccountFormValues;
  onChange: (form: OwnerAccountFormValues) => void;
  onNext: () => void;
}

interface OwnerShopFormProps {
  form: OwnerShopFormValues;
  onChange: (form: OwnerShopFormValues) => void;
  onNext: () => void;
}

interface TextFieldProps {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  value: string;
  type?: string;
  onChange: (value: string) => void;
}

const MVNO_SET = new Set<string>(MVNO_CARRIERS);

const isMvnoCarrier = (carrier: Carrier): carrier is MvnoCarrier => MVNO_SET.has(carrier);

const primaryRingStyle = {
  "--primary-ring-color": lightTheme.primary.normal,
} as CSSProperties;

const inputStyle = {
  backgroundColor: lightTheme.background.neutral,
  color: lightTheme.label.neutral,
};

const fieldLabelClassName =
  "pl-0.5 font-['Pretendard'] text-sm font-medium leading-[130%]";

const inputClassName =
  "h-[47px] w-full rounded-[10px] px-3.5 font-['Pretendard'] text-xs font-normal leading-[130%] outline-none placeholder:text-[#c1c2c3] focus:ring-2 focus:ring-[var(--primary-ring-color)]/30";

const secondaryButtonClassName =
  "h-[47px] w-[78px] shrink-0 rounded-[10px] font-['Pretendard'] text-sm font-medium leading-[130%] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-ring-color)]/30";

const TextField = ({
  id,
  label,
  name,
  placeholder,
  value,
  type = "text",
  onChange,
}: TextFieldProps) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className={fieldLabelClassName} style={{ color: lightTheme.label.assistive }}>
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={inputClassName}
      style={{ ...primaryRingStyle, ...inputStyle }}
    />
  </div>
);

const SignupFooter = ({
  disabled,
  onNext,
}: {
  disabled: boolean;
  onNext: () => void;
}) => (
  <div className="mt-8 flex flex-col items-center gap-[26px] [@media(max-height:900px)]:gap-[18px]">
    <button
      type="button"
      disabled={disabled}
      onClick={onNext}
      className="h-12 w-full rounded-[10px] font-['Pretendard'] text-lg font-semibold leading-[130%] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-ring-color)]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      style={{
        ...primaryRingStyle,
        backgroundColor: disabled ? lightTheme.line.alternative : lightTheme.primary.normal,
        color: disabled ? lightTheme.line.normal : lightTheme.fill.normal,
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
        <TextField
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
          <TextField
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
              <button
                type="button"
                className={secondaryButtonClassName}
                style={{
                  ...primaryRingStyle,
                  backgroundColor: lightTheme.line.alternative,
                  color: lightTheme.line.normal,
                }}
              >
                인증번호
              </button>
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

const OwnerShopForm = ({ form, onChange, onNext }: OwnerShopFormProps) => {
  const isValid = useMemo(
    () =>
      Boolean(
        form.shopName.trim() &&
          form.address.trim() &&
          form.addressDetail.trim() &&
          form.category &&
          form.landline.trim() &&
          form.businessNumber.trim(),
      ),
    [form],
  );

  return (
    <form className="w-full" aria-label="상점 정보">
      <div className="flex flex-col">
        <TextField
          id="signup-shop-name"
          name="shopName"
          label="상점명"
          placeholder="상점명"
          value={form.shopName}
          onChange={(shopName) => onChange({ ...form, shopName })}
        />

        <div className="mt-6 flex flex-col gap-1">
          <label
            htmlFor="signup-shop-address"
            className={fieldLabelClassName}
            style={{ color: lightTheme.label.assistive }}
          >
            주소 (사업장 소재지)
          </label>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                id="signup-shop-address"
                name="address"
                type="text"
                placeholder="주소검색"
                value={form.address}
                onChange={(event) => onChange({ ...form, address: event.target.value })}
                className={inputClassName}
                style={{ ...primaryRingStyle, ...inputStyle }}
              />
              <button
                type="button"
                className={secondaryButtonClassName}
                style={{
                  ...primaryRingStyle,
                  backgroundColor: lightTheme.line.alternative,
                  color: lightTheme.line.normal,
                }}
              >
                주소검색
              </button>
            </div>
            <input
              id="signup-shop-address-detail"
              name="addressDetail"
              type="text"
              placeholder="상세주소"
              value={form.addressDetail}
              onChange={(event) => onChange({ ...form, addressDetail: event.target.value })}
              className={inputClassName}
              style={{ ...primaryRingStyle, ...inputStyle }}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-1">
          <label
            htmlFor="signup-shop-category"
            className={fieldLabelClassName}
            style={{ color: lightTheme.label.assistive }}
          >
            상점 카테고리
          </label>
          <select
            id="signup-shop-category"
            name="category"
            value={form.category}
            onChange={(event) => onChange({ ...form, category: event.target.value })}
            className={`${inputClassName} appearance-none bg-[right_15px_center]`}
            style={{
              ...primaryRingStyle,
              ...inputStyle,
              color: form.category ? lightTheme.label.neutral : lightTheme.line.normal,
            }}
          >
            <option value="" disabled>
              카테고리를 선택해주세요
            </option>
            {SHOP_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          <TextField
            id="signup-shop-landline"
            name="landline"
            label="유선번호"
            placeholder="유선번호"
            value={form.landline}
            onChange={(landline) => onChange({ ...form, landline: formatLandline(landline) })}
          />
        </div>

        <div className="mt-6">
          <TextField
            id="signup-shop-business-number"
            name="businessNumber"
            label="사업자등록번호"
            placeholder="사업자등록번호"
            value={form.businessNumber}
            onChange={(businessNumber) =>
              onChange({ ...form, businessNumber: formatBusinessNumber(businessNumber) })
            }
          />
        </div>
      </div>

      <SignupFooter disabled={!isValid} onNext={onNext} />
    </form>
  );
};

export { OwnerAccountForm, OwnerShopForm };
