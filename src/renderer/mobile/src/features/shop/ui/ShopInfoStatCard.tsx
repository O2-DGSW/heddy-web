import type { ReactNode } from "react";

import { font, lightTheme } from "@design-tokens";

import type { StatItem } from "@/features/shop/model/types/ShopInfo.types";

interface ShopInfoStatCardProps {
  stat: StatItem;
  icon: ReactNode;
}

export const ShopInfoStatCard = ({ stat, icon }: ShopInfoStatCardProps) => (
  <div className="flex flex-col items-center gap-2">
    {icon}
    <span className={font.label.medium} style={{ color: lightTheme.primary.normal }}>
      {stat.value}명
    </span>
  </div>
);