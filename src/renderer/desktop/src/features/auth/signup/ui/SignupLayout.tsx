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
  characterSize: "size-[clamp(88px,calc(88px+(100vh-863px)*0.134),104px)]",
  titleMargin: "mt-[clamp(24px,calc(24px+(100vh-863px)*0.067),32px)]",
  contentMargin: "mt-[clamp(12px,calc(12px+(100vh-863px)*0.269),44px)]",
};

const termsLayout = {
  containerPadding: "pt-[18px] [@media(max-height:900px)]:pt-4",
  characterSize: "size-[104px]",
  titleMargin: "mt-8",
  contentMargin: "mt-[54px]",
};

const SignupLayout = ({ children, step }: SignupLayoutProps) => {
  const layout = step === "terms" ? termsLayout : compactLayout;

  return (
    <section className="flex min-h-[calc(100vh-72px)] w-full justify-center px-5">
      <div
        className={`flex w-[354px] flex-col items-center max-[420px]:w-full ${layout.containerPadding}`}
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
