const LoginForm = () => {
  return (
    <form className="flex w-full flex-col" aria-label="로그인">
      <div className="flex flex-col gap-0.5">
        <label htmlFor="login-id" className="pl-0.5 font-['Pretendard'] text-sm font-medium leading-[130%] text-[#76787A]">
          아이디
        </label>
        <input
          id="login-id"
          name="id"
          type="text"
          placeholder="아이디"
          className="h-[47px] rounded-[10px] bg-[#f7f7f7] px-3.5 font-['Pretendard'] text-xs font-normal leading-[130%] text-[#3c3e3f] outline-none placeholder:text-[#c1c2c3] focus:ring-2 focus:ring-[#41be8e]/30"
        />
      </div>

      <div className="mt-6 flex flex-col gap-0.5">
        <label htmlFor="login-password" className="pl-0.5 font-['Pretendard'] text-sm font-medium leading-[130%] text-[#76787A]">
          비밀번호
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          placeholder="비밀번호"
          className="h-[47px] rounded-[10px] bg-[#f7f7f7] px-3.5 font-['Pretendard'] text-xs font-normal leading-[130%] text-[#3c3e3f] outline-none placeholder:text-[#c1c2c3] focus:ring-2 focus:ring-[#41be8e]/30"
        />
      </div>

      <nav className="mt-[25px] flex justify-center gap-1 font-['Pretendard'] text-xs font-medium leading-[130%] text-[#76787A]" aria-label="계정 찾기">
        <a href="/find-id" className="hover:text-[#41be8e]">
          아이디찾기
        </a>
        <span>·</span>
        <a href="/find-password" className="hover:text-[#41be8e]">
          비밀번호 찾기
        </a>
        <span>·</span>
        <a href="/signup" className="hover:text-[#41be8e]">
          회원가입
        </a>
      </nav>

      <button
        type="submit"
        className="mt-[clamp(46px,6.5vh,64px)] h-12 rounded-[10px] bg-[#41be8e] font-['Pretendard'] text-lg font-semibold leading-[130%] text-[#f7f7f7] transition-colors hover:bg-[#36ad7f] focus:outline-none focus:ring-2 focus:ring-[#41be8e]/40 focus:ring-offset-2"
      >
        로그인
      </button>
    </form>
  );
};

export { LoginForm };
