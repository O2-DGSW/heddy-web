import HeddyIcon from "../assets/heddy.svg";
import ProfileImg from "../assets/profile.png";
import AlarmIcon from "../assets/alarm.svg";

import { PROMO_BANNERS } from "@/pages/main/model/promoBanners";
import { PromoBannerCarousel } from "@/pages/main/ui/components/PromoBannerCarousel";
import { QuickActionCards } from "@/pages/main/ui/components/QuickActionCards";
import { QuickMenuGrid } from "@/pages/main/ui/components/QuickMenuGrid";
import { AiStyleRecommendation } from "@/pages/main/ui/components/AiStyleRecommendation";

export const MainPage = () => {
  return (
    <div className="flex flex-col w-full min-h-full gap-6 pb-6">
      <div className="flex flex-row items-center w-full justify-between p-5 pb-0">
        <img alt="혜디" src={HeddyIcon} className="w-[5.5rem]" />
        <div className="flex flex-row justify-center gap-3">
          <button type="button">
            <img src={AlarmIcon} alt="알람" className="h-8 w-8" />
          </button>
          <button type="button">
            <img src={ProfileImg} alt="프로필 사진" className="h-12 w-12 rounded-full object-cover" />
          </button>
        </div>
      </div>

      <div className="px-5">
        <PromoBannerCarousel slides={PROMO_BANNERS} />
      </div>

      <div className="px-5">
        <QuickActionCards />
      </div>

      <div className="px-5">
        <QuickMenuGrid />
      </div>

      <AiStyleRecommendation />
    </div>
  );
};
