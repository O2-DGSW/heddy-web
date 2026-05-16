import { font, lightTheme } from "@design-tokens";

import BookmarkIcon from "@/features/profile/assets/setting-field/Bookmark.svg";
import SettingsIcon from "@/features/profile/assets/setting-field/Setting.svg";
import PortfolioIcon from "@/features/profile/assets/setting-field/Portfolio.svg";
import AlarmIcon from "@/features/profile/assets/setting-field/Alarm.svg";
import ArrowIcon from "@/features/profile/assets/setting-field/Arrow.svg";

export const FieldOfSetting = () => {
  return (
    <div id="wrapper" className="size-full px-[1.4rem] py-[2.25rem]">
      <div
        id="container"
        className="w-full h-[72.5%] rounded-[1rem]"
        style={{ backgroundColor: lightTheme.background.normal }}
      >
        <div className="flex flex-col p-[1.275rem] gap-[1.725rem]">
          <p className={font.headline1.semiBold} style={{ color: lightTheme.label.assistive }}>
            설정
          </p>
          <div className="flex flex-col gap-[1.5rem]">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-[0.5rem]">
                <img className="size-[1.125rem]" src={BookmarkIcon} alt="bookmark" />
                <p className={font.body.medium} style={{ color: lightTheme.label.alternative }}>
                  저장 스타일
                </p>
              </div>
              <img className="size-[1.125rem]" src={ArrowIcon} alt="arrow" />
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-[0.5rem]">
                <img className="size-[1.125rem]" src={PortfolioIcon} alt="portfolio" />
                <p className={font.body.medium} style={{ color: lightTheme.label.alternative }}>
                  포트폴리오 관리
                </p>
              </div>
              <img className="size-[1.125rem]" src={ArrowIcon} alt="arrow" />
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-[0.5rem]">
                <img className="size-[1.125rem]" src={SettingsIcon} alt="setting" />
                <p className={font.body.medium} style={{ color: lightTheme.label.alternative }}>
                  설정 관리
                </p>
              </div>
              <img className="size-[1.125rem]" src={ArrowIcon} alt="arrow" />
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-[0.5rem]">
                <img className="size-[1.125rem]" src={AlarmIcon} alt="alarm" />
                <p className={font.body.medium} style={{ color: lightTheme.label.alternative }}>
                  알림 설정
                </p>
              </div>
              <img className="size-[1.125rem]" src={ArrowIcon} alt="arrow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
