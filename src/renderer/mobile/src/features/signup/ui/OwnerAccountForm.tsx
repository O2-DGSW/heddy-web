import { font, lightTheme } from '@design-tokens';
import { Link } from 'react-router-dom';
import type { OwnerAccountForm as OwnerAccountFormType } from '@/features/signup/model/types';
import { useAccountForm } from '@/features/signup/model/useAccountForm';
import { AccountFormFields } from '@/features/signup/ui/AccountFormFields';

interface OwnerAccountFormProps {
  form: OwnerAccountFormType;
  onChange: (form: OwnerAccountFormType) => void;
  onNext: () => void;
}

export const OwnerAccountForm = ({ form, onChange, onNext }: OwnerAccountFormProps) => {
  const { isValid, canRequestVerification, showPasswordError, showPhoneError, submitted, handleNext } =
    useAccountForm(form, !!form.representativeName, onNext);

  const showRepresentativeNameError = submitted && !form.representativeName;

  const inputStyle = {
    backgroundColor: lightTheme.background.neutral,
    color: lightTheme.label.normal,
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <AccountFormFields
        form={form}
        showPasswordError={showPasswordError}
        showPhoneError={showPhoneError}
        canRequestVerification={canRequestVerification}
        onChange={v => onChange({ ...form, ...v })}
        middleSlot={
          <div className="flex flex-col gap-1">
            <p className={`${font.label.medium} pl-2`} style={{ color: lightTheme.label.assistive }}>대표자명</p>
            <input
              className={`w-full px-4 py-4 rounded-xl focus:outline-none ${font.caption.regular}`}
              style={inputStyle}
              placeholder="대표자명"
              value={form.representativeName}
              onChange={e => onChange({ ...form, representativeName: e.target.value })}
            />
            {showRepresentativeNameError && (
              <p className={`${font.caption.regular} pl-2`} style={{ color: lightTheme.status.error }}>
                대표자명을 입력해주세요.
              </p>
            )}
          </div>
        }
      />

      <button
        className={`w-full py-4 rounded-2xl mt-2 ${font.headline2.semiBold}`}
        style={{
          backgroundColor: isValid ? lightTheme.primary.normal : lightTheme.fill.neutral,
          color: isValid ? lightTheme.fill.normal : lightTheme.label.assistive,
        }}
        disabled={!isValid}
        onClick={handleNext}
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