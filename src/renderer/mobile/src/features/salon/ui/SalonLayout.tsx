import { font, lightTheme } from "@design-tokens";

import { SalonTabBar } from "./SalonTabBar";
import type { SalonLayoutProps } from "@/features/salon/model/types/SalonLayout.types";

export const SalonLayout = ({ children }: SalonLayoutProps) => {
  return (
    <div className="fixed inset-0 grid grid-rows-[auto_auto_1fr] overflow-hidden pt-safe">
      <h1
        className={`py-2 pt-3 text-center ${font.headline1.bold}`}
        style={{ color: lightTheme.label.neutral }}
      >
        미용실
      </h1>
      <SalonTabBar />
      <div className="relative overflow-hidden">
        {children}
      </div>
    </div>
  );
};