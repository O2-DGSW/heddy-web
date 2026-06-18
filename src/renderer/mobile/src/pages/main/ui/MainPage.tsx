import { Link } from "react-router-dom";
import { font, lightTheme } from "@design-tokens";
import HeddyIcon from "../assets/heddy.svg";
import ProfileImg from "../assets/profile.png";
import AlarmIcon from "../assets/alarm.svg";
import IntroduceReservation from "../assets/introduce-reservation.png";

export const MainPage = () => {
  return (
    <div className="flex flex-col w-full h-full flex-1 p-[1.25rem] gap-[2.5rem]">
      <div className="flex flex-row items-center w-full justify-between">
        <img alt="혜디" src={HeddyIcon} className="w-[5.5rem]" />
        <div className="flex flex-row justify-center gap-[0.75rem]">
          <button>
            <img src={AlarmIcon} alt="알람" className="h-full" />
          </button>
          <button>
            <img src={ProfileImg} alt="프로필 사진" className="h-full" />
          </button>
        </div>
      </div>

      <button>
        <img src={IntroduceReservation} className="w-full rounded-xl" />
      </button>

      <div></div>
    </div>
  );
};
