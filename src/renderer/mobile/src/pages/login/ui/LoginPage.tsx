import { lightTheme, font } from '@design-tokens'

export const LoginPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-6"
      style={{ backgroundColor: lightTheme.background.normal }}
    >
      <div className="flex flex-col items-center gap-2 mb-14">
        <img src="/heddy_logo.svg" alt="heddy" className="w-40" />
        <p className={font.body.medium} style={{ color: lightTheme.label.assistive }}>
          로그인
        </p>
      </div>

    </div>
  )
}
