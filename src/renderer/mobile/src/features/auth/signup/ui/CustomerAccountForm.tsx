import { font, lightTheme } from '@design-tokens';
import { Link } from 'react-router-dom';
import type { CustomerAccountForm as CustomerAccountFormType } from '@/features/auth/signup/model/types';
import { useAccountForm } from '@/features/auth/signup/model/useAccountForm';
import { AccountFormFields } from '@/features/auth/signup/ui/AccountFormFields';

interface CustomerAccountFormProps {
  form: CustomerAccountFormType;
  onChange: (form: CustomerAccountFormType) => void;
  onNext: () => void;
}

export const CustomerAccountForm = ({ form, onChange, onNext }: CustomerAccountFormProps) => {
  const { isValid, canRequestVerification, showPasswordError, showPhoneError, handleNext } =
    useAccountForm(form, true, onNext);

  return (
    <div className="flex flex-col w-full gap-4">
      <AccountFormFields
        form={form}
        showPasswordError={showPasswordError}
        showPhoneError={showPhoneError}
        canRequestVerification={canRequestVerification}
        onChange={onChange}
      />

      <button
        className={`w-full py-4 rounded-2xl mt-2 ${font.headline2.semiBold}`}
        style={{
          backgroundColor: isValid ? lightTheme.primary.normal : lightTheme.fill.neutral,
          color: isValid ? lightTheme.fill.normal : lightTheme.label.disable,
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