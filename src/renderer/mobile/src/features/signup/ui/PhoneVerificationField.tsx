import { font, lightTheme } from '@design-tokens';
import type { Carrier } from '../model/types';
import { CARRIERS } from '../constants/signup';
import { RadioButton } from '@/private/shared/ui/radio/RadioButton';

interface Props {
  carrier: Carrier;
  phone: string;
  verificationCode: string;
  onCarrierChange: (carrier: Carrier) => void;
  onPhoneChange: (value: string) => void;
  onVerificationCodeChange: (value: string) => void;
}

export const PhoneVerificationField = ({
  carrier,
  phone,
  verificationCode,
  onCarrierChange,
  onPhoneChange,
  onVerificationCodeChange,
}: Props) => {
  const inputStyle = {
    backgroundColor: lightTheme.background.neutral,
    color: lightTheme.label.normal,
  };

  return (
    <div className="flex flex-col gap-2">
      <p className={`${font.label.medium} pl-2`} style={{ color: lightTheme.label.assistive }}>휴대폰 번호</p>
      <div className="flex gap-3 flex-wrap">
        {CARRIERS.map(c => (
          <RadioButton
            key={c}
            label={c}
            selected={carrier === c}
            onClick={() => onCarrierChange(c)}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className={`flex-1 px-4 py-4 rounded-xl focus:outline-none ${font.caption.regular}`}
          style={inputStyle}
          placeholder="휴대폰 번호"
          value={phone}
          onChange={e => onPhoneChange(e.target.value)}
        />
        <button
          className={`px-4 py-4 rounded-xl ${font.caption.medium}`}
          style={{ backgroundColor: lightTheme.fill.neutral, color: lightTheme.label.assistive }}
        >
          인증번호
        </button>
      </div>
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