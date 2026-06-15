import { font, lightTheme } from "@design-tokens";

import type { ProcedureTag } from "@/pages/procedure/model/Procedure.types";

interface ProcedureTagChipProps {
  tag: ProcedureTag;
  onClick?: (tagId: string) => void;
}

const ProcedureTagChip = ({ tag, onClick }: ProcedureTagChipProps) => {
  const isInteractive = Boolean(onClick);
  const chipClassName = `relative z-10 flex h-6 shrink-0 items-center justify-center rounded-[0.3125rem] px-2 py-1 font-['Pretendard'] ${font.caption.medium} leading-none`;
  const chipStyle = {
    backgroundColor: tag.selected ? lightTheme.primary.normal : lightTheme.fill.neutral,
    color: tag.selected ? lightTheme.label.buttonText : lightTheme.label.alternative,
  };

  if (!isInteractive) {
    return (
      <span className={chipClassName} style={chipStyle}>
        {tag.label}
      </span>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={tag.selected}
      onClick={() => onClick?.(tag.id)}
      className={`${chipClassName} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#41BE8E]/30`}
      style={chipStyle}
    >
      {tag.label}
    </button>
  );
};

export { ProcedureTagChip };
