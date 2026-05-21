import { socialLoginItems } from "@/features/login/constants/socialLoginItems";

const SocialLogin = () => {
  return (
    <section className="mt-[26px] w-full" aria-label="소셜 로그인">
      <div className="flex h-7 items-center justify-center gap-2.5 overflow-hidden font-['Pretendard'] text-xs font-normal leading-[130%] text-[#dadbdc]">
        <div className="h-px flex-1 bg-[#dadbdc]" />
        <span className="whitespace-nowrap">또는 다음으로 로그인</span>
        <div className="h-px flex-1 bg-[#dadbdc]" />
      </div>

      <div className="mt-[clamp(20px,2.7vh,26px)] flex justify-center gap-6">
        {socialLoginItems.map(({ label, icon, iconClassName }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            className="flex size-10 items-center justify-center rounded-full overflow-visible transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#41be8e]/35 focus:ring-offset-2"
          >
            <img src={icon} alt="" className={iconClassName} />
          </button>
        ))}
      </div>
    </section>
  );
};

export { SocialLogin };
