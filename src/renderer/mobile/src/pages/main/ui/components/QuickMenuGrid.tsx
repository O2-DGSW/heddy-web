import { Link } from "react-router-dom";
import { font, lightTheme } from "@design-tokens";

import ShopIcon from "@/pages/main/assets/icons/shopIcon.png";
import CutsIcon from "@/pages/main/assets/icons/cutIcon.png";
import ReservationIcon from "@/pages/main/assets/icons/reservationIcon.png";
import QrIcon from "@/pages/main/assets/icons/qrIcon.png";

const QUICK_MENU_ITEMS = [
  { label: "미용실 찾기", to: "/shop", icon: ShopIcon },
  { label: "시술 기록", to: "/cuts", icon: CutsIcon },
  { label: "예약 하기", to: "/reservation", icon: ReservationIcon },
  { label: "QR 코드", to: "/cuts/qr-code", icon: QrIcon },
] as const;

export const QuickMenuGrid = () => {
  return (
    <div className="grid grid-cols-4 gap-2 w-full">
      {QUICK_MENU_ITEMS.map(item => (
        <Link key={item.to} to={item.to} className="flex flex-col items-center gap-2 min-w-0">
          <div className="bg-[#F7F7F7] p-4 rounded-2xl">
            <img src={item.icon} alt="" className="w-7 h-7 sm:w-12 sm:h-12" />
          </div>
          <span
            className={`${font.caption.medium} text-center truncate w-full`}
            style={{ color: lightTheme.label.alternative }}
          >
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
};
