import { useNavigate } from "react-router-dom";

import { font, lightTheme, palette } from "@design-tokens";

import { CutsTag } from "@/private/shared/ui/cuts-tag/CutsTag.tsx";
import type { ProcedureNote } from "@/features/cuts/model/types/AddProcedureNoteModal.types.ts";
import dateSvg from "@/features/cuts/assets/procedute-note/Date.svg";
import rightArrowSvg from "@/features/cuts/assets/procedute-note/rightArrow.svg";

interface ProcedureNoteItemProps {
  note: ProcedureNote;
  bgColorGreen?: boolean;
}

/**
 * 날짜를 "M/D" 형식으로 변환
 * @param date 변환할 날짜
 */
const formatShortDate = (date: Date | string) => {
  const d = new Date(date);

  return Number.isNaN(d.getTime()) ? "" : `${d.getMonth() + 1}/${d.getDate()}`;
};

/**
 * 시술기록 목록 아이템 컴포넌트
 * @param props {@link ProcedureNoteItemProps}
 */
export const ProcedureNoteItem = ({ note, bgColorGreen }: ProcedureNoteItemProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center gap-3 px-4 py-4 rounded-2xl"
      style={{
        backgroundColor: bgColorGreen ? palette.main[97] : lightTheme.background.normal,
      }}
      onClick={() => navigate(`/cuts/${note.id}`, { state: { note } })}
    >
      {/* 썸네일 이미지 */}
      <div
        className="w-14 h-14 rounded-full overflow-hidden shrink-0"
        style={{ backgroundColor: lightTheme.fill.neutral }}
      >
        {note.imageUrl && (
          <img src={note.imageUrl} alt="시술 이미지" className="w-full h-full object-cover" />
        )}
      </div>

      {/* 내용 */}
      <div className="flex flex-col flex-1 gap-1 min-w-0 overflow-hidden">
        {/* 제목 + 고객명 뱃지 */}
        <div className="flex items-center gap-2">
          <span className={font.body.bold} style={{ color: lightTheme.label.neutral }}>
            {note.title}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full ${font.caption.medium}`}
            style={{
              backgroundColor: lightTheme.primary.normal,
              color: lightTheme.label.buttonText,
            }}
          >
            {note.customerName}
          </span>
        </div>

        {/* 부가설명 */}
        <span className={font.label.regular} style={{ color: lightTheme.label.alternative }}>
          {note.description}
        </span>

        {/* 날짜 */}
        <div className="flex items-center gap-1">
          <img src={dateSvg} alt="날짜" className="w-3.5 h-3.5" />
          <span className={font.caption.regular} style={{ color: lightTheme.label.assistive }}>
            {formatShortDate(note.date)}
          </span>
        </div>

        {/* 태그 */}
        {note.tags && (
          <div className="flex flex-wrap gap-1">
            <CutsTag text={note.tags} />
          </div>
        )}
      </div>

      {/* 우측 화살표 */}
      <img src={rightArrowSvg} alt="상세보기" className="w-4 h-4 shrink-0" />
    </div>
  );
};
