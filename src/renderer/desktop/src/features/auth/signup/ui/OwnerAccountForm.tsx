import {
  SignupFooter,
  SignupTextField,
} from "@/features/auth/signup/ui/SignupFormControls";
import { PasswordFields } from "@/features/auth/signup/ui/PasswordFields";
import { PhoneVerificationField } from "@/features/auth/signup/ui/PhoneVerificationField";
import type { OwnerAccountFormProps } from "@/features/auth/signup/ui/types";

const OwnerAccountForm = ({
  form,
  isPhoneVerified,
  isSendingVerification,
  isVerifyingCode,
  onChange,
  onNext,
  onSendVerification,
  onVerifyCode,
}: OwnerAccountFormProps) => {
  const canSendVerification = !isPhoneVerified;
  const canVerifyCode = !isPhoneVerified;

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

        <PasswordFields
          password={form.password}
          passwordConfirm={form.passwordConfirm}
          onPasswordChange={(password) => onChange({ ...form, password })}
          onPasswordConfirmChange={(passwordConfirm) => onChange({ ...form, passwordConfirm })}
        />

        <div className="mt-[clamp(10px,2.8vh,24px)]">
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
          onCarrierChange={(carrier) => onChange({ ...form, carrier })}
          onPhoneChange={(phone) => onChange({ ...form, phone })}
          onVerificationCodeChange={(verificationCode) =>
            onChange({ ...form, verificationCode })
          }
          onSendVerification={onSendVerification}
          onVerifyCode={onVerifyCode}
        />
      </div>

      <SignupFooter disabled={isSendingVerification || isVerifyingCode} onNext={onNext} />
    </form>
  );
};

export { OwnerAccountForm };
