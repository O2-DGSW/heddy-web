import { useMemo } from "react";

import {
  formatBusinessNumber,
  formatLandline,
} from "@/features/auth/signup/model/formatters";
import { AddressFields } from "@/features/auth/signup/ui/AddressFields";
import { CategorySelectField } from "@/features/auth/signup/ui/CategorySelectField";
import { SignupFooter, SignupTextField } from "@/features/auth/signup/ui/SignupFormControls";
import type { OwnerShopFormProps } from "@/features/auth/signup/ui/types";

const OwnerShopForm = ({
  form,
  errorMessage,
  isSubmitting = false,
  onChange,
  onNext,
}: OwnerShopFormProps) => {
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

        <AddressFields
          address={form.address}
          addressDetail={form.addressDetail}
          onAddressChange={(address) => onChange({ ...form, address })}
          onAddressDetailChange={(addressDetail) => onChange({ ...form, addressDetail })}
        />

        <CategorySelectField
          value={form.category}
          onChange={(category) => onChange({ ...form, category })}
        />

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

      <SignupFooter
        disabled={!isValid}
        errorMessage={errorMessage}
        isLoading={isSubmitting}
        label="회원가입"
        onNext={onNext}
      />
    </form>
  );
};

export { OwnerShopForm };
