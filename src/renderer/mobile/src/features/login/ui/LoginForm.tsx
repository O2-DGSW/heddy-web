import { lightTheme, font } from "@design-tokens";
import { useLoginForm } from "../model/login";

export const LoginForm = () => {
  const { id, setId, password, setPassword, handleLogin } = useLoginForm();

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-1">
        <label
          className={`${font.label.medium} pl-2`}
          style={{ color: lightTheme.label.assistive }}
        >
          아이디
        </label>
        <input
          className={`w-full px-4 py-4 rounded-xl  focus:outline-none ${font.caption.regular}`}
          style={{
            backgroundColor: lightTheme.background.neutral,
            color: lightTheme.label.assistive,
          }}
          placeholder="아이디"
          value={id}
          onChange={e => setId(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          className={`${font.label.medium} pl-2`}
          style={{ color: lightTheme.label.assistive }}
        >
          비밀 번호
        </label>
        <input
          type="password"
          className={`w-full px-4 py-4 rounded-xl focus:outline-none ${font.caption.regular}`}
          style={{
            backgroundColor: lightTheme.fill.normal,
            color: lightTheme.label.assistive,
          }}
          placeholder="비밀 번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <button
        className={`w-full py-4 rounded-2xl mt-4 ${font.headline2.semiBold}`}
        style={{
          backgroundColor: lightTheme.primary.normal,
          color: lightTheme.fill.normal,
        }}
        onClick={handleLogin}
      >
        로그인
      </button>
    </div>
  );
};
