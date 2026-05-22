import { font, lightTheme } from '@design-tokens';
import type { Carrier, MvnoCarrier } from '@/features/auth/signup/model/types';
import { MAIN_CARRIERS, MVNO_CARRIERS } from '@/features/auth/signup/constants/signup';
import { RadioButton } from '@/private/shared/ui/radio/RadioButton';
import { formatPhone } from '@/private/shared/utils/formatPhone';
import type { PhoneVerificationFieldProps as Props } from '@/features/auth/signup/ui/types';

const MVNO_SET = new Set<string>(MVNO_CARRIERS);
const isMvno = (c: Carrier): c is MvnoCarrier => MVNO_SET.has(c);

export const PhoneVerificationField = ({
  carrier,
  phone,
  verificationCode,
  canRequestVerification,
  showPhoneError = false,
  onCarrierChange,
  onPhoneChange,
  onVerificationCodeChange,
}: Props) => {
  const inputStyle = {
    backgroundColor: lightTheme.background.neutral,
    color: lightTheme.label.normal,
  };

  const isAlddulSelected = isMvno(carrier);

  return (
    <div className="flex flex-col gap-2">
      <p className={`${font.label.medium} pl-2`} style={{ color: lightTheme.label.assistive }}>휴대폰 번호</p>
      <div className="flex items-center gap-9 flex-wrap ml-2">
        {MAIN_CARRIERS.map(c => (
          <RadioButton
            key={c}
            label={c}
            selected={carrier === c}
            onClick={() => onCarrierChange(c)}
          />
        ))}
        <select
          className={`focus:outline-none bg-transparent ${font.caption.medium}`}
          style={{ color: isAlddulSelected ? lightTheme.primary.normal : lightTheme.label.assistive }}
          value={isAlddulSelected ? carrier : ''}
          onChange={e => onCarrierChange(e.target.value as MvnoCarrier)}
        >
          <option value="" disabled>알뜰폰</option>
          {MVNO_CARRIERS.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <input
          className={`flex-1 px-4 py-4 rounded-xl focus:outline-none ${font.caption.regular}`}
          style={inputStyle}
          placeholder="휴대폰 번호"
          value={phone}
          onChange={e => onPhoneChange(formatPhone(e.target.value))}
        />
        <button
          className={`px-6 py-4 rounded-xl ${font.label.medium}`}
          style={{
            backgroundColor: canRequestVerification ? lightTheme.primary.normal : lightTheme.line.alternative,
            color: canRequestVerification ? lightTheme.fill.normal : lightTheme.line.normal,
          }}
          disabled={!canRequestVerification}
        >
          인증번호
        </button>
      </div>
      {showPhoneError && (
        <p className={`${font.caption.regular} pl-2`} style={{ color: lightTheme.status.error }}>
          올바른 휴대폰 번호를 입력해주세요.
        </p>
      )}
      <input
        className={`w-full px-4 py-4 rounded-xl focus:outline-none ${font.caption.regular}`}
        style={inputStyle}
        placeholder="인증번호"
        value={verificationCode}
        onChange={e => onVerificationCodeChange(e.target.value)}
      />
    </div>
  );
};
