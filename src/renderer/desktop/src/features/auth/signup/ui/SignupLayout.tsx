import type { ReactNode } from "react";
import { lightTheme } from "@design-tokens";

import loginCharacter from "@/features/auth/login/assets/images/login-character.png";
import type { SignupStep } from "@/features/auth/signup/model/types";

interface SignupLayoutProps {
  children: ReactNode;
  step: SignupStep;
}

const compactLayout = {
  containerPadding: "pt-[clamp(0px,calc((100vh-863px)*0.151),18px)]",
  characterSize: "size-[clamp(52px,8vh,104px)]",
  titleMargin: "mt-[clamp(8px,2vh,32px)]",
  contentMargin: "mt-[clamp(6px,1.8vh,44px)]",
};

const termsLayout = {
  containerPadding: "pt-[clamp(0px,calc((100vh-720px)*0.12),18px)]",
  characterSize: "size-[clamp(52px,8vh,104px)]",
  titleMargin: "mt-[clamp(8px,2vh,32px)]",
  contentMargin: "mt-[clamp(8px,2vh,54px)]",
};

const SignupLayout = ({ children, step }: SignupLayoutProps) => {
  const layout = step === "terms" ? termsLayout : compactLayout;

  return (
    <section className="flex h-full w-full justify-center px-5 pb-[clamp(12px,3vh,40px)] max-[420px]:px-4">
      <div
        className={`flex min-h-0 w-[354px] origin-top flex-col items-center max-[420px]:w-full [@media(max-height:700px)]:scale-[0.93] [@media(max-height:620px)]:scale-[0.86] ${layout.containerPadding}`}
      >
        <img
          src={loginCharacter}
          alt=""
          className={`${layout.characterSize} object-contain`}
          aria-hidden="true"
        />

        <h1
          className={`${layout.titleMargin} text-center font-['Pretendard'] text-base font-medium leading-[130%]`}
          style={{ color: lightTheme.label.assistive }}
        >
          heddy에 오신 것을 환영해요!
        </h1>

        <div className={`${layout.contentMargin} w-full`}>{children}</div>
      </div>
    </section>
  );
};

export { SignupLayout };
