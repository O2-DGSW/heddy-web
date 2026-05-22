import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { lightTheme } from "@design-tokens";

import checkIcon from "@/features/signup/assets/svg/check.svg";
import { termsSections } from "@/features/signup/constants/terms";

type TermId = (typeof termsSections)[number]["id"];

const requiredTermIds = termsSections.filter(({ required }) => required).map(({ id }) => id);

const scrollStyleByTermId: Record<TermId, string> = {
  service: "scrollbar-hidden",
  privacy: "scrollbar-hidden",
};

const TermsAgreement = () => {
  const [checkedTerms, setCheckedTerms] = useState<Record<TermId, boolean>>({
    service: false,
    privacy: false,
  });

  const isAllChecked = useMemo(
    () => requiredTermIds.every((id) => checkedTerms[id]),
    [checkedTerms],
  );

  const handleTermChange = (id: TermId) => {
    setCheckedTerms((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAllChange = () => {
    const nextChecked = !isAllChecked;

    setCheckedTerms({
      service: nextChecked,
      privacy: nextChecked,
    });
  };

  return (
    <form className="flex w-full flex-col" aria-label="회원가입 이용약관">
      <div className="flex flex-col gap-[23px]">
        {termsSections.map(({ id, title, required, documentTitle, summary, clauses }) => (
          <section key={id} className="flex flex-col gap-[9px]">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={checkedTerms[id]}
                onChange={() => handleTermChange(id)}
              />
              <span
                className="flex size-[15px] shrink-0 items-center justify-center rounded-full border-[2px] peer-focus-visible:ring-2 peer-focus-visible:ring-[#41be8e]/35 peer-focus-visible:ring-offset-2"
                style={{
                  backgroundColor: checkedTerms[id] ? lightTheme.primary.normal : lightTheme.background.normal,
                  borderColor: lightTheme.primary.normal,
                }}
                aria-hidden="true"
              >
                <img
                  src={checkIcon}
                  alt=""
                  className={`h-[7px] w-[9px] ${checkedTerms[id] ? "opacity-100" : "opacity-0"}`}
                />
              </span>
              <span
                className="font-['Pretendard'] text-base font-medium leading-[130%]"
                style={{ color: lightTheme.label.assistive }}
              >
                {title}{" "}
                {required && <span style={{ color: lightTheme.primary.normal }}>(필수)</span>}
              </span>
            </label>

            <div
              className={`box-border h-[139px] w-full overflow-y-auto rounded-[10px] border-[0.8px] bg-white px-[15px] py-[13px] ${scrollStyleByTermId[id]}`}
              style={{ borderColor: lightTheme.line.alternative }}
            >
              <div
                className="flex flex-col gap-3 pr-1 font-['Pretendard'] leading-[150%]"
                style={{ color: lightTheme.label.assistive }}
              >
                <strong
                  className="text-[13px] font-semibold leading-[140%]"
                  style={{ color: lightTheme.label.neutral }}
                >
                  {documentTitle}
                </strong>
                <p className="text-[11px] font-normal leading-[155%]">{summary}</p>
                <div className="flex flex-col gap-2.5">
                  {clauses.map(({ heading, body }) => (
                    <section key={heading} className="flex flex-col gap-1">
                      <h3
                        className="text-[11px] font-medium leading-[150%]"
                        style={{ color: lightTheme.label.neutral }}
                      >
                        {heading}
                      </h3>
                      <p className="text-[11px] font-normal leading-[155%]">{body}</p>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={isAllChecked}
            onChange={handleAllChange}
          />
          <span
            className="flex size-[15px] shrink-0 items-center justify-center rounded-full border-[2px] peer-focus-visible:ring-2 peer-focus-visible:ring-[#41be8e]/35 peer-focus-visible:ring-offset-2"
            style={{
              backgroundColor: isAllChecked ? lightTheme.primary.normal : lightTheme.background.normal,
              borderColor: lightTheme.primary.normal,
            }}
            aria-hidden="true"
          >
            <img
              src={checkIcon}
              alt=""
              className={`h-[7px] w-[9px] ${isAllChecked ? "opacity-100" : "opacity-0"}`}
            />
          </span>
          <span
            className="font-['Pretendard'] text-base font-medium leading-[130%]"
            style={{ color: lightTheme.label.assistive }}
          >
            네, 모두 동의합니다.
          </span>
        </label>
      </div>

      <div className="mt-16 flex flex-col items-center gap-[26px] [@media(max-height:900px)]:mt-10 [@media(max-height:900px)]:gap-[18px]">
        <button
          type="button"
          className="h-12 w-full rounded-[10px] font-['Pretendard'] text-lg font-semibold leading-[130%] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#41be8e]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          style={{ backgroundColor: lightTheme.primary.normal, color: lightTheme.fill.normal }}
          disabled={!isAllChecked}
        >
          다음으로
        </button>

        <div className="flex items-center gap-6 font-['Pretendard'] text-sm font-medium leading-[130%]">
          <span style={{ color: lightTheme.label.assistive }}>이미 계정이 있으신가요?</span>
          <Link
            to="/login"
            className="underline underline-offset-2"
            style={{ color: lightTheme.primary.normal }}
          >
            로그인
          </Link>
        </div>
      </div>
    </form>
  );
};

export { TermsAgreement };
