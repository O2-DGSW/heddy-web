import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { lightTheme } from "@design-tokens";

import loginCharacter from "@/features/auth/login/assets/images/login-character.png";
import { OwnerAccountForm, OwnerShopForm, TermsAgreement } from "@/features/auth/signup";
import type {
  OwnerAccountFormValues,
  OwnerShopFormValues,
  SignupStep,
} from "@/features/auth/signup/model/types";

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
  const [accountForm, setAccountForm] = useState<OwnerAccountFormValues>(initialAccountForm);
  const [shopForm, setShopForm] = useState<OwnerShopFormValues>(initialShopForm);

  return (
    <section className="flex min-h-[calc(100vh-72px)] w-full justify-center px-5">
      <div className="flex w-[357px] max-w-full flex-col items-center pt-[18px] [@media(max-height:900px)]:pt-4">
        <div className="flex flex-col items-center gap-8 [@media(max-height:900px)]:gap-5">
          <img
            src={loginCharacter}
            alt=""
            className="size-[104px] object-contain"
            aria-hidden="true"
          />

          <h1
            className="text-center font-['Pretendard'] text-base font-medium leading-[130%]"
            style={{ color: lightTheme.label.assistive }}
          >
            heddy에 오신 것을 환영해요!
          </h1>
        </div>

        <div className={`${step === "terms" ? "mt-[74px]" : "mt-11"} w-full [@media(max-height:900px)]:mt-8`}>
          {step === "terms" && <TermsAgreement onNext={() => setStep("account")} />}

          {step === "account" && (
            <OwnerAccountForm
              form={accountForm}
              onChange={setAccountForm}
              onNext={() => setStep("shop")}
            />
          )}

          {step === "shop" && (
            <OwnerShopForm
              form={shopForm}
              onChange={setShopForm}
              onNext={() => navigate("/login")}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export { SignupTermsPage };
