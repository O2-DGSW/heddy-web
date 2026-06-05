import { useState } from "react";
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
}

const sidebarItems: SidebarItem[] = [
  { icon: homeIcon, label: "홈" },
  { icon: calendarIcon, label: "예약" },
  { icon: customerIcon, label: "고객" },
  { icon: scissorsIcon, label: "시술" },
  { icon: employeeIcon, label: "직원" },
  { icon: timeIcon, label: "스케줄" },
];

const ACTIVE_ICON_FILTER = "brightness(0) invert(1)";
const INACTIVE_ITEM_COLOR = "#999999";

const Sidebar = () => {
  const [activeLabel, setActiveLabel] = useState("예약");

  return (
    <aside className="w-[4.25rem] shrink-0 bg-white pt-4 shadow-[0_0.125rem_0.25rem_rgba(0,0,0,0.09)]">
      <nav aria-label="대시보드 사이드 메뉴">
        <ul className="flex flex-col items-center gap-5">
          {sidebarItems.map(item => {
            const isActive = activeLabel === item.label;

            return (
              <li key={item.label}>
                <button
                  type="button"
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className="flex w-[2.1875rem] flex-col items-center gap-1"
                  onClick={() => setActiveLabel(item.label)}
                >
                  <span
                    className="flex h-[2.125rem] w-[2.1875rem] items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: isActive ? lightTheme.primary.normal : "transparent",
                    }}
                  >
                    <img
                      src={item.icon}
                      alt=""
                      aria-hidden="true"
                      className="size-6 shrink-0"
                      style={{
                        filter: isActive ? ACTIVE_ICON_FILTER : undefined,
                      }}
                    />
                  </span>

                  <span
                    className={`font-['Pretendard'] ${font.caption.medium}`}
                    style={{
                      color: isActive ? lightTheme.primary.normal : INACTIVE_ITEM_COLOR,
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export { Sidebar };
