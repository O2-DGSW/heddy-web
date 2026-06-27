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
  isPhoneVerified: boolean;
  isVerificationSent: boolean;
  isSendingVerification: boolean;
  isVerifyingCode: boolean;
  verificationMessage: string | null;
  verificationMessageTone: VerificationMessageTone;
  onSendVerification: () => void | Promise<void>;
  onVerifyCode: () => void | Promise<void>;
}

export interface OwnerShopFormProps {
  form: OwnerShopFormValues;
  onChange: (form: OwnerShopFormValues) => void;
  onNext: () => void;
  isSubmitting?: boolean;
  errorMessage?: string | null;
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
  label?: string;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export interface SignupInlineButtonProps {
  children: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void | Promise<void>;
}

export interface CarrierButtonProps {
  carrier: Carrier;
  selected: boolean;
  onSelect: (carrier: Carrier) => void;
}

export interface PasswordFieldsProps {
  password: string;
  passwordConfirm: string;
  errorMessage?: string | null;
  onPasswordChange: (value: string) => void;
  onPasswordConfirmChange: (value: string) => void;
}

export type VerificationMessageTone = "info" | "success" | "error";

export interface PhoneVerificationFieldProps {
  carrier: Carrier;
  phone: string;
  verificationCode: string;
  canSendVerification: boolean;
  canVerifyCode: boolean;
  isSendingVerification: boolean;
  isVerifyingCode: boolean;
  verificationMessage: string | null;
  verificationMessageTone: VerificationMessageTone;
  onCarrierChange: (carrier: Carrier) => void;
  onPhoneChange: (value: string) => void;
  onVerificationCodeChange: (value: string) => void;
  onSendVerification: () => void | Promise<void>;
  onVerifyCode: () => void | Promise<void>;
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
