import { font, lightTheme } from '@design-tokens';
import type { Carrier } from '../model/types';
import { CARRIERS } from '../constants/signup';

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
          <button
            key={c}
            className={`flex items-center gap-1 ${font.caption.medium}`}
            style={{ color: carrier === c ? lightTheme.primary.normal : lightTheme.label.assistive }}
            onClick={() => onCarrierChange(c)}
          >
            <div
              className="w-4 h-4 rounded-full border-2"
              style={{
                borderColor: carrier === c ? lightTheme.primary.normal : lightTheme.line.normal,
                backgroundColor: carrier === c ? lightTheme.primary.normal : 'transparent',
              }}
            />
            {c}
          </button>
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