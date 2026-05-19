import { font, lightTheme } from '@design-tokens';

interface Props {
  password: string;
  passwordConfirm: string;
  showError?: boolean;
  onPasswordChange: (value: string) => void;
  onPasswordConfirmChange: (value: string) => void;
}

export const PasswordFields = ({ password, passwordConfirm, showError = false, onPasswordChange, onPasswordConfirmChange }: Props) => {
  const inputStyle = {
    backgroundColor: lightTheme.background.neutral,
    color: lightTheme.label.normal,
  };

  return (
    <div className="flex flex-col gap-1">
      <p className={`${font.label.medium} pl-2`} style={{ color: lightTheme.label.assistive }}>비밀 번호</p>
      <input
        type="password"
        className={`w-full px-4 py-4 mb-[3px] rounded-xl focus:outline-none ${font.caption.regular}`}
        style={inputStyle}
        placeholder="비밀 번호"
        value={password}
        onChange={e => onPasswordChange(e.target.value)}
      />
      <input
        type="password"
        className={`w-full px-4 py-4 rounded-xl focus:outline-none ${font.caption.regular}`}
        style={inputStyle}
        placeholder="비밀 번호 확인"
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