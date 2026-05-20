import { font, lightTheme } from "@design-tokens";

interface CutsTagProps {
  text: string;
}

export const CutsTag = ({ text }: CutsTagProps) => {
  return (
    <div
      className="px-[0.325rem] py-[0.125rem] rounded-[0.325rem]"
      style={{ backgroundColor: lightTheme.fill.neutral }}
    >
      <p className={font.caption.medium} style={{ color: lightTheme.label.alternative }}>
        # {text}
      </p>
    </div>
  );
};
