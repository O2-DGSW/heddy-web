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
const INACTIVE_ITEM_COLOR = "#999999";

const Sidebar = () => {
  return (
    <aside className="w-[4.25rem] shrink-0 bg-white pt-4 shadow-[0_0.125rem_0.25rem_rgba(0,0,0,0.09)]">
      <nav aria-label="대시보드 사이드 메뉴">
        <ul className="flex flex-col items-center gap-5">
          {sidebarItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                aria-label={item.label}
                className="group flex w-[2.25rem] flex-col items-center gap-1 rounded-lg outline-none transition-transform duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-[#49D2C6]/40"
              >
                {({ isActive }) => (
                  <>
                    <span
                      className="flex h-[2.125rem] w-[2.25rem] items-center justify-center rounded-lg transition-all duration-150 ease-out"
                      style={{
                        backgroundColor: isActive ? lightTheme.primary.normal : "transparent",
                        transform: isActive ? "scale(1)" : "scale(0.94)",
                      }}
                    >
                      <img
                        src={item.icon}
                        alt=""
                        aria-hidden="true"
                        className="size-6 shrink-0 transition-all duration-150 ease-out"
                        style={{
                          filter: isActive ? ACTIVE_ICON_FILTER : undefined,
                          opacity: isActive ? 1 : 0.72,
                          transform: isActive ? "scale(1)" : "scale(0.92)",
                        }}
                      />
                    </span>

                    <span
                      className={`font-['Pretendard'] transition-colors duration-150 ease-out ${font.caption.medium}`}
                      style={{
                        color: isActive ? lightTheme.primary.normal : INACTIVE_ITEM_COLOR,
                      }}
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
