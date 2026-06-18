import type { CSSProperties } from "react";
import { NavLink } from "react-router-dom";
import { font, lightTheme } from "@design-tokens";

import calendarIcon from "@/widgets/sidebar/assets/svg/calendar.svg";
import customerIcon from "@/widgets/sidebar/assets/svg/customer.svg";
import employeeIcon from "@/widgets/sidebar/assets/svg/employee.svg";
import homeIcon from "@/widgets/sidebar/assets/svg/home.svg";
import scissorsIcon from "@/widgets/sidebar/assets/svg/scissors.svg";
import timeIcon from "@/widgets/sidebar/assets/svg/time.svg";

interface SidebarItem {
  icon: string;
  label: string;
  to: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: homeIcon, label: "홈", to: "/" },
  { icon: calendarIcon, label: "예약", to: "/reservation" },
  { icon: customerIcon, label: "고객", to: "/customer" },
  { icon: scissorsIcon, label: "시술", to: "/procedure" },
  { icon: employeeIcon, label: "직원", to: "/employee" },
  { icon: timeIcon, label: "스케줄", to: "/schedule" },
];

const ACTIVE_ICON_FILTER = "brightness(0) invert(1)";
const SIDEBAR_SHADOW = `0 1px 4px color-mix(in srgb, ${lightTheme.label.strong} 9%, transparent)`;
const sidebarThemeStyle = {
  "--sidebar-active-color": lightTheme.primary.normal,
  "--sidebar-inactive-color": lightTheme.label.inactive,
  "--sidebar-hover-background": lightTheme.fill.normal,
  "--sidebar-hover-color": lightTheme.label.neutral,
  "--sidebar-focus-ring": `color-mix(in srgb, ${lightTheme.primary.normal} 40%, transparent)`,
  backgroundColor: lightTheme.background.normal,
  boxShadow: SIDEBAR_SHADOW,
} as CSSProperties;

const Sidebar = () => {
  return (
    <aside className="w-[68px] shrink-0 pt-[43px]" style={sidebarThemeStyle}>
      <nav aria-label="대시보드 사이드 메뉴" className="flex justify-center">
        <ul className="flex w-[35px] flex-col items-center gap-5">
          {sidebarItems.map(item => (
            <li key={item.label} className="w-full">
              <NavLink
                to={item.to}
                aria-label={item.label}
                className="group flex w-full flex-col items-center gap-1 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--sidebar-focus-ring)]"
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex h-[34px] w-full items-center justify-center overflow-hidden rounded-lg transition-colors duration-150 ${
                        isActive
                          ? "bg-[var(--sidebar-active-color)]"
                          : "bg-transparent group-hover:bg-[var(--sidebar-hover-background)]"
                      }`}
                    >
                      <img
                        src={item.icon}
                        alt=""
                        aria-hidden="true"
                        className={`size-6 shrink-0 transition-opacity duration-150 ${
                          isActive ? "" : "group-hover:opacity-90"
                        }`}
                        style={{
                          filter: isActive ? ACTIVE_ICON_FILTER : undefined,
                        }}
                      />
                    </span>

                    <span
                      className={`w-full break-words text-center font-['Pretendard'] transition-colors duration-150 ${font.caption.medium} ${
                        isActive
                          ? "text-[var(--sidebar-active-color)]"
                          : "text-[var(--sidebar-inactive-color)] group-hover:text-[var(--sidebar-hover-color)]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export { Sidebar };
