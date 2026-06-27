import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ownerSignupApi, sendSmsApi, verifySmsApi } from "@/entities/auth/api/authApi";
import { OwnerAccountForm, OwnerShopForm, TermsAgreement } from "@/features/auth/signup";
import type {
  OwnerAccountFormValues,
  OwnerShopFormValues,
  SignupStep,
} from "@/features/auth/signup/model/types";
import {
  isValidPhoneNumber,
  isValidVerificationCode,
  toDigits,
} from "@/features/auth/signup/model/validation";
import type {
  OwnerSignupRequest,
  SmsPurpose,
} from "@/entities/auth/model/auth.types";
import type { VerificationMessageTone } from "@/features/auth/signup/ui/types";
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

const SMS_PURPOSE: SmsPurpose = "OWNER_SIGNUP";

const getErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};

const SignupTermsPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<SignupStep>("terms");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignupSubmitting, setIsSignupSubmitting] = useState(false);
  const [isSendingVerification, setIsSendingVerification] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState<string | null>(null);
  const [verificationMessageTone, setVerificationMessageTone] =
    useState<VerificationMessageTone>("info");
  const [signupErrorMessage, setSignupErrorMessage] = useState<string | null>(null);
  const [accountForm, setAccountForm] = useState<OwnerAccountFormValues>(initialAccountForm);
  const [shopForm, setShopForm] = useState<OwnerShopFormValues>(initialShopForm);

  const buildSignupRequest = (): OwnerSignupRequest => ({
    loginId: accountForm.id.trim(),
    password: accountForm.password,
    name: accountForm.representativeName.trim(),
    phoneNumber: toDigits(accountForm.phone),
    storeName: shopForm.shopName.trim(),
    roadAddress: shopForm.address.trim(),
    detailAddress: shopForm.addressDetail.trim(),
    landline: toDigits(shopForm.landline),
    businessNumber: toDigits(shopForm.businessNumber),
  });

  const handleAccountFormChange = (nextForm: OwnerAccountFormValues) => {
    const phoneChanged = accountForm.phone !== nextForm.phone;
    const carrierChanged = accountForm.carrier !== nextForm.carrier;
    const verificationCodeChanged = accountForm.verificationCode !== nextForm.verificationCode;

    setSignupErrorMessage(null);

    if (phoneChanged || carrierChanged) {
      setIsVerificationSent(false);
      setIsPhoneVerified(false);
      setVerificationMessage(null);
      setVerificationMessageTone("info");
    } else if (verificationCodeChanged) {
      setIsPhoneVerified(false);
      if (verificationMessageTone === "error" || isPhoneVerified) {
        setVerificationMessage(null);
        setVerificationMessageTone("info");
      }
    }

    setAccountForm(nextForm);
  };

  const handleShopFormChange = (nextForm: OwnerShopFormValues) => {
    setSignupErrorMessage(null);
    setShopForm(nextForm);
  };

  const handleSendVerification = async () => {
    if (!isValidPhoneNumber(accountForm.phone)) {
      setVerificationMessage("올바른 휴대폰 번호를 입력해주세요.");
      setVerificationMessageTone("error");
      return;
    }

    setSignupErrorMessage(null);
    setIsSendingVerification(true);
    try {
      await sendSmsApi({
        phoneNumber: toDigits(accountForm.phone),
        carrier: accountForm.carrier,
        purpose: SMS_PURPOSE,
      });
      setIsVerificationSent(true);
      setIsPhoneVerified(false);
      setVerificationMessage("인증번호를 발송했습니다.");
      setVerificationMessageTone("info");
    } catch (error) {
      setVerificationMessage(getErrorMessage(error, "인증번호 발송에 실패했습니다."));
      setVerificationMessageTone("error");
    } finally {
      setIsSendingVerification(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!isVerificationSent) {
      setVerificationMessage("인증번호를 먼저 발송해주세요.");
      setVerificationMessageTone("error");
      return;
    }
    if (!isValidPhoneNumber(accountForm.phone)) {
      setVerificationMessage("올바른 휴대폰 번호를 입력해주세요.");
      setVerificationMessageTone("error");
      return;
    }
    if (!isValidVerificationCode(accountForm.verificationCode)) {
      setVerificationMessage("인증번호 6자리를 입력해주세요.");
      setVerificationMessageTone("error");
      return;
    }

    setSignupErrorMessage(null);
    setIsVerifyingCode(true);
    try {
      await verifySmsApi({
        phoneNumber: toDigits(accountForm.phone),
        code: accountForm.verificationCode.trim(),
        purpose: SMS_PURPOSE,
      });
      setIsPhoneVerified(true);
      setVerificationMessage("휴대폰 인증이 완료되었습니다.");
      setVerificationMessageTone("success");
    } catch (error) {
      setIsPhoneVerified(false);
      setVerificationMessage(getErrorMessage(error, "인증번호 확인에 실패했습니다."));
      setVerificationMessageTone("error");
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const handleSubmitSignup = async () => {
    if (!isPhoneVerified) {
      setSignupErrorMessage("휴대폰 인증을 완료해주세요.");
      setStep("account");
      return;
    }

    setSignupErrorMessage(null);
    setIsSignupSubmitting(true);
    try {
      await ownerSignupApi(buildSignupRequest());
      setIsLoading(true);
    } catch (error) {
      setSignupErrorMessage(getErrorMessage(error, "회원가입에 실패했습니다."));
    } finally {
      setIsSignupSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => navigate("/login")} />;
  }

  return (
    <SignupLayout step={step}>
      {step === "terms" && <TermsAgreement onNext={() => setStep("account")} />}

      {step === "account" && (
        <OwnerAccountForm
          form={accountForm}
          isPhoneVerified={isPhoneVerified}
          isVerificationSent={isVerificationSent}
          isSendingVerification={isSendingVerification}
          isVerifyingCode={isVerifyingCode}
          verificationMessage={verificationMessage}
          verificationMessageTone={verificationMessageTone}
          onChange={handleAccountFormChange}
          onNext={() => {
            setSignupErrorMessage(null);
            setStep("shop");
          }}
          onSendVerification={handleSendVerification}
          onVerifyCode={handleVerifyCode}
        />
      )}

      {step === "shop" && (
        <OwnerShopForm
          form={shopForm}
          errorMessage={signupErrorMessage}
          isSubmitting={isSignupSubmitting}
          onChange={handleShopFormChange}
          onNext={handleSubmitSignup}
        />
      )}
    </SignupLayout>
  );
};

export { SignupTermsPage };
