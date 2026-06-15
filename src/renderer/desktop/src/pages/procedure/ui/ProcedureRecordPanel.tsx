import { font, lightTheme } from "@design-tokens";

import { PROCEDURE_MEMO_MAX_LENGTH } from "@/pages/procedure/model/Procedure.constant";
import type { ProcedureRecordPanelProps } from "@/pages/procedure/model/Procedure.types";

import { ProcedureImageUpload } from "./ProcedureImageUpload";
import { ProcedurePanel } from "./ProcedurePanel";
import { ProcedureTagChip } from "./ProcedureTagChip";

const ProcedureRecordPanel = ({
  tags,
  memo,
  imagePreviews,
  onToggleTag,
  onMemoChange,
  onImageChange,
  onCancel,
  onSave,
}: ProcedureRecordPanelProps) => {
  return (
    <ProcedurePanel className="h-full min-w-0 flex-1">
      <div className="flex h-full min-w-0 flex-col px-[2.1875rem] py-[1.4375rem]">
        <div className="relative z-0 h-[15.8125rem]">
          <h2
            className={`font-['Pretendard'] ${font.headline1.bold}`}
            style={{ color: lightTheme.label.neutral }}
          >
            Before / After 사진
          </h2>
          <div className="mt-4 flex min-w-0 gap-[1.6875rem]">
            <ProcedureImageUpload
              slot="before"
              title="Before 사진"
              previewUrl={imagePreviews.before}
              onImageChange={onImageChange}
            />
            <ProcedureImageUpload
              slot="after"
              title="After 사진"
              previewUrl={imagePreviews.after}
              onImageChange={onImageChange}
            />
          </div>
        </div>

        <div className="relative z-10 mt-5 h-[7.75rem]">
          <h2
            className={`font-['Pretendard'] ${font.headline1.bold}`}
            style={{ color: lightTheme.label.neutral }}
          >
            태그
          </h2>
          <div className="relative z-10 mt-2 flex h-[5.5rem] min-w-0 flex-wrap content-start gap-[0.3125rem] overflow-visible">
            {tags.map(tag => (
              <ProcedureTagChip key={tag.id} tag={tag} onClick={onToggleTag} />
            ))}
          </div>
        </div>

        <div className="mt-5 h-[15.6875rem]">
          <h2
            className={`font-['Pretendard'] ${font.headline1.bold}`}
            style={{ color: lightTheme.label.neutral }}
          >
            메모
          </h2>
          <label className="relative mt-4 block h-[13.25rem]">
            <textarea
              value={memo}
              maxLength={PROCEDURE_MEMO_MAX_LENGTH}
              onChange={event => onMemoChange(event.target.value)}
              className={`size-full resize-none overflow-hidden rounded-xl border-0 px-4 py-5 font-['Pretendard'] ${font.label.medium} outline-none placeholder:text-[#C1C2C3] focus:ring-2 focus:ring-[#41BE8E]/30`}
              placeholder="시술 관련 기록을 할 수 있는 공간입니다 (재방문 시 참고 가능)"
              aria-label="시술 메모"
              style={{
                backgroundColor: lightTheme.fill.normal,
                color: lightTheme.label.neutral,
              }}
            />
            <span
              className={`pointer-events-none absolute bottom-5 right-[1.375rem] font-['Pretendard'] ${font.caption.medium}`}
              style={{ color: lightTheme.line.normal }}
            >
              {memo.length} / {PROCEDURE_MEMO_MAX_LENGTH}
            </span>
          </label>
        </div>

        <div className="mt-5 flex h-8 justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className={`flex h-8 w-[5.625rem] items-center justify-center rounded-md font-['Pretendard'] ${font.body.semiBold} transition-shadow hover:shadow-[0_0_0.25rem_rgba(0,0,0,0.04)]`}
            style={{
              backgroundColor: lightTheme.background.neutral,
              color: lightTheme.line.normal,
            }}
          >
            취소
          </button>
          <button
            type="button"
            onClick={onSave}
            className={`flex h-8 w-[5.625rem] items-center justify-center rounded-md font-['Pretendard'] ${font.body.semiBold} transition-shadow hover:shadow-[0_0_0.25rem_rgba(0,0,0,0.04)]`}
            style={{
              backgroundColor: lightTheme.primary.normal,
              color: lightTheme.fill.normal,
            }}
          >
            저장
          </button>
        </div>
      </div>
    </ProcedurePanel>
  );
};

export { ProcedureRecordPanel };
