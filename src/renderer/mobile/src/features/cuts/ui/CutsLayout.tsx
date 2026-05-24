import React from "react";

import { font, lightTheme } from "@design-tokens";

import { CutsTabBar } from "@/features/cuts/ui/CutsTabBar";

interface Props {
  children: React.ReactNode;
}

export const CutsLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col h-screen min-h-0 overflow-hidden">
      <h1
        className={`pb-2 text-center ${font.headline1.bold}`}
        style={{ color: lightTheme.label.neutral }}
      >
        시술기록
      </h1>
      <CutsTabBar />
      <div className="flex flex-col flex-1 min-h-0">
        {children}
      </div>
    </div>
  );
};