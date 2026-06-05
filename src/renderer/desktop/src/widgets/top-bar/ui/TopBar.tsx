import { Link, useLocation } from "react-router-dom";

import alarmIcon from "@/widgets/top-bar/assets/svg/alarm.svg";
import dashboardLogo from "@/widgets/top-bar/assets/svg/logo.svg";
import heddyLogo from "@/widgets/top-bar/assets/svg/heddy-logo.svg";
import profileIcon from "@/widgets/top-bar/assets/svg/profile.svg";

const AuthTopBar = () => {
  return (
    <header className="flex h-[4.5rem] items-start px-[1.25rem] pt-[1.25rem] sm:px-[2.5rem] lg:px-[5rem]">
      <Link to="/" aria-label="Heddy home">
        <img src={heddyLogo} alt="heddy" className="h-[2rem] w-[6.125rem]" />
      </Link>
    </header>
  );
};

const DashboardTopBar = () => {
  return (
    <header className="flex h-[4.25rem] w-full items-center justify-between bg-white px-[1rem] shadow-[0_0.125rem_0.25rem_rgba(0,0,0,0.09)]">
      <Link to="/" aria-label="Heddy dashboard" className="shrink-0">
        <img src={dashboardLogo} alt="heddy" className="h-[1.625rem] w-[4.875rem]" />
      </Link>

      <div className="flex shrink-0 items-center gap-[1rem]">
        <button
          type="button"
          aria-label="알림"
          className="flex size-[1.875rem] items-center justify-center"
        >
          <img src={alarmIcon} alt="" className="size-[1.875rem]" aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label="프로필 메뉴"
          className="flex size-[2.5rem] items-center justify-center"
        >
          <img src={profileIcon} alt="" className="size-[2.5rem]" aria-hidden="true" />
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
