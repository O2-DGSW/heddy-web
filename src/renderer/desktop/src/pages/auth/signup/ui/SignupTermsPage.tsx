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

const accountLayoutClassName =
  "pt-[clamp(0px,calc((100vh-863px)*0.151),18px)]";
const accountCharacterClassName =
  "size-[clamp(88px,calc(88px+(100vh-863px)*0.134),104px)]";
const accountTitleMarginClassName =
  "mt-[clamp(24px,calc(24px+(100vh-863px)*0.067),32px)]";
const accountFormMarginClassName =
  "mt-[clamp(12px,calc(12px+(100vh-863px)*0.269),44px)]";

const SignupTermsPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<SignupStep>("terms");
  const [accountForm, setAccountForm] = useState<OwnerAccountFormValues>(initialAccountForm);
  const [shopForm, setShopForm] = useState<OwnerShopFormValues>(initialShopForm);

  return (
    <section className="flex min-h-[calc(100vh-72px)] w-full justify-center px-5">
      <div
        className={`flex w-[354px] flex-col items-center max-[420px]:w-full ${
          step === "terms" ? "pt-[18px] [@media(max-height:900px)]:pt-4" : accountLayoutClassName
        }`}
      >
        <img
          src={loginCharacter}
          alt=""
          className={`${step === "terms" ? "size-[104px]" : accountCharacterClassName} object-contain`}
          aria-hidden="true"
        />

        <h1
          className={`${step === "terms" ? "mt-8" : accountTitleMarginClassName} text-center font-['Pretendard'] text-base font-medium leading-[130%]`}
          style={{ color: lightTheme.label.assistive }}
        >
          heddy에 오신 것을 환영해요!
        </h1>

        <div
          className={`${step === "terms" ? "mt-[54px]" : accountFormMarginClassName} w-full`}
        >
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
