import { useState } from "react";

import type {
  AddProcedureNoteForm,
  UseAddProcedureNoteReturn,
} from "./types/AddProcedureNoteModal.types";

/**
 * 시술기록 추가 모달의 상태 및 이벤트 핸들러를 관리하는 훅
 * @returns 모달 open 상태, 폼 데이터, 핸들러 함수들
 */
export const useAddProcedureNote = (): UseAddProcedureNoteReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<AddProcedureNoteForm>({
    title: "",
    description: "",
    date: new Date(),
    tags: "",
    image: null,
  });

  /** 모달 열기 */
  const onOpen = () => setIsOpen(true);

  /** 모달 닫기 및 폼 초기화 */
  const onClose = () => {
    setIsOpen(false);
    setForm({ title: "", description: "", date: new Date(), tags: "", image: null });
  };

  /** @param value 제목 */
  const onChangeTitle = (value: string) =>
    setForm((prev) => ({ ...prev, title: value }));

  /** @param value 부가설명 */
  const onChangeDescription = (value: string) =>
    setForm((prev) => ({ ...prev, description: value }));

  /** @param date 시술 날짜 */
  const onChangeDate = (date: Date) =>
    setForm((prev) => ({ ...prev, date }));

  /** @param value 시술 태그 */
  const onChangeTags = (value: string) =>
    setForm((prev) => ({ ...prev, tags: value }));

  /** @param file 업로드한 이미지 파일 */
  const onChangeImage = (file: File | null) =>
    setForm((prev) => ({ ...prev, image: file }));

  /** 시술기록 추가 제출 - TODO: API 연동 */
  const onSubmit = () => {
    onClose();
  };

  return {
    isOpen,
    onOpen,
    onClose,
    form,
    onChangeTitle,
    onChangeDescription,
    onChangeDate,
    onChangeTags,
    onChangeImage,
    onSubmit,
  };
};