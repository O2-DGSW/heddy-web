import { font, lightTheme } from '@design-tokens';
import { Link } from 'react-router-dom';
import type { OwnerAccountForm as OwnerAccountFormType } from '../model/types';
import { PasswordFields } from './PasswordFields';
import { PhoneVerificationField } from './PhoneVerificationField';

interface Props {
  form: OwnerAccountFormType;
  onChange: (form: OwnerAccountFormType) => void;
  onNext: () => void;
}

export const OwnerAccountForm = ({ form, onChange, onNext }: Props) => {
  const inputStyle = {
    backgroundColor: lightTheme.background.neutral,
    color: lightTheme.label.normal,
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-col gap-1">
        <p className={`${font.label.medium} pl-2`} style={{ color: lightTheme.label.assistive }}>이메일</p>
        <input
          className={`w-full px-4 py-4 rounded-xl focus:outline-none ${font.caption.regular}`}
          style={inputStyle}
          placeholder="이메일"
          value={form.email}
          onChange={e => onChange({ ...form, email: e.target.value })}
        />
      </div>

      <PasswordFields
        password={form.password}
        passwordConfirm={form.passwordConfirm}
        onPasswordChange={v => onChange({ ...form, password: v })}
        onPasswordConfirmChange={v => onChange({ ...form, passwordConfirm: v })}
      />

      <div className="flex flex-col gap-1">
        <p className={`${font.label.medium} pl-2`} style={{ color: lightTheme.label.assistive }}>대표자명</p>
        <input
          className={`w-full px-4 py-4 rounded-xl focus:outline-none ${font.caption.regular}`}
          style={inputStyle}
          placeholder="대표자명"
          value={form.representativeName}
          onChange={e => onChange({ ...form, representativeName: e.target.value })}
        />
      </div>

      <PhoneVerificationField
        carrier={form.carrier}
        phone={form.phone}
        verificationCode={form.verificationCode}
        onCarrierChange={v => onChange({ ...form, carrier: v })}
        onPhoneChange={v => onChange({ ...form, phone: v })}
        onVerificationCodeChange={v => onChange({ ...form, verificationCode: v })}
      />

      <button
        className={`w-full py-4 rounded-2xl mt-2 ${font.headline2.semiBold}`}
        style={{ backgroundColor: lightTheme.primary.normal, color: lightTheme.fill.normal }}
        onClick={onNext}
      >
        다음으로
      </button>

      <div className={`flex justify-center gap-2 ${font.caption.regular}`} style={{ color: lightTheme.label.assistive }}>
        <span>이미 계정이 있으신가요?</span>
        <Link to="/login" style={{ color: lightTheme.primary.normal }}>로그인</Link>
      </div>
    </div>
  );
};