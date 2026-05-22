import { lightTheme } from "@design-tokens";

import loginCharacter from "@/features/auth/login/assets/images/login-character.png";
import { TermsAgreement } from "@/features/auth/signup";

const SignupTermsPage = () => {
  return (
    <section className="flex min-h-[calc(100vh-72px)] w-full justify-center px-5">
      <div className="flex w-[357px] max-w-full flex-col items-center pt-[26px] [@media(max-height:900px)]:pt-4">
        <div className="flex flex-col items-center gap-8 [@media(max-height:900px)]:gap-5">
          <img
            src={loginCharacter}
            alt=""
            className="size-[104px] object-contain"
            aria-hidden="true"
          />

          <h1
            className="text-center font-['Pretendard'] text-base font-medium leading-[130%]"
            style={{ color: lightTheme.label.assistive }}
          >
            heddy에 오신 것을 환영해요!
          </h1>
        </div>

        <div className="mt-[74px] w-full [@media(max-height:900px)]:mt-12">
          <TermsAgreement />
        </div>
      </div>
    </section>
  );
};

export { SignupTermsPage };
