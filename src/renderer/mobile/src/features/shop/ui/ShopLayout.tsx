import { font, lightTheme } from "@design-tokens";

import { ShopTabBar } from "./ShopTabBar";
import type { ShopLayoutProps } from "@/features/shop/model/types/ShopLayout.types";

export const ShopLayout = ({ children }: ShopLayoutProps) => {
  return (
    <div className="fixed inset-0 grid grid-rows-[auto_auto_1fr] overflow-hidden pt-safe">
      <h1
        className={`py-2 pt-3 text-center ${font.headline1.bold}`}
        style={{ color: lightTheme.label.neutral }}
      >
        미용실
      </h1>
      <ShopTabBar />
      <div className="relative overflow-hidden">
        {children}
      </div>
    </div>
  );
};