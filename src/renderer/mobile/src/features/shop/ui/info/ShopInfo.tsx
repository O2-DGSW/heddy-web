import type { ReactNode } from "react";

import { font, lightTheme } from "@design-tokens";

import { SHOP_INFO } from "@/features/shop/constrants/shop-info";
import type { StatItem } from "@/features/shop/model/types/ShopInfo.types";

import CustomerIcon from "@/features/shop/assets/shop-info/Customer.svg?react";
import CheckIcon from "@/features/shop/assets/shop-info/Check.svg?react";
import DateIcon from "@/features/shop/assets/shop-info/Date.svg?react";
import DgswImg from "@/features/shop/assets/shop-info/dgsw.png";

export const ShopInfo = () => {
  return (
    <div className="overflow-y-auto h-full" style={{ backgroundColor: lightTheme.background.normal }}>
      {/* 배너 이미지 — 서버 연결 시 제거 예정 */}
      <img src={DgswImg} alt="미용실 배너" className="w-full h-48 object-cover" />

      {/* 미용실 이름 · 리뷰 · 태그 */}
      <div className="flex items-start justify-between px-4 pt-4 pb-2">
        <div>
          <h2 className={font.headline1.bold} style={{ color: lightTheme.label.normal }}>
            {SHOP_INFO.name}
          </h2>
          <p className={`mt-1 ${font.label.regular}`} style={{ color: lightTheme.label.assistive }}>
            리뷰 · {SHOP_INFO.reviewCount.toLocaleString()}
          </p>
        </div>

        <div className="flex gap-1.5 mt-1 flex-wrap justify-end">
          {SHOP_INFO.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>

      {/* 통계 */}
      <div className="flex justify-around px-4 py-6">
        <StatCard stat={SHOP_INFO.stats[0]} icon={<CustomerIcon />} />
        <StatCard stat={SHOP_INFO.stats[1]} icon={<CheckIcon />} />
        <StatCard stat={SHOP_INFO.stats[2]} icon={<DateIcon />} />
      </div>

      <div className="mx-4 h-px" style={{ backgroundColor: lightTheme.line.alternative }} />

      {/* 상세 정보 */}
      <div className="flex flex-col gap-5 px-4 py-5">
        <InfoRow text={SHOP_INFO.address} />
        <InfoRow text={SHOP_INFO.phone} />
        <InfoRow text={SHOP_INFO.hours} />
      </div>
    </div>
  );
};

interface TagProps {
  label: string;
}

const Tag = ({ label }: TagProps) => (
  <span
    className={`px-2 py-0.5 rounded ${font.caption.medium}`}
    style={{
      backgroundColor: lightTheme.fill.neutral,
      color: lightTheme.label.alternative,
    }}
  >
    #{label}
  </span>
);

interface StatCardProps {
  stat: StatItem;
  icon: ReactNode;
}

const StatCard = ({ stat, icon }: StatCardProps) => (
  <div className="flex flex-col items-center gap-2">
    {icon}
    <span className={font.label.medium} style={{ color: lightTheme.primary.normal }}>
      {stat.value}명
    </span>
  </div>
);

interface InfoRowProps {
  text: string;
}

const InfoRow = ({ text }: InfoRowProps) => (
  <div className="flex items-center gap-3">
    {/* 아이콘 placeholder — 추후 SVG 아이콘으로 교체 */}
    <div
      className="w-5 h-5 shrink-0 rounded-full"
      style={{ backgroundColor: lightTheme.label.disable }}
    />
    <span className={font.body.regular} style={{ color: lightTheme.label.neutral }}>
      {text}
    </span>
  </div>
);