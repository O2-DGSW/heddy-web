import { useEffect } from "react";
import { lightTheme } from "@design-tokens";

import loadingCloud from "@/features/auth/signup/assets/images/loading-cloud.png";
import loadingCharacter from "@/features/auth/signup/assets/images/loading-character.png";
import "@/features/auth/signup/styles/signup-loading.css";

interface SignupLoadingScreenProps {
  onComplete: () => void;
}

const LOADING_DURATION_MS = 1800;

const SignupLoadingScreen = ({ onComplete }: SignupLoadingScreenProps) => {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, LOADING_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <section className="relative flex min-h-[calc(100vh-72px)] w-full items-center justify-center overflow-hidden bg-white px-5">
      <div className="heddy-loading-clouds" aria-hidden="true">
        <img
          src={loadingCloud}
          alt=""
          className="heddy-loading-cloud heddy-loading-cloud-one"
        />
        <img
          src={loadingCloud}
          alt=""
          className="heddy-loading-cloud heddy-loading-cloud-two"
        />
        <img
          src={loadingCloud}
          alt=""
          className="heddy-loading-cloud heddy-loading-cloud-three"
        />
        <img
          src={loadingCloud}
          alt=""
          className="heddy-loading-cloud heddy-loading-cloud-four"
        />
        <img
          src={loadingCloud}
          alt=""
          className="heddy-loading-cloud heddy-loading-cloud-five"
        />
        <img
          src={loadingCloud}
          alt=""
          className="heddy-loading-cloud heddy-loading-cloud-six"
        />
        <img
          src={loadingCloud}
          alt=""
          className="heddy-loading-cloud heddy-loading-cloud-seven"
        />
        <img
          src={loadingCloud}
          alt=""
          className="heddy-loading-cloud heddy-loading-cloud-eight"
        />
        <img
          src={loadingCloud}
          alt=""
          className="heddy-loading-cloud heddy-loading-cloud-nine"
        />
      </div>

      <div className="relative z-10 flex w-[196px] -translate-y-8 flex-col items-center gap-8">
        <div className="relative flex h-[180px] w-[180px] items-start justify-center">
          <img
            src={loadingCharacter}
            alt=""
            className="heddy-loading-character relative z-10 size-[172px] rounded-[26px] object-cover"
            aria-hidden="true"
          />
        </div>

        <p
          className="heddy-loading-text w-full text-center font-['Pretendard'] text-2xl font-medium leading-[130%] tracking-[-0.48px]"
          style={{ color: lightTheme.label.alternative }}
          role="status"
          aria-live="polite"
        >
          로딩중...
        </p>
      </div>
    </section>
  );
};

export { SignupLoadingScreen };
