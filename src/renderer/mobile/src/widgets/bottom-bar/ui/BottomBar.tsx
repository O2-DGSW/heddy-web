import { useLocation, useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "../constrants/nav-items.ts";
import { getBarItemState } from "../model/focusEffect";
import { BarItem } from "./BarItem";
import { lightTheme } from "@design-tokens";
import { useGetMyProfileQuery } from "@/entities/profile/api/query/useGetMyProfile.query";

export const BottomBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: profile } = useGetMyProfileQuery();
  const isCustomer = profile?.userType === "CUSTOMER";
  const visibleItems = isCustomer ? NAV_ITEMS.filter(item => item.to !== "/shop") : NAV_ITEMS;

  return (
    <div
      className="
        flex fixed bottom-0 left-0 w-full
        rounded-2xl p-[0.5rem]
        shadow-[0_-2px_6px_rgba(0,0,0,0.05)]
      "
      style={{ backgroundColor: lightTheme.background.normal }}
    >
      {visibleItems.map(({ Icon, title, to }) => {
        const state = getBarItemState(location.pathname, to);

        return (
          <BarItem
            key={to}
            Icon={Icon}
            title={title}
            iconColor={state.iconColor}
            backgroundColor={state.backgroundColor}
            textColor={state.textColor}
            onClick={() => navigate(to)}
          />
        );
      })}
    </div>
  );
};
