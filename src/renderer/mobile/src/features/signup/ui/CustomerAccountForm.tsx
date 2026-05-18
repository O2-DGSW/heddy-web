import { font, lightTheme } from '@design-tokens';
import { Link } from 'react-router-dom';
import type { CustomerAccountForm as CustomerAccountFormType } from '../model/types';
import { PasswordFields } from './PasswordFields';
import { PhoneVerificationField } from './PhoneVerificationField';

interface Props {
  form: CustomerAccountFormType;
  onChange: (form: CustomerAccountFormType) => void;
  onNext: () => void;
}

export const CustomerAccountForm = ({ form, onChange, onNext }: Props) => {
  const inputStyle = {
    backgroundColor: lightTheme.background.neutral,
    color: lightTheme.label.normal,
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-col gap-1">
        <p className={`${font.label.medium} pl-2`} style={{ color: lightTheme.label.assistive }}>아이디</p>
        <div className="flex gap-2">
          <input
            className={`flex-1 px-4 py-4 rounded-xl focus:outline-none ${font.caption.regular}`}
            style={inputStyle}
            placeholder="아이디"
            value={form.id}
            onChange={e => onChange({ ...form, id: e.target.value })}
          />
          <button
            className={`px-4 py-4 rounded-xl ${font.caption.medium}`}
            style={{ backgroundColor: lightTheme.fill.neutral, color: lightTheme.label.assistive }}
          >
            중복확인
          </button>
        </div>
      </div>

      <PasswordFields
        password={form.password}
        passwordConfirm={form.passwordConfirm}
        onPasswordChange={v => onChange({ ...form, password: v })}
        onPasswordConfirmChange={v => onChange({ ...form, passwordConfirm: v })}
      />

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