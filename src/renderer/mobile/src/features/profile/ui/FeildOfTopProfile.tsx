import { font, lightTheme, palette } from "@design-tokens";
import ProfileImg from "@/features/profile/assets/ANAG.png";
import CustomerIcon from "@/features/profile/assets/customer.svg";
import DocumentIcon from "@/features/profile/assets/document.svg";
import DateIcon from "@/features/profile/assets/cate.svg";

export const FeildOfTopProfile = () => {
  return (
    <div id="wrapper" className="h-full px-[1.25rem] py-[1.75rem]">
      <div
        id="container"
        className="flex flex-col justify-between size-full"
        style={{ backgroundColor: lightTheme.background.normal }}
      >
        <div id="profile-info " className="flex flex-row w-full gap-[1.5rem] px-[1.75rem]">
          <img src={ProfileImg} alt="아거" />
          <div className="flex flex-row items-center gap-[0.5rem]">
            <div className="flex flex-row items-center gap-[0.325rem]">
              <p className={font.headline1.bold}>오용준</p>
              <p className={font.headline1.bold}>님</p>
            </div>
            <p className={font.headline2.regular} style={{ color: lightTheme.label.assistive }}>
              ·
            </p>
            <p className={font.headline2.regular} style={{ color: lightTheme.label.assistive }}>
              디자이너
            </p>
          </div>
        </div>
        <div
          className="flex flex-row w-full rounded-[1rem] justify-around p-[1rem]"
          style={{ backgroundColor: palette.main[97] }}
        >
          <div className="flex flex-col items-center gap-[0.25rem]">
            <img className="size-[2.25rem]" src={CustomerIcon} alt="customer" />
            <p className="flex flex-row gap-[0.175rem]">
              <p className={font.label.medium} style={{ color: lightTheme.primary.normal }}>
                12
              </p>
              <p className={font.label.medium} style={{ color: lightTheme.label.assistive }}>
                명
              </p>
            </p>
          </div>
          <div className="flex flex-col items-center gap-[0.25rem]">
            <img className="size-[2.25rem]" src={DateIcon} alt="date" />
            <p className="flex flex-row gap-[0.175rem]">
              <p className={font.label.medium} style={{ color: lightTheme.primary.normal }}>
                12
              </p>
              <p className={font.label.medium} style={{ color: lightTheme.label.assistive }}>
                건
              </p>
            </p>
          </div>
          <div className="flex flex-col items-center gap-[0.25rem]">
            <img className="size-[2.25rem]" src={DocumentIcon} alt="document" />
            <p className="flex flex-row gap-[0.175rem]">
              <p className={font.label.medium} style={{ color: lightTheme.primary.normal }}>
                12
              </p>
              <p className={font.label.medium} style={{ color: lightTheme.label.assistive }}>
                건
              </p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
