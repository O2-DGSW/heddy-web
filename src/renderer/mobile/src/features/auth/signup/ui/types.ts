import type React from 'react';
import type { BaseAccountForm, Carrier } from '@/features/auth/signup/model/types';

export interface AccountFormFieldsProps {
  form: BaseAccountForm;
  showPasswordError: boolean;
  showPhoneError: boolean;
  canRequestVerification: boolean;
  onChange: (form: BaseAccountForm) => void;
  middleSlot?: React.ReactNode;
}

export interface PasswordFieldsProps {
  password: string;
  passwordConfirm: string;
  showError?: boolean;
  onPasswordChange: (value: string) => void;
  onPasswordConfirmChange: (value: string) => void;
}

export interface PhoneVerificationFieldProps {
  carrier: Carrier;
  phone: string;
  verificationCode: string;
  canRequestVerification: boolean;
  showPhoneError?: boolean;
  onCarrierChange: (carrier: Carrier) => void;
  onPhoneChange: (value: string) => void;
  onVerificationCodeChange: (value: string) => void;
}