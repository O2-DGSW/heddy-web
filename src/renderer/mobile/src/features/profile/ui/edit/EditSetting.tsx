import { font, lightTheme } from "@design-tokens";
import ArrowIcon from "@/features/profile/assets/edit/Arrow.svg";

export const EditSetting = () => {
  return (
    <div className="size-full px-[1.75rem] py-[2.25rem]">
      <div
        className="w-full rounded-[1rem]"
        style={{
          backgroundColor: lightTheme.background.normal,
        }}
      >
        <div className="flex flex-col justify-between gap-[1.725rem]">
          <p
            className={font.headline1.semiBold}
            style={{
              color: lightTheme.label.neutral,
            }}
          >
            기본 정보
          </p>
          <div className="flex flex-row items-center gap-[3rem] w-full">
            <div
              className="flex flex-col w-fit h-full gap-[2rem] shrink-0"
              style={{ color: lightTheme.label.assistive }}
            >
              <span className={font.headline2.medium}>이름</span>
              <span className={font.headline2.medium}>전화번호</span>
              <span className={font.headline2.medium}>비밀번호</span>
            </div>
            <div
              className="flex flex-col gap-[2rem] w-full justify-between"
              style={{ color: lightTheme.label.neutral }}
            >
              <div className="flex flex-row items-center justify-between">
                <span className={font.headline2.medium}>오용준</span>
                <button className="size-[1.25rem]" onClick={() => console.log("tt")}>
                  <img className="size-full" src={ArrowIcon} alt="arrow" />
                </button>
              </div>
              <div className="flex flex-row items-center justify-between">
                <span className={font.headline2.medium}>010-1234-5678</span>
                <button className="size-[1.25rem]">
                  <img className="size-full" src={ArrowIcon} alt="arrow" />
                </button>
              </div>
              <div className="flex flex-row items-center justify-between">
                <span className={font.headline2.medium}>*********</span>
                <button className="size-[1.25rem]">
                  <img className="size-full" src={ArrowIcon} alt="arrow" />
                </button>
              </div>
            </div>
          </div>
          <div
            className="flex justify-center items-center w-full p-[0.75rem] rounded-[0.625rem]"
            style={{ backgroundColor: lightTheme.primary.normal }}
          >
            <p className={font.headline2.semiBold} style={{ color: lightTheme.background.normal }}>
              저장
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
