import { Link } from "react-router-dom";
import { lightTheme } from "@design-tokens";

const LoginForm = () => {
  const inputStyle = {
    backgroundColor: lightTheme.background.neutral,
    color: lightTheme.label.neutral,
  };

  return (
    <form className="flex w-full flex-col" aria-label="로그인">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="login-id"
          className="pl-0.5 font-['Pretendard'] text-sm font-medium leading-[130%]"
          style={{ color: lightTheme.label.assistive }}
        >
          아이디
        </label>
        <input
          id="login-id"
          name="id"
          type="text"
          placeholder="아이디"
          className="h-[47px] rounded-[10px] px-3.5 font-['Pretendard'] text-xs font-normal leading-[130%] outline-none placeholder:text-[#c1c2c3] focus:ring-2 focus:ring-[#41be8e]/30"
          style={inputStyle}
        />
      </div>

      <div className="mt-6 flex flex-col gap-1">
        <label
          htmlFor="login-password"
          className="pl-0.5 font-['Pretendard'] text-sm font-medium leading-[130%]"
          style={{ color: lightTheme.label.assistive }}
        >
          비밀번호
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          placeholder="비밀번호"
          className="h-[47px] rounded-[10px] px-3.5 font-['Pretendard'] text-xs font-normal leading-[130%] outline-none placeholder:text-[#c1c2c3] focus:ring-2 focus:ring-[#41be8e]/30"
          style={inputStyle}
        />
      </div>

      <nav
        className="mt-[25px] flex justify-center gap-1 font-['Pretendard'] text-xs font-medium leading-[130%]"
        style={{ color: lightTheme.label.assistive }}
        aria-label="계정 찾기"
      >
        <Link to="/find-id" className="hover:opacity-80">
          아이디찾기
        </Link>
        <span>·</span>
        <Link to="/find-password" className="hover:opacity-80">
          비밀번호 찾기
        </Link>
        <span>·</span>
        <Link to="/signup" className="hover:opacity-80">
          회원가입
        </Link>
      </nav>

      <button
        type="submit"
        className="mt-[clamp(46px,6.5vh,64px)] h-12 rounded-[10px] font-['Pretendard'] text-lg font-semibold leading-[130%] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#41be8e]/40 focus:ring-offset-2"
        style={{ backgroundColor: lightTheme.primary.normal, color: lightTheme.fill.normal }}
      >
        로그인
      </button>
    </form>
  );
};

export { LoginForm };
