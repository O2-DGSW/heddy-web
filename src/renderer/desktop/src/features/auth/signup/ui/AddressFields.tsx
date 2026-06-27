import { lightTheme } from "@design-tokens";

import {
  fieldLabelClassName,
  inputClassName,
  inputStyle,
  primaryRingStyle,
} from "@/features/auth/signup/ui/SignupFormStyles";
import { SignupInlineButton } from "@/features/auth/signup/ui/SignupFormControls";
import type { AddressFieldsProps } from "@/features/auth/signup/ui/types";

const AddressFields = ({
  address,
  addressDetail,
  onAddressChange,
  onAddressDetailChange,
}: AddressFieldsProps) => (
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
          value={address}
          onChange={(event) => onAddressChange(event.target.value)}
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
        value={addressDetail}
        onChange={(event) => onAddressDetailChange(event.target.value)}
        className={inputClassName}
        style={{ ...primaryRingStyle, ...inputStyle }}
      />
    </div>
  </div>
);

export { AddressFields };
