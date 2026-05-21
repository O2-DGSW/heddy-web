import { Link } from "react-router-dom";

import heddyLogo from "@/widgets/top-bar/assets/svg/heddy-logo.svg";

const TopBar = () => {
  return (
    <header className="flex h-[88px] items-start px-[104px] pt-[28px]">
      <Link to="/" aria-label="Heddy home">
        <img src={heddyLogo} alt="heddy" className="h-8 w-[98px]" />
      </Link>
    </header>
  );
};

export { TopBar };
