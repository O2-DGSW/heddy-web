import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { OwnerAccountForm, OwnerShopForm, TermsAgreement } from "@/features/auth/signup";
import type {
  OwnerAccountFormValues,
  OwnerShopFormValues,
  SignupStep,
} from "@/features/auth/signup/model/types";
import { SignupLayout } from "@/features/auth/signup/ui/SignupLayout";
import { LoadingScreen } from "@/shared/ui/loading";

const initialAccountForm: OwnerAccountFormValues = {
  id: "",
  password: "",
  passwordConfirm: "",
  representativeName: "",
  carrier: "SKT",
  phone: "",
  verificationCode: "",
};

const initialShopForm: OwnerShopFormValues = {
  shopName: "",
  address: "",
  addressDetail: "",
  category: "",
  landline: "",
  businessNumber: "",
};

const SignupTermsPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<SignupStep>("terms");
  const [isLoading, setIsLoading] = useState(false);
  const [accountForm, setAccountForm] = useState<OwnerAccountFormValues>(initialAccountForm);
  const [shopForm, setShopForm] = useState<OwnerShopFormValues>(initialShopForm);

  if (isLoading) {
    return <LoadingScreen onComplete={() => navigate("/login")} />;
  }

  return (
    <SignupLayout step={step}>
      {step === "terms" && <TermsAgreement onNext={() => setStep("account")} />}

      {step === "account" && (
        <OwnerAccountForm
          form={accountForm}
          onChange={setAccountForm}
          onNext={() => setStep("shop")}
        />
      )}

      {step === "shop" && (
        <OwnerShopForm form={shopForm} onChange={setShopForm} onNext={() => setIsLoading(true)} />
      )}
    </SignupLayout>
  );
};

export { SignupTermsPage };
