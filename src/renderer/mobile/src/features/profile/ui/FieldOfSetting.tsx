import { font, lightTheme } from "@design-tokens";

import BookmarkIcon from "@/features/profile/assets/setting-field/Bookmark.svg";
import SettingsIcon from "@/features/profile/assets/setting-field/Setting.svg";
import PortfolioIcon from "@/features/profile/assets/setting-field/Portfolio.svg";
import AlarmIcon from "@/features/profile/assets/setting-field/Alarm.svg";
import ArrowIcon from "@/features/profile/assets/setting-field/Arrow.svg";

type SettingItemProps = {
  icon: string;
  alt: string;
  title: string;
};

const SETTING_ITEMS = [
  {
    icon: BookmarkIcon,
    alt: "bookmark",
    title: "저장 스타일",
  },
  {
    icon: PortfolioIcon,
    alt: "portfolio",
    title: "포트폴리오 관리",
  },
  {
    icon: SettingsIcon,
    alt: "setting",
    title: "설정 관리",
  },
  {
    icon: AlarmIcon,
    alt: "alarm",
    title: "알림 설정",
  },
];

const SettingItem = ({ icon, alt, title }: SettingItemProps) => {
  return (
    <button>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-[0.5rem]">
          <img className="size-[1.125rem]" src={icon} alt={alt} />

          <p
            className={font.body.medium}
            style={{
              color: lightTheme.label.alternative,
            }}
          >
            {title}
          </p>
        </div>

        <img className="size-[1.125rem]" src={ArrowIcon} alt="arrow" />
      </div>
    </button>
  );
};

export const FieldOfSetting = () => {
  return (
    <div className="size-full px-[1.4rem] py-[2.25rem]">
      <div
        className="w-full h-[72.5%] rounded-[1rem]"
        style={{
          backgroundColor: lightTheme.background.normal,
        }}
      >
        <div className="flex flex-col p-[1.275rem] gap-[1.725rem]">
          <p
            className={font.headline1.semiBold}
            style={{
              color: lightTheme.label.assistive,
            }}
          >
            설정
          </p>

          <div className="flex flex-col gap-[1.5rem]">
            {SETTING_ITEMS.map(item => (
              <SettingItem key={item.title} icon={item.icon} alt={item.alt} title={item.title} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
