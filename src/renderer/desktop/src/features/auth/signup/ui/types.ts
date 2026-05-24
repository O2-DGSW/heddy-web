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
