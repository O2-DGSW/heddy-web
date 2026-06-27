import { useMemo } from "react";
import { lightTheme } from "@design-tokens";

import {
  SignupFooter,
  SignupTextField,
} from "@/features/auth/signup/ui/SignupFormControls";
import {
  isValidLoginId,
  isValidPassword,
  isValidPhoneNumber,
  isValidVerificationCode,
} from "@/features/auth/signup/model/validation";
import { PasswordFields } from "@/features/auth/signup/ui/PasswordFields";
import { PhoneVerificationField } from "@/features/auth/signup/ui/PhoneVerificationField";
import type {
  OwnerAccountFormProps,
  VerificationMessageTone,
} from "@/features/auth/signup/ui/types";

const OwnerAccountForm = ({
  form,
  isPhoneVerified,
  isVerificationSent,
  isSendingVerification,
  isVerifyingCode,
  verificationMessage,
  verificationMessageTone,
  onChange,
  onNext,
  onSendVerification,
  onVerifyCode,
}: OwnerAccountFormProps) => {
  const passwordErrorMessage = useMemo(() => {
    if (!form.password && !form.passwordConfirm) return null;
    if (!isValidPassword(form.password)) {
      return "비밀번호는 영문, 숫자, 특수문자를 포함해 8자 이상 입력해주세요.";
    }
    if (form.passwordConfirm && form.password !== form.passwordConfirm) {
      return "비밀번호가 일치하지 않습니다.";
    }
    return null;
  }, [form.password, form.passwordConfirm]);

  const loginIdErrorMessage =
    form.id && !isValidLoginId(form.id)
      ? "아이디는 4자 이상 20자 이하로 입력해주세요."
      : null;

  const phoneErrorMessage =
    form.phone && !isValidPhoneNumber(form.phone) ? "올바른 휴대폰 번호를 입력해주세요." : null;

  const verificationCodeErrorMessage =
    form.verificationCode && !isValidVerificationCode(form.verificationCode)
      ? "인증번호 6자리를 입력해주세요."
      : null;

  const visibleVerificationMessage =
    phoneErrorMessage || verificationCodeErrorMessage || verificationMessage;
  const visibleVerificationMessageTone: VerificationMessageTone =
    phoneErrorMessage || verificationCodeErrorMessage ? "error" : verificationMessageTone;

  const canSendVerification = isValidPhoneNumber(form.phone);
  const canVerifyCode =
    isVerificationSent &&
    canSendVerification &&
    isValidVerificationCode(form.verificationCode) &&
    !isPhoneVerified;

  const isValid = useMemo(
    () =>
      Boolean(
        isValidLoginId(form.id) &&
          isValidPassword(form.password) &&
          form.password === form.passwordConfirm &&
          form.representativeName.trim() &&
          isValidPhoneNumber(form.phone) &&
          isValidVerificationCode(form.verificationCode) &&
          isPhoneVerified,
      ),
    [form, isPhoneVerified],
  );

  return (
    <form className="w-full" aria-label="오너 계정 정보">
      <div className="flex flex-col">
        <SignupTextField
          id="signup-owner-id"
          name="id"
          label="아이디"
          placeholder="아이디"
          value={form.id}
          onChange={(id) => onChange({ ...form, id })}
        />
        {loginIdErrorMessage && (
          <p
            className="mt-1 font-['Pretendard'] text-xs font-normal leading-[150%]"
            style={{ color: lightTheme.status.error }}
          >
            {loginIdErrorMessage}
          </p>
        )}

        <PasswordFields
          password={form.password}
          passwordConfirm={form.passwordConfirm}
          errorMessage={passwordErrorMessage}
          onPasswordChange={(password) => onChange({ ...form, password })}
          onPasswordConfirmChange={(passwordConfirm) => onChange({ ...form, passwordConfirm })}
        />

        <div className="mt-6">
          <SignupTextField
            id="signup-owner-name"
            name="representativeName"
            label="대표자명"
            placeholder="대표자명"
            value={form.representativeName}
            onChange={(representativeName) => onChange({ ...form, representativeName })}
          />
        </div>

        <PhoneVerificationField
          carrier={form.carrier}
          phone={form.phone}
          verificationCode={form.verificationCode}
          canSendVerification={canSendVerification}
          canVerifyCode={canVerifyCode}
          isSendingVerification={isSendingVerification}
          isVerifyingCode={isVerifyingCode}
          verificationMessage={visibleVerificationMessage}
          verificationMessageTone={visibleVerificationMessageTone}
          onCarrierChange={(carrier) => onChange({ ...form, carrier })}
          onPhoneChange={(phone) => onChange({ ...form, phone })}
          onVerificationCodeChange={(verificationCode) =>
            onChange({ ...form, verificationCode })
          }
          onSendVerification={onSendVerification}
          onVerifyCode={onVerifyCode}
        />
      </div>

      <SignupFooter
        disabled={!isValid || isSendingVerification || isVerifyingCode}
        onNext={onNext}
      />
    </form>
  );
};

export { OwnerAccountForm };
