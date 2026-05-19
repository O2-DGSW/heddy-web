import { lightTheme, font } from '@design-tokens';

export interface RadioButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const RadioButton = ({ label, selected, onClick }: RadioButtonProps) => {
  return (
    <button
      type="button"
      className={`flex items-center gap-1 ${font.caption.medium}`}
      style={{ color: selected ? lightTheme.primary.normal : lightTheme.label.assistive }}
      onClick={onClick}
    >
      <div
        className="w-4 h-4 rounded-full border-4 flex items-center justify-center"
        style={{ borderColor: selected ? lightTheme.primary.normal : lightTheme.line.normal }}
      >
        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
      {label}
    </button>
  );
};