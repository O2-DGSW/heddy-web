import { useNavigate, useLocation } from "react-router-dom";

import { font, lightTheme, palette } from "@design-tokens";
import type { ProcedureNote } from "@/features/cuts/model/types/AddProcedureNoteModal.types";
import arrowSvg from "@/private/shared/ui/dialog/assets/Arrow.svg";
import dateSvg from "@/features/cuts/assets/procedute-note/Date.svg";
import pictureSvg from "@/features/cuts/assets/procedute-note/Picture.svg";

const formatShortDate = (date: Date | string) => {
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? "" : `${d.getMonth() + 1}/${d.getDate()}`;
};

export const ProcedureNoteDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const note = state?.note as ProcedureNote | undefined;

  if (!note) {
    navigate(-1);
    return null;
  }

  const tags = note.tags ? note.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden pt-safe"
      style={{ backgroundColor: lightTheme.background.normal }}
    >
      {/* 헤더 */}
      <div className="relative flex items-center px-4 py-3 pt-5 shrink-0">
        <button type="button" onClick={() => navigate(-1)} className="absolute left-4 p-1">
          <img src={arrowSvg} alt="뒤로가기" className="w-4 h-4" />
        </button>
        <h2
          className={`flex-1 text-center ${font.headline1.semiBold}`}
          style={{ color: lightTheme.label.neutral }}
        >
          시술 기록
        </h2>
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-4 pb-8">
        {/* 제목 + 토글 영역 */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col gap-1">
            <span className={font.headline2.bold} style={{ color: lightTheme.label.neutral }}>
              {note.title}
            </span>
            <div className="flex items-center gap-2">
              <img src={dateSvg} alt="날짜" className="w-4 h-4" />
              <span className={font.label.regular} style={{ color: lightTheme.label.alternative }}>
                {formatShortDate(note.date)}
              </span>
              <span style={{ color: lightTheme.label.assistive }}>·</span>
              <span className={font.label.regular} style={{ color: lightTheme.label.alternative }}>
                {note.customerName}
              </span>
            </div>
          </div>
        </div>

        {/* Before / After 이미지 */}
        <div
          className="rounded-2xl overflow-hidden p-4 flex gap-3"
          style={{ backgroundColor: lightTheme.fill.normal }}
        >
          {/* Before */}
          <div className="flex-1 flex flex-col gap-1">
            <div
              className="w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: lightTheme.fill.neutral }}
            >
              {note.imageUrl ? (
                <img src={note.imageUrl} alt="Before" className="w-full h-full object-cover" />
              ) : (
                <img src={pictureSvg} alt="사진 없음" className="w-10 h-10 opacity-30" />
              )}
            </div>
            <span
              className={`text-center ${font.caption.medium}`}
              style={{ color: lightTheme.label.alternative }}
            >
              Before
            </span>
          </div>

          {/* After */}
          <div className="flex-1 flex flex-col gap-1">
            <div
              className="w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: lightTheme.fill.neutral }}
            >
              {note.afterImageUrl ? (
                <img src={note.afterImageUrl} alt="After" className="w-full h-full object-cover" />
              ) : (
                <img src={pictureSvg} alt="사진 없음" className="w-10 h-10 opacity-30" />
              )}
            </div>
            <span
              className={`text-center ${font.caption.medium}`}
              style={{ color: lightTheme.label.alternative }}
            >
              After
            </span>
          </div>
        </div>

        {/* 태그 */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full ${font.caption.medium}`}
                style={{
                  backgroundColor: lightTheme.fill.normal,
                  color: lightTheme.label.alternative,
                }}
              >
                # {tag}
              </span>
            ))}
          </div>
        )}

        {/* 메모 */}
        {note.description && (
          <div
            className="rounded-2xl p-4 flex flex-col gap-2"
            style={{ backgroundColor: lightTheme.background.normal, border: `1px solid ${palette.neutral[90]}` }}
          >
            <span className={font.body.bold} style={{ color: lightTheme.label.neutral }}>
              메모
            </span>
            <p className={font.label.regular} style={{ color: lightTheme.label.alternative }}>
              {note.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};