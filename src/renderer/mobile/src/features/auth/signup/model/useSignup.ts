import { useState } from "react";
import type {
  MemberType,
  SignupStep,
  CustomerAccountForm,
  OwnerAccountForm,
  ShopForm,
} from "./types";

export const useSignup = () => {
  const [step, setStep] = useState<SignupStep>("type-select");
  const [memberType, setMemberType] = useState<MemberType | null>(null);

  const [customerForm, setCustomerForm] = useState<CustomerAccountForm>({
    id: "",
    password: "",
    passwordConfirm: "",
    carrier: "SKT",
    phone: "",
    verificationCode: "",
  });

  const [ownerForm, setOwnerForm] = useState<OwnerAccountForm>({
    id: "",
    password: "",
    passwordConfirm: "",
    representativeName: "",
    carrier: "SKT",
    phone: "",
    verificationCode: "",
  });

  const [shopForm, setShopForm] = useState<ShopForm>({
    shopName: "",
    address: "",
    addressDetail: "",
    category: "",
    landline: "",
    businessNumber: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const selectMemberType = (type: MemberType) => {
    setMemberType(type);
    setStep("account");
  };

  const nextStep = () => {
    if (step === "account" && memberType === "owner") setStep("shop");
    else if (step === "account") setStep("terms");
    else if (step === "shop") setStep("terms");
  };

  const submitSignup = async () => {
    setIsLoading(true);
    // TODO: API 연동
    // memberType === 'owner' ? { ...ownerForm, ...shopForm } : customerForm
    console.log("submitSignup", { memberType, customerForm, ownerForm, shopForm });
  };

  return {
    step,
    memberType,
    customerForm,
    setCustomerForm,
    ownerForm,
    setOwnerForm,
    shopForm,
    setShopForm,
    selectMemberType,
    nextStep,
    submitSignup,
    isLoading,
  };
};
