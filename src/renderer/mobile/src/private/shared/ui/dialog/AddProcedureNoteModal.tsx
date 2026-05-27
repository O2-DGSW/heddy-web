import { useRef, useState, useEffect } from "react";

import arrowSvg from "./assets/Arrow.svg";

import { font, lightTheme } from "@design-tokens";

import { Select } from "@/private/shared/ui/select/Select";
import { PROCEDURE_TAGS } from "@/features/cuts/constrants/procedure-tags";
import type { AddProcedureNoteModalProps } from "@/features/cuts/model/types/AddProcedureNoteModal.types";

/**
 * Date를 input[type="date"] value 형식으로 변환
 * @param date 변환할 날짜
 * @returns "YYYY-MM-DD" 형식의 문자열
 */
const toInputDateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * 시술기록 추가 모달 컴포넌트
 * @param props {@link AddProcedureNoteModalProps}
 */
export const AddProcedureNoteModal = ({
  isOpen,
  onClose,
  form,
  onChangeTitle,
  onChangeDescription,
  onChangeDate,
  onChangeTags,
  onChangeImage,
  onSubmit,
}: AddProcedureNoteModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!form.image) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(form.image);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [form.image]);

  if (!isOpen) return null;

  /** 이미지 업로드 영역 클릭 시 파일 입력 트리거 */
  const handleImageAreaClick = () => fileInputRef.current?.click();

  /** 파일 선택 시 이미지 상태 업데이트 */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeImage(e.target.files?.[0] ?? null);
  };

  const inputClass = `w-full px-4 py-3 rounded-xl focus:outline-none ${font.caption.regular}`;
  const inputStyle = {
    backgroundColor: lightTheme.background.neutral,
    color: lightTheme.label.assistive,
  };
  const labelClass = `${font.label.medium} pl-2`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      <div
        className="w-[88%] max-h-[90vh] rounded-2xl flex flex-col overflow-hidden"
        style={{ backgroundColor: lightTheme.background.normal }}
      >
        {/* 헤더 */}
        <div className="relative flex items-center px-4 py-3 pt-5">
          <button onClick={onClose} className="absolute left-4 p-1">
            <img src={arrowSvg} alt="뒤로가기" className="w-4 h-4" />
          </button>
          <h2
            className={`flex-1 text-center ${font.label.bold}`}
            style={{ color: lightTheme.label.neutral }}
          >
            시술기록 추가
          </h2>
        </div>

        {/* 스크롤 가능한 폼 영역 */}
        <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-3">
          {/* 제목 */}
          <div className="flex flex-col gap-1">
            <label className={labelClass} style={{ color: lightTheme.label.assistive }}>
              제목
            </label>
            <input
              className={inputClass}
              style={inputStyle}
              placeholder="제목을 입력해주세요."
              value={form.title}
              onChange={(e) => onChangeTitle(e.target.value)}
            />
          </div>

          {/* 부가설명 */}
          <div className="flex flex-col gap-1">
            <label className={labelClass} style={{ color: lightTheme.label.assistive }}>
              부가설명
            </label>
            <input
              className={inputClass}
              style={inputStyle}
              placeholder="부가설명을 입력해주세요."
              value={form.description}
              onChange={(e) => onChangeDescription(e.target.value)}
            />
          </div>

          {/* 시술 날짜 */}
          <div className="flex flex-col gap-1">
            <label className={labelClass} style={{ color: lightTheme.label.assistive }}>
              시술 날짜
            </label>
            <input
              type="date"
              className={`${inputClass} appearance-none`}
              style={inputStyle}
              value={toInputDateValue(form.date)}
              onChange={(e) => onChangeDate(new Date(e.target.value))}
            />
          </div>

          {/* 시술 태그 */}
          <div className="flex flex-col gap-1">
            <label className={labelClass} style={{ color: lightTheme.label.assistive }}>
              시술 태그
            </label>
            <Select
              options={[...PROCEDURE_TAGS]}
              value={form.tags}
              onChange={onChangeTags}
              placeholder="시술 태그를 선택해주세요."
            />
          </div>

          {/* 이미지 업로드 */}
          <div className="flex flex-col items-center gap-1 pb-3">
            <button
              className="w-full h-36 rounded-xl flex flex-col items-center justify-center gap-1"
              style={{ backgroundColor: lightTheme.background.neutral }}
              onClick={handleImageAreaClick}
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="업로드된 이미지"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <span className={font.caption.regular} style={{ color: lightTheme.label.assistive }}>
                  + 이미지
                </span>
              )}
            </button>
            <p className={font.caption.regular} style={{ color: lightTheme.label.assistive }}>
              사진을 올려주세요!
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* 추가 버튼 */}
        <div className="px-4 py-3">
          <button
            className={`w-full py-3 rounded-xl ${font.body.bold}`}
            style={{
              backgroundColor: lightTheme.primary.normal,
              color: lightTheme.label.buttonText,
            }}
            onClick={onSubmit}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};