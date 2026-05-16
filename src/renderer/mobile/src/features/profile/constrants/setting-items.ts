import type { SettingItemProps } from "@/features/profile";

import BookmarkIcon from "@/features/profile/assets/setting-field/Bookmark.svg";
import SettingsIcon from "@/features/profile/assets/setting-field/Setting.svg";
import PortfolioIcon from "@/features/profile/assets/setting-field/Portfolio.svg";
import AlarmIcon from "@/features/profile/assets/setting-field/Alarm.svg";

export const SETTING_ITEMS: SettingItemProps[] = [
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
    title: "회원정보 수정",
  },
  {
    icon: AlarmIcon,
    alt: "alarm",
    title: "알림 설정",
  },
];
