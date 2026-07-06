import { useNavigate } from "react-router-dom";
import { font, lightTheme } from "@design-tokens";
import ArrowIcon from "@/features/profile/assets/edit/Arrow.svg";
import { useGetMyProfileQuery } from "@/entities/profile/api/query/useGetMyProfile.query";
import { useEditProfile } from "@/features/profile/model/edit/useEditProfile";
import { formatPhone } from "@/private/shared/utils/formatPhone";
import { RadioButton } from "@/private/shared/ui/radio/RadioButton";
import { MAIN_CARRIERS } from "@/features/auth/signup/constants/signup";

const inputStyle = { backgroundColor: lightTheme.background.neutral, color: lightTheme.label.normal };
const inputClass = (extra = "") =>
  `min-w-0 flex-1 px-4 py-3 rounded-xl focus:outline-none ${font.caption.regular} ${extra}`;
const btnClass = () =>
  `shrink-0 w-[5rem] py-3 rounded-xl ${font.label.medium}`;
const btnStyle = (active: boolean) => ({
  backgroundColor: active ? lightTheme.primary.normal : lightTheme.line.alternative,
  color: active ? lightTheme.fill.normal : lightTheme.line.normal,
});

export const EditSetting = () => {
  const navigate = useNavigate();
  const { data: profile } = useGetMyProfileQuery();

  const {
    openSection, toggleSection,
    newPhone, handlePhoneChange,
    carrier, setCarrier,
    verificationCode, setVerificationCode,
    sms,
    savePhone,
    phoneError, phoneSuccess,
    isLoading,
  } = useEditProfile();

  const labelStyle = { color: lightTheme.label.assistive };
  const valueStyle = { color: lightTheme.label.neutral };

  const canSendSms = newPhone.replace(/\D/g, "").length >= 10 && !sms.isSending;
  const canVerify = verificationCode.length > 0 && !sms.isVerifying;

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
                <button className="size-[1.25rem] shrink-0" onClick={() => toggleSection("phone")}>
                  <img
                    className={`size-full transition-transform ${openSection === "phone" ? "rotate-90" : ""}`}
                    src={ArrowIcon}
                    alt="arrow"
                  />
                </button>
              </div>
            </div>

            {openSection === "phone" && (
              <div className="flex flex-col gap-3">
                {/* 통신사 선택 */}
                <div className="flex items-center gap-4 flex-wrap ml-1">
                  {MAIN_CARRIERS.map(c => (
                    <RadioButton
                      key={c}
                      label={c}
                      selected={carrier === c}
                      onClick={() => setCarrier(c)}
                    />
                  ))}
                </div>

                <div className="flex gap-2 w-full overflow-hidden">
                  <input
                    className={inputClass()}
                    style={inputStyle}
                    placeholder="새 전화번호"
                    value={newPhone}
                    onChange={e => handlePhoneChange(e.target.value)}
                    inputMode="tel"
                  />
                  <button
                    className={btnClass()}
                    style={btnStyle(canSendSms)}
                    disabled={!canSendSms}
                    onClick={() => sms.sendCode(newPhone, carrier)}
                  >
                    {sms.isSending ? "발송 중" : sms.isSent ? "재전송" : "인증번호"}
                  </button>
                </div>

                {sms.isSent && !sms.isVerified && (
                  <div className="flex gap-2 w-full overflow-hidden">
                    <input
                      className={inputClass()}
                      style={inputStyle}
                      placeholder="인증번호 6자리"
                      value={verificationCode}
                      onChange={e => setVerificationCode(e.target.value)}
                      inputMode="numeric"
                    />
                    <button
                      className={btnClass()}
                      style={btnStyle(canVerify)}
                      disabled={!canVerify}
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
                {(sms.smsError || phoneError) && (
                  <p className={font.caption.regular} style={{ color: lightTheme.status.error }}>
                    {sms.smsError ?? phoneError}
                  </p>
                )}
                {sms.isVerified && (
                  <button
                    className={`w-full py-3 rounded-xl ${font.label.medium}`}
                    style={btnStyle(!isLoading)}
                    disabled={isLoading}
                    onClick={savePhone}
                  >
                    {isLoading ? "저장 중..." : "전화번호 변경"}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* 비밀번호 → 비밀번호 변경 페이지로 이동 */}
          <div className="flex flex-row items-center justify-between">
            <span className={font.headline2.medium} style={labelStyle}>비밀번호</span>
            <div className="flex items-center gap-3">
              <span className={font.headline2.medium} style={valueStyle}>{"•".repeat(8)}</span>
              <button
                className="size-[1.25rem] shrink-0"
                onClick={() => navigate("/change-password")}
              >
                <img className="size-full" src={ArrowIcon} alt="arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
