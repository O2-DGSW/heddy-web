import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { font, lightTheme } from "@design-tokens";
import { PROCEDURE_TAGS } from "@/features/cuts/constrants/procedure-tags";
import { CutsTag } from "@/private/shared/ui/cuts-tag/CutsTag";
import arrowSvg from "@/private/shared/ui/dialog/assets/Arrow.svg";

import { useAddProcedureNoteForm } from "../model/useAddProcedureNoteForm";
import { validateAddProcedureNoteForm } from "../model/validateAddProcedureNoteForm";
import { ImageUploadArea } from "./ImageUploadArea";

export const AddProcedureNotePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    title, setTitle,
    description, setDescription,
    dateValue, setDate,
    customer, setCustomer,
    selectedTags, toggleTag,
    beforeImageUrl, setBeforeImageUrl,
    afterImageUrl, setAfterImageUrl,
    handleSubmit,
  } = useAddProcedureNoteForm();

  useEffect(() => {
    const selected = location.state?.selectedCustomer as string | undefined;
    if (selected) {
      setCustomer(selected);
      navigate("/cuts/add", { replace: true, state: null });
    }
  }, []);

  const isValid = validateAddProcedureNoteForm({ title, description, customer, selectedTags, beforeImageUrl });

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
      {/* 헤더 */}
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

      {/* 폼 영역 */}
      <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-4 pb-28">
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

        {/* 부가설명 */}
        <div className="flex flex-col gap-1">
          <label className={labelClass} style={{ color: lightTheme.label.assistive }}>부가설명</label>
          <input
            className={inputClass}
            style={inputStyle}
            placeholder="부가설명을 입력해주세요."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* 시술 날짜 */}
        <div className="flex flex-col gap-1">
          <label className={labelClass} style={{ color: lightTheme.label.assistive }}>시술 날짜</label>
          <input
            type="date"
            className={`${inputClass} appearance-none`}
            style={inputStyle}
            value={dateValue}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </div>

        {/* 고객 찾기 */}
        <div className="flex flex-col gap-1">
          <label className={labelClass} style={{ color: lightTheme.label.assistive }}>고객 찾기</label>
          <button
            type="button"
            className={`${inputClass} text-left`}
            style={inputStyle}
            onClick={() => navigate("/cuts/customer-search")}
          >
            {customer || (
              <span style={{ color: lightTheme.label.assistive }}>고객 찾기</span>
            )}
          </button>
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
            <ImageUploadArea label="Before 사진" initialUrl={beforeImageUrl} onFileChange={setBeforeImageUrl} />
            <ImageUploadArea label="After 사진" initialUrl={afterImageUrl} onFileChange={setAfterImageUrl} />
          </div>
        </div>
      </div>

      {/* 추가 버튼 */}
      <div className="px-4 py-3 shrink-0" style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 6.25rem)" }}>
        <button
          type="button"
          className={`w-full py-3 rounded-xl ${font.body.bold}`}
          style={{
            backgroundColor: isValid ? lightTheme.primary.normal : lightTheme.fill.neutral,
            color: isValid ? lightTheme.label.buttonText : lightTheme.label.assistive,
          }}
          disabled={!isValid}
          onClick={() => handleSubmit()}
        >
          추가
        </button>
      </div>
    </div>
  );
};