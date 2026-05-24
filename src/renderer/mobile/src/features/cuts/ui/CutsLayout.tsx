import { font, lightTheme } from "@design-tokens";

import { CutsTabBar } from "./CutsTabBar";
import type { CutsLayoutProps } from "@/features/cuts/model/types/CutsLayout.types";

export const CutsLayout = ({ children }: CutsLayoutProps) => {
  return (
    <div className="flex flex-col h-screen min-h-0 overflow-hidden">
      <h1
        className={`pb-2 text-center ${font.headline1.bold}`}
        style={{ color: lightTheme.label.neutral }}
      >
        시술기록
      </h1>
      <CutsTabBar />
      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};