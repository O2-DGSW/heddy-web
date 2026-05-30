import { lightTheme } from "@design-tokens";

import loginCharacter from "@/features/auth/login/assets/images/login-character.png";
import { LoginForm, SocialLogin } from "@/features/auth/login";

const LoginPage = () => {
  return (
    <section className="flex min-h-[calc(100vh-72px)] w-full justify-center px-5">
      <div className="flex w-[354px] flex-col items-center pt-[clamp(0px,calc((100vh-720px)*0.366),96px)] max-[420px]:w-full">
        <img
          src={loginCharacter}
          alt=""
          className="size-[104px] object-contain"
          aria-hidden="true"
        />

        <h1
          className="mt-8 text-center font-['Pretendard'] text-base font-medium leading-[130%]"
          style={{ color: lightTheme.label.assistive }}
        >
          heddy에 오신 것을 환영해요!
        </h1>

        <div className="mt-[clamp(48px,7.5vh,74px)] w-full">
          <LoginForm />
          <SocialLogin />
        </div>
      </div>
    </section>
  );
};

export { LoginPage };
