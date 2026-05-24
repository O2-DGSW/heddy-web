import type { ReactNode } from "react";

import type {
  Carrier,
  OwnerAccountFormValues,
  OwnerShopFormValues,
} from "@/features/auth/signup/model/types";

export interface OwnerAccountFormProps {
  form: OwnerAccountFormValues;
  onChange: (form: OwnerAccountFormValues) => void;
  onNext: () => void;
}

export interface OwnerShopFormProps {
  form: OwnerShopFormValues;
  onChange: (form: OwnerShopFormValues) => void;
  onNext: () => void;
}

export interface SignupTextFieldProps {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  value: string;
  type?: string;
  onChange: (value: string) => void;
}

export interface SignupFooterProps {
  disabled: boolean;
  onNext: () => void;
}

export interface SignupInlineButtonProps {
  children: ReactNode;
}

export interface CarrierButtonProps {
  carrier: Carrier;
  selected: boolean;
  onSelect: (carrier: Carrier) => void;
}

export interface PasswordFieldsProps {
  password: string;
  passwordConfirm: string;
  onPasswordChange: (value: string) => void;
  onPasswordConfirmChange: (value: string) => void;
}

export interface PhoneVerificationFieldProps {
  carrier: Carrier;
  phone: string;
  verificationCode: string;
  onCarrierChange: (carrier: Carrier) => void;
  onPhoneChange: (value: string) => void;
  onVerificationCodeChange: (value: string) => void;
}

export interface AddressFieldsProps {
  address: string;
  addressDetail: string;
  onAddressChange: (value: string) => void;
  onAddressDetailChange: (value: string) => void;
}

export interface CategorySelectFieldProps {
  value: string;
  onChange: (value: string) => void;
}
