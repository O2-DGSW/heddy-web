import { font, lightTheme } from "@design-tokens";
import ArrowIcon from "@/features/profile/assets/edit/Arrow.svg";
import { useGetMyProfileQuery } from "@/entities/profile/api/query/useGetMyProfile.query";
import { useEditProfile } from "@/features/profile/model/edit/useEditProfile";
import { PasswordInput } from "@/private/shared/ui/password-input/PasswordInput";
import { formatPhone } from "@/private/shared/utils/formatPhone";

const inputStyle = { backgroundColor: lightTheme.background.neutral, color: lightTheme.label.normal };

export const EditSetting = () => {
  const { data: profile } = useGetMyProfileQuery();

  const {
    openSection, toggleSection,
    newPhone, handlePhoneChange,
    verificationCode, setVerificationCode,
    sms,
    savePhone,
    phoneError, phoneSuccess,
    currentPassword, setCurrentPassword,
    newPassword, setNewPassword,
    newPasswordConfirm, setNewPasswordConfirm,
    savePassword,
    passwordError, passwordSuccess,
    isLoading,
  } = useEditProfile();

  const labelStyle = { color: lightTheme.label.assistive };
  const valueStyle = { color: lightTheme.label.neutral };

  return (
    <div className="size-full px-[1.75rem] py-[2.25rem]">
      <div className="w-full rounded-[1rem]" style={{ backgroundColor: lightTheme.background.normal }}>
        <div className="flex flex-col gap-[1.725rem]">
          <p className={font.headline1.semiBold} style={{ color: lightTheme.label.neutral }}>
            기본 정보
          </p>

          {/* 이름 (읽기 전용) */}
          <div className="flex flex-row items-center justify-between">
            <span className={font.headline2.medium} style={labelStyle}>이름</span>
            <span className={font.headline2.medium} style={valueStyle}>{profile?.name ?? "-"}</span>
          </div>

          {/* 전화번호 */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center justify-between">
              <span className={font.headline2.medium} style={labelStyle}>전화번호</span>
              <div className="flex items-center gap-3">
                {phoneSuccess && (
                  <span className={font.caption.regular} style={{ color: lightTheme.status.success }}>변경 완료</span>
                )}
                <span className={font.headline2.medium} style={valueStyle}>
                  {profile?.phoneNumber ? formatPhone(profile.phoneNumber) : "-"}
                </span>
                <button
                  className="size-[1.25rem] shrink-0"
                  onClick={() => toggleSection("phone")}
                >
                  <img
                    className={`size-full transition-transform ${openSection === "phone" ? "rotate-90" : ""}`}
                    src={ArrowIcon}
                    alt="arrow"
                  />
                </button>
              </div>
            </div>

            {openSection === "phone" && (
              <div className="flex flex-col gap-2 pl-0">
                <div className="flex gap-2 w-full overflow-hidden">
                  <input
                    className={`min-w-0 flex-1 px-3 py-2 rounded-xl focus:outline-none ${font.caption.regular}`}
                    style={inputStyle}
                    placeholder="새 전화번호"
                    value={newPhone}
                    onChange={e => handlePhoneChange(e.target.value)}
                    inputMode="tel"
                  />
                  <button
                    className={`shrink-0 px-3 py-2 rounded-xl ${font.caption.medium}`}
                    style={{
                      backgroundColor: newPhone.replace(/\D/g, "").length >= 10 && !sms.isSending
                        ? lightTheme.primary.normal : lightTheme.line.alternative,
                      color: newPhone.replace(/\D/g, "").length >= 10 && !sms.isSending
                        ? lightTheme.fill.normal : lightTheme.line.normal,
                    }}
                    disabled={newPhone.replace(/\D/g, "").length < 10 || sms.isSending}
                    onClick={() => sms.sendCode(newPhone, "SKT")}
                  >
                    {sms.isSending ? "발송 중" : sms.isSent ? "재전송" : "인증번호"}
                  </button>
                </div>

                {sms.isSent && !sms.isVerified && (
                  <div className="flex gap-2 w-full overflow-hidden">
                    <input
                      className={`min-w-0 flex-1 px-3 py-2 rounded-xl focus:outline-none ${font.caption.regular}`}
                      style={inputStyle}
                      placeholder="인증번호 6자리"
                      value={verificationCode}
                      onChange={e => setVerificationCode(e.target.value)}
                      inputMode="numeric"
                    />
                    <button
                      className={`shrink-0 px-3 py-2 rounded-xl ${font.caption.medium}`}
                      style={{
                        backgroundColor: verificationCode.length > 0 && !sms.isVerifying
                          ? lightTheme.primary.normal : lightTheme.line.alternative,
                        color: verificationCode.length > 0 && !sms.isVerifying
                          ? lightTheme.fill.normal : lightTheme.line.normal,
                      }}
                      disabled={verificationCode.length === 0 || sms.isVerifying}
                      onClick={() => sms.verifyCode(newPhone, verificationCode)}
                    >
                      {sms.isVerifying ? "확인 중" : "확인"}
                    </button>
                  </div>
                )}

                {sms.isVerified && (
                  <p className={font.caption.regular} style={{ color: lightTheme.status.success }}>
                    인증이 완료되었습니다.
                  </p>
                )}
                {sms.smsError && (
                  <p className={font.caption.regular} style={{ color: lightTheme.status.error }}>
                    {sms.smsError}
                  </p>
                )}
                {phoneError && (
                  <p className={font.caption.regular} style={{ color: lightTheme.status.error }}>
                    {phoneError}
                  </p>
                )}

                {sms.isVerified && (
                  <button
                    className={`w-full py-2 rounded-xl ${font.label.medium}`}
                    style={{
                      backgroundColor: isLoading ? lightTheme.line.alternative : lightTheme.primary.normal,
                      color: isLoading ? lightTheme.line.normal : lightTheme.fill.normal,
                    }}
                    disabled={isLoading}
                    onClick={savePhone}
                  >
                    {isLoading ? "저장 중..." : "전화번호 변경"}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center justify-between">
              <span className={font.headline2.medium} style={labelStyle}>비밀번호</span>
              <div className="flex items-center gap-3">
                {passwordSuccess && (
                  <span className={font.caption.regular} style={{ color: lightTheme.status.success }}>변경 완료</span>
                )}
                <span className={font.headline2.medium} style={valueStyle}>{"•".repeat(8)}</span>
                <button
                  className="size-[1.25rem] shrink-0"
                  onClick={() => toggleSection("password")}
                >
                  <img
                    className={`size-full transition-transform ${openSection === "password" ? "rotate-90" : ""}`}
                    src={ArrowIcon}
                    alt="arrow"
                  />
                </button>
              </div>
            </div>

            {openSection === "password" && (
              <div className="flex flex-col gap-2">
                <PasswordInput
                  placeholder="현재 비밀번호"
                  value={currentPassword}
                  onChange={setCurrentPassword}
                />
                <PasswordInput
                  placeholder="새 비밀번호 (8자 이상)"
                  value={newPassword}
                  onChange={setNewPassword}
                />
                <PasswordInput
                  placeholder="새 비밀번호 확인"
                  value={newPasswordConfirm}
                  onChange={setNewPasswordConfirm}
                />
                {passwordError && (
                  <p className={font.caption.regular} style={{ color: lightTheme.status.error }}>
                    {passwordError}
                  </p>
                )}
                <button
                  className={`w-full py-2 rounded-xl ${font.label.medium}`}
                  style={{
                    backgroundColor:
                      currentPassword && newPassword && newPasswordConfirm && !isLoading
                        ? lightTheme.primary.normal : lightTheme.line.alternative,
                    color:
                      currentPassword && newPassword && newPasswordConfirm && !isLoading
                        ? lightTheme.fill.normal : lightTheme.line.normal,
                  }}
                  disabled={!currentPassword || !newPassword || !newPasswordConfirm || isLoading}
                  onClick={savePassword}
                >
                  {isLoading ? "저장 중..." : "비밀번호 변경"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
