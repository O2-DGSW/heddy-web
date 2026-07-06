import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, type ToastOptions } from "react-toastify";

import { ownerSignupApi, sendSmsApi, verifySmsApi } from "@/entities/auth/api/authApi";
import { OwnerAccountForm, OwnerShopForm, TermsAgreement } from "@/features/auth/signup";
import type {
  OwnerAccountFormValues,
  OwnerShopFormValues,
  SignupStep,
} from "@/features/auth/signup/model/types";
import {
  isValidLoginId,
  isValidPassword,
  isValidPhoneNumber,
  isValidVerificationCode,
  toDigits,
} from "@/features/auth/signup/model/validation";
import type {
  OwnerSignupRequest,
  SmsPurpose,
} from "@/entities/auth/model/auth.types";
import type { SignupFeedbackTone } from "@/features/auth/signup/ui/types";
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

const SIGNUP_TOAST_ID = "desktop-signup-toast";
const TOAST_ERROR_AUTO_CLOSE_MS = 1500;
const TOAST_FEEDBACK_AUTO_CLOSE_MS = 3000;

const toastOptions: ToastOptions = {
  toastId: SIGNUP_TOAST_ID,
  closeButton: false,
  draggable: false,
  hideProgressBar: false,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
};

const getToastAutoClose = (tone: SignupFeedbackTone) =>
  tone === "error" ? TOAST_ERROR_AUTO_CLOSE_MS : TOAST_FEEDBACK_AUTO_CLOSE_MS;

const SignupTermsPage = () => {
  const navigate = useNavigate();
  const accountFormRef = useRef<OwnerAccountFormValues>(initialAccountForm);
  const [step, setStep] = useState<SignupStep>("terms");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignupSubmitting, setIsSignupSubmitting] = useState(false);
  const [isSendingVerification, setIsSendingVerification] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [accountForm, setAccountForm] = useState<OwnerAccountFormValues>(initialAccountForm);
  const [shopForm, setShopForm] = useState<OwnerShopFormValues>(initialShopForm);

  const showToast = (message: string, tone: SignupFeedbackTone = "error") => {
    const autoClose = getToastAutoClose(tone);

    if (toast.isActive(SIGNUP_TOAST_ID)) {
      toast.update(SIGNUP_TOAST_ID, {
        ...toastOptions,
        autoClose,
        render: message,
        type: tone,
      });
      return;
    }

    toast(message, {
      ...toastOptions,
      autoClose,
      type: tone,
    });
  };

  const isCurrentPhoneRequest = (
    phoneNumber: string,
    carrier: OwnerAccountFormValues["carrier"],
  ) => {
    const currentForm = accountFormRef.current;

    return toDigits(currentForm.phone) === phoneNumber && currentForm.carrier === carrier;
  };

  const isCurrentVerificationRequest = (
    phoneNumber: string,
    carrier: OwnerAccountFormValues["carrier"],
    verificationCode: string,
  ) => {
    const currentForm = accountFormRef.current;

    return (
      isCurrentPhoneRequest(phoneNumber, carrier) &&
      currentForm.verificationCode.trim() === verificationCode
    );
  };

  const buildSignupRequest = (): OwnerSignupRequest => ({
    loginId: accountForm.id.trim(),
    password: accountForm.password,
    name: accountForm.representativeName.trim(),
    phoneNumber: toDigits(accountForm.phone),
    storeName: shopForm.shopName.trim(),
    roadAddress: shopForm.address.trim(),
    detailAddress: shopForm.addressDetail.trim(),
    category: shopForm.category,
    landline: toDigits(shopForm.landline),
    businessNumber: toDigits(shopForm.businessNumber),
  });

  const handleAccountFormChange = (nextForm: OwnerAccountFormValues) => {
    const phoneChanged = accountForm.phone !== nextForm.phone;
    const carrierChanged = accountForm.carrier !== nextForm.carrier;
    const verificationCodeChanged = accountForm.verificationCode !== nextForm.verificationCode;

    if (phoneChanged || carrierChanged) {
      setIsVerificationSent(false);
      setIsPhoneVerified(false);
    } else if (verificationCodeChanged) {
      setIsPhoneVerified(false);
    }

    accountFormRef.current = nextForm;
    setAccountForm(nextForm);
  };

  const handleShopFormChange = (nextForm: OwnerShopFormValues) => {
    setShopForm(nextForm);
  };

  const handleSendVerification = async () => {
    if (!isValidPhoneNumber(accountForm.phone)) {
      showToast("올바른 휴대폰 번호를 입력해주세요.");
      return;
    }

    setIsSendingVerification(true);
    const verificationPhoneNumber = toDigits(accountForm.phone);
    const verificationCarrier = accountForm.carrier;

    try {
      await sendSmsApi({
        phoneNumber: verificationPhoneNumber,
        carrier: verificationCarrier,
        purpose: SMS_PURPOSE,
      });
      if (!isCurrentPhoneRequest(verificationPhoneNumber, verificationCarrier)) return;

      setIsVerificationSent(true);
      setIsPhoneVerified(false);
      showToast("인증번호를 발송했습니다.", "info");
    } catch (error) {
      if (!isCurrentPhoneRequest(verificationPhoneNumber, verificationCarrier)) return;

      showToast(getErrorMessage(error, "인증번호 발송에 실패했습니다."));
    } finally {
      setIsSendingVerification(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!isVerificationSent) {
      showToast("인증번호를 먼저 발송해주세요.");
      return;
    }
    if (!isValidPhoneNumber(accountForm.phone)) {
      showToast("올바른 휴대폰 번호를 입력해주세요.");
      return;
    }
    if (!isValidVerificationCode(accountForm.verificationCode)) {
      showToast("인증번호 6자리를 입력해주세요.");
      return;
    }

    setIsVerifyingCode(true);
    const verificationPhoneNumber = toDigits(accountForm.phone);
    const verificationCarrier = accountForm.carrier;
    const verificationCode = accountForm.verificationCode.trim();

    try {
      await verifySmsApi({
        phoneNumber: verificationPhoneNumber,
        code: verificationCode,
        purpose: SMS_PURPOSE,
      });
      if (
        !isCurrentVerificationRequest(
          verificationPhoneNumber,
          verificationCarrier,
          verificationCode,
        )
      ) {
        return;
      }

      setIsPhoneVerified(true);
      showToast("휴대폰 인증이 완료되었습니다.", "success");
    } catch (error) {
      if (
        !isCurrentVerificationRequest(
          verificationPhoneNumber,
          verificationCarrier,
          verificationCode,
        )
      ) {
        return;
      }

      setIsPhoneVerified(false);
      showToast(getErrorMessage(error, "인증번호 확인에 실패했습니다."));
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const validateAccountForm = () => {
    if (!isValidLoginId(accountForm.id)) {
      return "아이디는 4자 이상 20자 이하로 입력해주세요.";
    }
    if (!isValidPassword(accountForm.password)) {
      return "비밀번호는 영문, 숫자, 특수문자를 포함해 8자 이상 입력해주세요.";
    }
    if (accountForm.password !== accountForm.passwordConfirm) {
      return "비밀번호가 일치하지 않습니다.";
    }
    if (!accountForm.representativeName.trim()) {
      return "대표자명을 입력해주세요.";
    }
    if (!isValidPhoneNumber(accountForm.phone)) {
      return "올바른 휴대폰 번호를 입력해주세요.";
    }
    if (!isVerificationSent) {
      return "인증번호를 먼저 발송해주세요.";
    }
    if (!isValidVerificationCode(accountForm.verificationCode)) {
      return "인증번호 6자리를 입력해주세요.";
    }
    if (!isPhoneVerified) {
      return "휴대폰 인증을 완료해주세요.";
    }

    return null;
  };

  const handleAccountNext = () => {
    const accountErrorMessage = validateAccountForm();
    if (accountErrorMessage) {
      showToast(accountErrorMessage);
      return;
    }

    setStep("shop");
  };

  const validateShopForm = () => {
    if (!shopForm.shopName.trim()) {
      return "상점명을 입력해주세요.";
    }
    if (!shopForm.address.trim()) {
      return "주소를 입력해주세요.";
    }
    if (!shopForm.addressDetail.trim()) {
      return "상세주소를 입력해주세요.";
    }
    if (!shopForm.category) {
      return "상점 카테고리를 선택해주세요.";
    }
    if (!shopForm.landline.trim()) {
      return "유선번호를 입력해주세요.";
    }
    if (!shopForm.businessNumber.trim()) {
      return "사업자등록번호를 입력해주세요.";
    }

    return null;
  };

  const handleSubmitSignup = async () => {
    if (!isPhoneVerified) {
      showToast("휴대폰 인증을 완료해주세요.");
      setStep("account");
      return;
    }

    const shopErrorMessage = validateShopForm();
    if (shopErrorMessage) {
      showToast(shopErrorMessage);
      return;
    }

    setIsSignupSubmitting(true);
    try {
      await ownerSignupApi(buildSignupRequest());
      setIsLoading(true);
    } catch (error) {
      const errorMessage = getErrorMessage(error, "회원가입에 실패했습니다.");
      showToast(errorMessage);
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
          isSendingVerification={isSendingVerification}
          isVerifyingCode={isVerifyingCode}
          onChange={handleAccountFormChange}
          onNext={handleAccountNext}
          onSendVerification={handleSendVerification}
          onVerifyCode={handleVerifyCode}
        />
      )}

      {step === "shop" && (
        <OwnerShopForm
          form={shopForm}
          isSubmitting={isSignupSubmitting}
          onChange={handleShopFormChange}
          onNext={handleSubmitSignup}
        />
      )}
    </SignupLayout>
  );
};

export { SignupTermsPage };
