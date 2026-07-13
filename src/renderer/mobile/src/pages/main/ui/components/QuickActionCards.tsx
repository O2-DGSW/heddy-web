import { Link } from "react-router-dom";
import { font, lightTheme, palette } from "@design-tokens";

import AgerUser from "@/features/auth/signup/assets/signup-type/agerUser.svg";
import AgerDesigner from "@/features/auth/signup/assets/signup-type/agerDesigner.svg";
import PinPlusIcon from "@/pages/main/assets/icons/pin-plus.svg";
import ScissorsIcon from "@/pages/main/assets/icons/scissors-icon.svg";

export const QuickActionCards = () => {
  return (
    <div className="flex gap-3 w-full">
      <Link
        to="/cuts"
        className="flex-1 rounded-2xl p-4 flex flex-col justify-between min-h-[9.5rem]"
        style={{ backgroundColor: lightTheme.background.neutral }}
      >
        <div className="flex flex-col gap-1">
          <p className={font.headline2.bold} style={{ color: lightTheme.label.normal }}>
            시술 기록을
            <br />
            기억해줘요!
          </p>
          <span className={font.label.medium} style={{ color: palette.main[50] }}>
            보러가기 &gt;
          </span>
        </div>
        <div className="flex items-end justify-end gap-1">
          <img src={AgerUser} alt="" className="w-12 h-auto" />
          <img src={AgerDesigner} alt="" className="w-12 h-auto" />
        </div>
      </Link>

      <div className="flex flex-col gap-3 flex-1">
        <Link
          to="/shop"
          className="flex-1 rounded-2xl p-4 flex flex-col justify-between"
          style={{ backgroundColor: palette.main[90] }}
        >
          <div className="flex flex-col gap-0.5">
            <span className={font.caption.medium} style={{ color: lightTheme.label.alternative }}>
              내가 원하는 정보로
            </span>
            <span className={font.headline2.bold} style={{ color: lightTheme.label.normal }}>
              미용실 찾기
            </span>
          </div>
          <div className="flex justify-end">
            <img src={PinPlusIcon} alt="" className="w-8 h-8" />
          </div>
        </Link>

        <Link
          to="/cuts/qr-code"
          className="flex-1 rounded-2xl p-4 flex flex-col justify-between"
          style={{ backgroundColor: palette.main[90] }}
        >
          <div className="flex flex-col gap-0.5">
            <span className={font.caption.medium} style={{ color: lightTheme.label.alternative }}>
              시술 기록
            </span>
            <span className={font.headline2.bold} style={{ color: lightTheme.label.normal }}>
              QR 생성
            </span>
          </div>
          <div className="flex justify-end">
            <img src={ScissorsIcon} alt="" className="w-8 h-8" />
          </div>
        </Link>
      </div>
    </div>
  );
};
