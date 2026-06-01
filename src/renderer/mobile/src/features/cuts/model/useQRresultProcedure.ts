import { useEffect, useRef, useState } from "react";

import type {
  AddProcedureNoteForm,
  ProcedureNote,
  UseAddProcedureNoteReturn,
} from "./types/AddProcedureNoteModal.types";

/**
 * 시술기록 추가 모달의 상태 및 이벤트 핸들러를 관리하는 훅
 * @returns 모달 open 상태, 폼 데이터, 핸들러 함수들
 */
export const useQRresultProcedure = (customerName: string): UseAddProcedureNoteReturn => {
  const [notes, setNotes] = useState<ProcedureNote[]>([
    {
      id: "1",
      customerName: "오용준",
      title: "레이어드 커트",
      description: "자연스러운 레이어드로 볼륨감 살린 스타일",
      date: new Date("2026-05-20"),
      tags: "커트,레이어드",
      imageUrl: null,
    },
    {
      id: "2",
      customerName: "강장민",
      title: "남자 투블럭",
      description: "옆면 짧게 정리하고 윗머리 텍스처 살림",
      date: new Date("2026-05-22"),
      tags: "커트,투블럭",
      imageUrl: null,
    },
    {
      id: "3",
      customerName: "이민수",
      title: "볼륨 펌",
      description: "C컬로 자연스러운 떨어짐 연출",
      date: new Date("2026-05-23"),
      tags: "펌,볼륨",
      imageUrl: null,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const objectUrlsRef = useRef<Set<string>>(new Set());
  const [form, setForm] = useState<AddProcedureNoteForm>({
    title: "",
    description: "",
    date: new Date(),
    tags: "",
    image: null,
  });

  useEffect(() => {
    const objectUrls = objectUrlsRef.current;

    return () => {
      objectUrls.forEach(url => URL.revokeObjectURL(url));
      objectUrls.clear();
    };
  }, []);

  const createImageObjectUrl = (file: File | null) => {
    if (!file) return null;

    const url = URL.createObjectURL(file);
    objectUrlsRef.current.add(url);
    return url;
  };

  const revokeImageObjectUrl = (url: string | null) => {
    if (!url || !objectUrlsRef.current.has(url)) return;

    URL.revokeObjectURL(url);
    objectUrlsRef.current.delete(url);
  };

  /** 모달 열기 */
  const onOpen = () => setIsOpen(true);

  /** 모달 닫기 및 폼 초기화 */
  const onClose = () => {
    setIsOpen(false);
    setForm({ title: "", description: "", date: new Date(), tags: "", image: null });
  };

  /** @param value 제목 */
  const onChangeTitle = (value: string) => setForm(prev => ({ ...prev, title: value }));

  /** @param value 부가설명 */
  const onChangeDescription = (value: string) => setForm(prev => ({ ...prev, description: value }));

  /** @param date 시술 날짜 */
  const onChangeDate = (date: Date) => setForm(prev => ({ ...prev, date }));

  /** @param value 시술 태그 */
  const onChangeTags = (value: string) => setForm(prev => ({ ...prev, tags: value }));

  /** @param file 업로드한 이미지 파일 */
  const onChangeImage = (file: File | null) => setForm(prev => ({ ...prev, image: file }));

  /** 시술기록 추가 제출 */
  const onSubmit = () => {
    const newNote: ProcedureNote = {
      id: crypto.randomUUID(),
      customerName,
      title: form.title,
      description: form.description,
      date: form.date,
      tags: form.tags,
      imageUrl: createImageObjectUrl(form.image),
    };
    setNotes(prev => [newNote, ...prev]);
    onClose();
  };

  /** 시술기록 삭제 */
  const onRemoveNote = (noteId: string) => {
    const noteToRemove = notes.find(note => note.id === noteId);
    revokeImageObjectUrl(noteToRemove?.imageUrl ?? null);
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  return {
    notes,
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
    onRemoveNote,
  };
};
