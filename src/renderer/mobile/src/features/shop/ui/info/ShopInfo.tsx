import { font, lightTheme } from "@design-tokens";

import { SHOP_INFO } from "@/features/shop/constrants/shop-info";

import CustomerIcon from "@/features/shop/assets/shop-info/Customer.svg?react";
import CheckIcon from "@/features/shop/assets/shop-info/Check.svg?react";
import DateIcon from "@/features/shop/assets/shop-info/Date.svg?react";
import MapIcon from "@/features/shop/assets/shop-info/Map.svg?react";
import CallIcon from "@/features/shop/assets/shop-info/Call.svg?react";
import TimeIcon from "@/features/shop/assets/shop-info/Time.svg?react";
import DgswImg from "@/features/shop/assets/shop-info/dgsw.png";

import { CutsTag } from "@/private/shared/ui/cuts-tag/CutsTag";
import { ShopInfoStatCard } from "./ShopInfoStatCard";
import { ShopInfoRow } from "./ShopInfoRow";

export const ShopInfo = () => {
  return (
    <div
      className="overflow-y-auto h-full"
      style={{ backgroundColor: lightTheme.background.normal }}
    >
      {/* 배너 이미지 — 서버 연결 시 제거 예정 */}
      <img src={DgswImg} alt="미용실 배너" className="w-full h-48 object-cover" />

      <div className="px-4 pt-4">
        <h2
          className={`break-keep ${font.headline1.semiBold}`}
          style={{ color: lightTheme.label.normal }}
        >
          {SHOP_INFO.name}
        </h2>
      </div>
      {/* 리뷰 · 태그 */}
      <div className="flex items-start justify-between gap-2 px-4 pt-2 pb-2">
        <div className="min-w-0 flex-1">
          <p className={`mt-1 ${font.body.medium}`} style={{ color: lightTheme.label.alternative }}>
            리뷰 · {SHOP_INFO.reviewCount.toLocaleString()}
          </p>
        </div>

        <div className="flex gap-1.5 mt-1 shrink-0 flex-wrap justify-end">
          {SHOP_INFO.tags.map(tag => (
            <CutsTag key={tag} text={tag} />
          ))}
        </div>
      </div>

      {/* 통계 */}
      <div className="flex justify-around px-4 py-6">
        <ShopInfoStatCard stat={SHOP_INFO.stats[0]} icon={<CustomerIcon />} />
        <ShopInfoStatCard stat={SHOP_INFO.stats[1]} icon={<CheckIcon />} />
        <ShopInfoStatCard stat={SHOP_INFO.stats[2]} icon={<DateIcon />} />
      </div>

      <div className="mx-4 h-px" style={{ backgroundColor: lightTheme.line.alternative }} />

      {/* 상세 정보 */}
      <div className="flex flex-col gap-5 px-4 py-5">
        <ShopInfoRow icon={<MapIcon />} text={SHOP_INFO.address} />
        <ShopInfoRow icon={<CallIcon />} text={SHOP_INFO.phone} />
        <ShopInfoRow icon={<TimeIcon />} text={SHOP_INFO.hours} />
      </div>
    </div>
  );
};
