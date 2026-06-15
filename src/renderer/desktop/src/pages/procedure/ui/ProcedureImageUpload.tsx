import { useId } from "react";
import { font, lightTheme } from "@design-tokens";

import pictureIcon from "@/pages/procedure/assets/svg/picture.svg";
import type { ProcedureUploadSlot } from "@/pages/procedure/model/Procedure.types";

interface ProcedureImageUploadProps {
  slot: ProcedureUploadSlot;
  title: string;
  previewUrl: string | null;
  onImageChange: (slot: ProcedureUploadSlot, file: File | null) => void;
}

const ProcedureImageUpload = ({
  slot,
  title,
  previewUrl,
  onImageChange,
}: ProcedureImageUploadProps) => {
  const inputId = useId();

  return (
    <label
      htmlFor={inputId}
      className="relative flex h-[13.25rem] min-w-0 flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-xl border bg-white transition-shadow hover:shadow-[0_0_0.25rem_rgba(0,0,0,0.04)]"
      style={{ borderColor: lightTheme.line.alternative }}
    >
      {previewUrl ? (
        <img src={previewUrl} alt={`${title} 미리보기`} className="size-full object-cover" />
      ) : (
        <span className="flex w-[6.5625rem] flex-col items-center">
          <img src={pictureIcon} alt="" className="size-8" aria-hidden="true" />
          <span className="mt-2 flex flex-col items-center">
            <span
              className={`font-['Pretendard'] ${font.label.medium}`}
              style={{ color: lightTheme.label.alternative }}
            >
              {title}
            </span>
            <span
              className={`font-['Pretendard'] ${font.caption.medium}`}
              style={{ color: lightTheme.line.normal }}
            >
              이미지를 업로드하세요
            </span>
          </span>
          <span
            className={`mt-2 flex h-7 items-center justify-center rounded border bg-white px-3 font-['Pretendard'] ${font.caption.semiBold}`}
            style={{
              borderColor: lightTheme.line.alternative,
              color: lightTheme.line.normal,
            }}
          >
            이미지 업로드
          </span>
        </span>
      )}

      <input
        id={inputId}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={event => onImageChange(slot, event.target.files?.[0] ?? null)}
      />
    </label>
  );
};

export { ProcedureImageUpload };
