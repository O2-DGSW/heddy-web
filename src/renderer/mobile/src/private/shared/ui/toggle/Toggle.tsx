import { useState } from "react";

import { lightTheme, palette } from "@design-tokens";

export interface ToggleProps {
  defaultValue?: boolean;
  onChange?: (isOn: boolean) => void;
}

export const Toggle = ({ defaultValue = false, onChange }: ToggleProps) => {
  const [isOn, setIsOn] = useState(defaultValue);

  const handleToggle = () => {
    const newValue = !isOn;

    setIsOn(newValue);
    onChange?.(newValue);
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
        backgroundColor: isOn ? lightTheme.primary.normal : lightTheme.line.normal,
      }}
    >
      <div
        className={`
          aspect-square
          h-full
          rounded-full
          transition-all duration-300
          ${isOn ? "ml-auto" : "ml-0"}
        `}
        style={{
          backgroundColor: palette.neutral[95],
        }}
      />
    </button>
  );
};
