import { lightTheme } from "@design-tokens";

import {
  fieldLabelClassName,
  inputClassName,
  inputStyle,
  primaryRingStyle,
} from "@/features/auth/signup/ui/SignupFormControls";
import type { PasswordFieldsProps } from "@/features/auth/signup/ui/types";

const PasswordFields = ({
  password,
  passwordConfirm,
  onPasswordChange,
  onPasswordConfirmChange,
}: PasswordFieldsProps) => (
  <div className="mt-6 flex flex-col gap-1">
    <label
      htmlFor="signup-owner-password"
      className={fieldLabelClassName}
      style={{ color: lightTheme.label.assistive }}
    >
      비밀번호
    </label>
    <div className="flex flex-col gap-1.5">
      <input
        id="signup-owner-password"
        name="password"
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(event) => onPasswordChange(event.target.value)}
        className={inputClassName}
        style={{ ...primaryRingStyle, ...inputStyle }}
      />
      <input
        id="signup-owner-password-confirm"
        name="passwordConfirm"
        type="password"
        placeholder="비밀번호 확인"
        value={passwordConfirm}
        onChange={(event) => onPasswordConfirmChange(event.target.value)}
        className={inputClassName}
        style={{ ...primaryRingStyle, ...inputStyle }}
      />
    </div>
  </div>
);

export { PasswordFields };
