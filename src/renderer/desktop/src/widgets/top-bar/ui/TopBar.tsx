import { Link, useLocation } from "react-router-dom";

import alarmIcon from "@/widgets/top-bar/assets/svg/alarm.svg";
import dashboardLogo from "@/widgets/top-bar/assets/svg/logo.svg";
import heddyLogo from "@/widgets/top-bar/assets/svg/heddy-logo.svg";
import profileIcon from "@/widgets/top-bar/assets/svg/profile.svg";

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
    <header className="flex h-17 w-full items-center justify-between bg-white px-4 shadow-[0_0.125rem_0.25rem_rgba(0,0,0,0.09)]">
      <Link to="/" aria-label="Heddy dashboard" className="shrink-0">
        <img src={dashboardLogo} alt="heddy" className="h-6.5 w-19.5" />
      </Link>

      <div className="flex shrink-0 items-center gap-4">
        <button
          type="button"
          aria-label="알림"
          className="flex size-7.5 items-center justify-center"
        >
          <img src={alarmIcon} alt="" className="size-7.5" aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label="프로필 메뉴"
          className="flex size-10 items-center justify-center"
        >
          <img src={profileIcon} alt="" className="size-10" aria-hidden="true" />
        </button>
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
