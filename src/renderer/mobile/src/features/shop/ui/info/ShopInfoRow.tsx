import type { ReactNode } from "react";

import { font, lightTheme } from "@design-tokens";

interface ShopInfoRowProps {
  icon: ReactNode;
  text: string;
}

export const ShopInfoRow = ({ icon, text }: ShopInfoRowProps) => (
  <div className="flex items-center gap-3">
    <div className="shrink-0">{icon}</div>
    <span className={`break-keep ${font.body.regular}`} style={{ color: lightTheme.label.neutral }}>
      {text}
    </span>
  </div>
);