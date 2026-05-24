import { useMemo } from "react";
import { lightTheme } from "@design-tokens";

import { SHOP_CATEGORIES } from "@/features/auth/signup/constants/signup";
import {
  formatBusinessNumber,
  formatLandline,
} from "@/features/auth/signup/model/formatters";
import type { OwnerShopFormValues } from "@/features/auth/signup/model/types";
import {
  fieldLabelClassName,
  inputClassName,
  inputStyle,
  primaryRingStyle,
  SignupFooter,
  SignupInlineButton,
  SignupTextField,
} from "@/features/auth/signup/ui/SignupFormControls";

interface OwnerShopFormProps {
  form: OwnerShopFormValues;
  onChange: (form: OwnerShopFormValues) => void;
  onNext: () => void;
}

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
        <SignupTextField
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
              <SignupInlineButton>주소검색</SignupInlineButton>
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
          <SignupTextField
            id="signup-shop-landline"
            name="landline"
            label="유선번호"
            placeholder="유선번호"
            value={form.landline}
            onChange={(landline) => onChange({ ...form, landline: formatLandline(landline) })}
          />
        </div>

        <div className="mt-6">
          <SignupTextField
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

export { OwnerShopForm };
