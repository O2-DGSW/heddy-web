import { font, lightTheme } from "@design-tokens";

interface CutsTagProps {
  text: string;
  selected?: boolean;
}

export const CutsTag = ({ text, selected = false }: CutsTagProps) => {
  return (
    <div
      className="px-[0.325rem] py-[0.125rem] rounded-[0.325rem]"
      style={{
        backgroundColor: selected ? lightTheme.primary.normal : lightTheme.fill.neutral,
      }}
    >
      <p
        className={font.caption.medium}
        style={{ color: selected ? lightTheme.label.buttonText : lightTheme.label.alternative }}
      >
        # {text}
      </p>
    </div>
  );
};