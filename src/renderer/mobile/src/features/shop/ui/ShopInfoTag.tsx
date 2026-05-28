import { font, lightTheme } from "@design-tokens";

interface ShopInfoTagProps {
  label: string;
}

export const ShopInfoTag = ({ label }: ShopInfoTagProps) => (
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