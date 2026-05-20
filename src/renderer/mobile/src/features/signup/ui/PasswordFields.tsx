import { font, lightTheme } from '@design-tokens';
import type { PasswordFieldsProps as Props } from '@/features/signup/ui/types';

export const PasswordFields = ({ password, passwordConfirm, showError = false, onPasswordChange, onPasswordConfirmChange }: Props) => {
  const inputStyle = {
    backgroundColor: lightTheme.background.neutral,
    color: lightTheme.label.normal,
  };

  return (
    <div className="flex flex-col gap-1">
      <p className={`${font.label.medium} pl-2`} style={{ color: lightTheme.label.assistive }}>비밀번호</p>
      <input
        type="password"
        className={`w-full px-4 py-4 mb-[3px] rounded-xl focus:outline-none ${font.caption.regular}`}
        style={inputStyle}
        placeholder="비밀번호"
        value={password}
        onChange={e => onPasswordChange(e.target.value)}
      />
      <input
        type="password"
        className={`w-full px-4 py-4 rounded-xl focus:outline-none ${font.caption.regular}`}
        style={inputStyle}
        placeholder="비밀번호 확인"
        value={passwordConfirm}
        onChange={e => onPasswordConfirmChange(e.target.value)}
      />
      {showError && (
        <p className={`${font.caption.regular} pl-2`} style={{ color: lightTheme.status.error }}>
          비밀번호가 일치하지 않습니다.
        </p>
      )}
    </div>
  );
};