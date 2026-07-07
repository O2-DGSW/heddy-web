import { font, lightTheme } from "@design-tokens";
import { useNavigate } from "react-router-dom";
import arrowSvg from "@/private/shared/ui/dialog/assets/Arrow.svg";
import {
  useSignup,
  SignupTypeSelect,
  TermsAgreement,
  CustomerAccountForm,
  OwnerAccountForm,
  ShopForm,
} from "@/features/auth/signup";
import { STEP_TITLE } from "@/features/auth/signup/constants/signup";
import { LoadingScreen } from "@/shared/ui/loading";

export const SignupPage = () => {
  const navigate = useNavigate();
  const {
    step,
    memberType,
    customerForm,
    setCustomerForm,
    ownerForm,
    setOwnerForm,
    shopForm,
    setShopForm,
    selectMemberType,
    nextStep,
    goBack,
    submitSignup,
    isLoading,
    error,
  } = useSignup();

  if (isLoading) {
    return <LoadingScreen onComplete={() => navigate("/login")} />;
  }

  return (
    <div
      className="relative h-full overflow-y-auto flex flex-col items-center px-6 pt-8"
      style={{ backgroundColor: lightTheme.background.normal }}
    >
      <div className="flex flex-col items-center gap-2 mb-8">
        <img src="/heddyIcon.svg" alt="heddy" className="w-50" />
        <div className="flex items-center gap-1">
          <button type="button" onClick={goBack} className="p-1 -ml-5">
            <img src={arrowSvg} alt="뒤로가기" className="w-4 h-4" />
          </button>
          <p className={font.body.medium} style={{ color: lightTheme.label.assistive }}>
            {STEP_TITLE[step]}
          </p>
        </div>
      </div>

      {step === "type-select" && <SignupTypeSelect onSelect={selectMemberType} />}

      {step === "terms" && (
        <>
          <TermsAgreement onSignup={submitSignup} />
          {error && (
            <p className={`${font.caption.regular} mt-2 text-center`} style={{ color: lightTheme.status.error }}>
              {error}
            </p>
          )}
        </>
      )}

      {step === "account" && memberType === "customer" && (
        <CustomerAccountForm form={customerForm} onChange={setCustomerForm} onNext={nextStep} />
      )}

      {step === "account" && memberType === "owner" && (
        <OwnerAccountForm form={ownerForm} onChange={setOwnerForm} onNext={nextStep} />
      )}

      {step === "shop" && <ShopForm form={shopForm} onChange={setShopForm} onNext={nextStep} />}
    </div>
  );
};
