import { lightTheme, palette } from "@design-tokens";

export interface ToggleProps {
  checked: boolean;
  onChange?: (isOn: boolean) => void;
}

export const Toggle = ({ checked, onChange }: ToggleProps) => {
  const handleToggle = () => {
    onChange?.(!checked);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="
        relative
        flex items-center
        w-[3rem]
        h-[1.575rem]
        rounded-full
        p-[0.2rem]
        transition-colors duration-300
        cursor-pointer
      "
      style={{
        backgroundColor: checked ? lightTheme.primary.normal : lightTheme.line.normal,
      }}
    >
      <div
        className={`
          aspect-square
          h-full
          rounded-full
          transition-all duration-300
          ${checked ? "ml-auto" : "ml-0"}
        `}
        style={{
          backgroundColor: palette.neutral[95],
        }}
      />
    </button>
  );
};
