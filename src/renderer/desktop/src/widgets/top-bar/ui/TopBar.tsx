import { Link, useLocation } from "react-router-dom";
import { lightTheme } from "@design-tokens";

import alarmIcon from "@/widgets/top-bar/assets/svg/alarm.svg";
import dashboardLogo from "@/widgets/top-bar/assets/svg/logo.svg";
import heddyLogo from "@/widgets/top-bar/assets/svg/heddy-logo.svg";
import profileIcon from "@/widgets/top-bar/assets/svg/profile.svg";

const TOP_BAR_SHADOW = `0 1px 4px color-mix(in srgb, ${lightTheme.label.strong} 9%, transparent)`;

const AuthTopBar = () => {
  return (
    <header className="flex h-18 items-start px-5 pt-5 sm:px-10 lg:px-20">
      <Link to="/" aria-label="Heddy home">
        <img src={heddyLogo} alt="heddy" className="h-8 w-24.5" />
      </Link>
    </header>
  );
};

const DashboardTopBar = () => {
  return (
    <header
      className="flex h-[68px] w-full items-center"
      style={{
        backgroundColor: lightTheme.background.normal,
        boxShadow: TOP_BAR_SHADOW,
      }}
    >
      <div className="mx-auto flex w-[calc(100%-45px)] max-w-[1467.05px] items-center justify-between">
        <Link to="/" aria-label="Heddy dashboard" className="shrink-0">
          <img src={dashboardLogo} alt="heddy" className="h-[26px] w-[78px]" />
        </Link>

        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            aria-label="알림"
            className="flex size-[30px] items-center justify-center"
          >
            <img src={alarmIcon} alt="" className="size-[30px]" aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label="프로필 메뉴"
            className="flex size-10 items-start justify-start overflow-visible"
          >
            <img
              src={profileIcon}
              alt=""
              className="h-[45.8px] w-[45.8px] max-w-none -translate-x-[3.33px]"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

const TopBar = () => {
  const { pathname } = useLocation();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return isAuthPage ? <AuthTopBar /> : <DashboardTopBar />;
};

export { TopBar };
