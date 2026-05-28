import { font, lightTheme } from "@design-tokens";

interface ShopInfoRowProps {
  text: string;
}

export const ShopInfoRow = ({ text }: ShopInfoRowProps) => (
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