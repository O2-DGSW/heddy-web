import { useMemo } from "react";

import {
  SignupFooter,
  SignupTextField,
} from "@/features/auth/signup/ui/SignupFormControls";
import { PasswordFields } from "@/features/auth/signup/ui/PasswordFields";
import { PhoneVerificationField } from "@/features/auth/signup/ui/PhoneVerificationField";
import type { OwnerAccountFormProps } from "@/features/auth/signup/ui/types";

const OwnerAccountForm = ({ form, onChange, onNext }: OwnerAccountFormProps) => {
  const isValid = useMemo(
    () =>
      Boolean(
        form.id.trim() &&
          form.password &&
          form.passwordConfirm &&
          form.password === form.passwordConfirm &&
          form.representativeName.trim() &&
          form.phone.trim() &&
          form.verificationCode.trim(),
      ),
    [form],
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

        <PasswordFields
          password={form.password}
          passwordConfirm={form.passwordConfirm}
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
          onCarrierChange={(carrier) => onChange({ ...form, carrier })}
          onPhoneChange={(phone) => onChange({ ...form, phone })}
          onVerificationCodeChange={(verificationCode) =>
            onChange({ ...form, verificationCode })
          }
        />
      </div>

      <SignupFooter disabled={!isValid} onNext={onNext} />
    </form>
  );
};

export { OwnerAccountForm };
