import { useNavigate } from "react-router-dom";

import { font, lightTheme } from "@design-tokens";
import { PROCEDURE_TAGS } from "@/features/cuts/constrants/procedure-tags";
import { CutsTag } from "@/private/shared/ui/cuts-tag/CutsTag";
import arrowSvg from "@/private/shared/ui/dialog/assets/Arrow.svg";

import { useAddProcedureNoteForm } from "../model/useAddProcedureNoteForm";
import { validateAddProcedureNoteForm } from "../model/validateAddProcedureNoteForm";
import { ImageUploadArea } from "./ImageUploadArea";

export const AddProcedureNotePage = () => {
  const navigate = useNavigate();
  const {
    title, setTitle,
    memo, setMemo,
    dateValue, setDate,
    phoneNumber, handlePhoneChange,
    price, setPrice,
    selectedTags, toggleTag,
    beforeImageFile, setBeforeImageFile,
    afterImageFile, setAfterImageFile,
    isSubmitting,
    submitError,
    handleSubmit,
  } = useAddProcedureNoteForm();

  const isValid = validateAddProcedureNoteForm({ phoneNumber, price, treatmentDate: dateValue });

  const inputClass = `w-full px-4 py-3 rounded-xl focus:outline-none ${font.caption.regular}`;
  const inputStyle = {
    backgroundColor: lightTheme.background.neutral,
    color: lightTheme.label.normal,
  };
  const labelClass = `${font.label.medium} pl-1`;

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden pt-safe"
      style={{ backgroundColor: lightTheme.background.normal }}
    >
      <div className="relative flex items-center px-4 py-3 pt-5 shrink-0">
        <button type="button" onClick={() => navigate(-1)} className="absolute left-4 p-1">
          <img src={arrowSvg} alt="뒤로가기" className="w-4 h-4" />
        </button>
        <h2
          className={`flex-1 text-center ${font.headline1.semiBold}`}
          style={{ color: lightTheme.label.neutral }}
        >
          시술 기록 추가
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-4 pb-28">
        {/* 고객 전화번호 */}
        <div className="flex flex-col gap-1">
          <label className={labelClass} style={{ color: lightTheme.label.assistive }}>고객 전화번호 *</label>
          <input
            className={inputClass}
            style={inputStyle}
            placeholder="010-0000-0000"
            value={phoneNumber}
            onChange={(e) => handlePhoneChange(e.target.value)}
            inputMode="tel"
          />
        </div>

        {/* 시술 날짜 */}
        <div className="flex flex-col gap-1">
          <label className={labelClass} style={{ color: lightTheme.label.assistive }}>시술 날짜 *</label>
          <input
            type="date"
            className={`${inputClass} appearance-none`}
            style={inputStyle}
            value={dateValue}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </div>

        {/* 가격 */}
        <div className="flex flex-col gap-1">
          <label className={labelClass} style={{ color: lightTheme.label.assistive }}>가격 *</label>
          <input
            className={inputClass}
            style={inputStyle}
            placeholder="시술 금액을 입력해주세요."
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))}
            inputMode="numeric"
          />
        </div>

        {/* 제목 */}
        <div className="flex flex-col gap-1">
          <label className={labelClass} style={{ color: lightTheme.label.assistive }}>제목</label>
          <input
            className={inputClass}
            style={inputStyle}
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* 메모 */}
        <div className="flex flex-col gap-1">
          <label className={labelClass} style={{ color: lightTheme.label.assistive }}>메모</label>
          <input
            className={inputClass}
            style={inputStyle}
            placeholder="메모를 입력해주세요."
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>

        {/* 시술 태그 */}
        <div className="flex flex-col gap-2">
          <span className={labelClass} style={{ color: lightTheme.label.assistive }}>시술 태그</span>
          <div className="flex flex-wrap gap-2">
            {PROCEDURE_TAGS.map(({ label, value }) => (
              <button key={value} type="button" onClick={() => toggleTag(value)}>
                <CutsTag text={label} selected={selectedTags.includes(value)} />
              </button>
            ))}
          </div>
        </div>

        {/* 사진 등록 */}
        <div className="flex flex-col gap-2">
          <span className={labelClass} style={{ color: lightTheme.label.normal }}>사진 등록</span>
          <div className="flex gap-3">
            <ImageUploadArea label="Before 사진" initialFile={beforeImageFile} onFileChange={setBeforeImageFile} />
            <ImageUploadArea label="After 사진" initialFile={afterImageFile} onFileChange={setAfterImageFile} />
          </div>
        </div>

        {submitError && (
          <p className={`${font.caption.regular} pl-1`} style={{ color: lightTheme.status.error }}>
            {submitError}
          </p>
        )}
      </div>

      <div className="px-4 py-3 shrink-0" style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 6.25rem)" }}>
        <button
          type="button"
          className={`w-full py-3 rounded-xl ${font.body.bold}`}
          style={{
            backgroundColor: isValid && !isSubmitting ? lightTheme.primary.normal : lightTheme.fill.neutral,
            color: isValid && !isSubmitting ? lightTheme.label.buttonText : lightTheme.label.assistive,
          }}
          disabled={!isValid || isSubmitting}
          onClick={() => handleSubmit()}
        >
          {isSubmitting ? "등록 중..." : "추가"}
        </button>
      </div>
    </div>
  );
};
