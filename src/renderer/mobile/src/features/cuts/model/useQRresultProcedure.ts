import { useEffect, useMemo, useRef, useState } from "react";

import type {
  AddProcedureNoteForm,
  ProcedureNote,
  UseAddProcedureNoteReturn,
} from "./types/AddProcedureNoteModal.types";

const EMPTY_PROCEDURE_NOTES: ProcedureNote[] = [];

/**
 * 시술기록 추가 모달의 상태 및 이벤트 핸들러를 관리하는 훅
 * @returns 모달 open 상태, 폼 데이터, 핸들러 함수들
 */
export const useQRresultProcedure = (
  customerName: string,
  initialNotes: ProcedureNote[] = EMPTY_PROCEDURE_NOTES
): UseAddProcedureNoteReturn => {
  const [addedNotes, setAddedNotes] = useState<ProcedureNote[]>([]);
  const [removedNoteIds, setRemovedNoteIds] = useState<Set<string>>(() => new Set());
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

  const notes = useMemo(() => {
    const visibleInitialNotes = initialNotes.filter(note => !removedNoteIds.has(note.id));

    return [...addedNotes, ...visibleInitialNotes];
  }, [addedNotes, initialNotes, removedNoteIds]);

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
      afterImageUrl: null,
    };
    setAddedNotes(prev => [newNote, ...prev]);
    onClose();
  };

  /** 시술기록 추가 (외부에서 생성된 노트를 목록에 추가) */
  const addNote = (note: ProcedureNote) => {
    if (note.imageUrl) objectUrlsRef.current.add(note.imageUrl);
    setAddedNotes(prev => [note, ...prev]);
    setRemovedNoteIds(prev => {
      if (!prev.has(note.id)) {
        return prev;
      }

      const next = new Set(prev);
      next.delete(note.id);
      return next;
    });
  };

  /** 시술기록 삭제 */
  const onRemoveNote = (noteId: string) => {
    const noteToRemove = notes.find(note => note.id === noteId);
    revokeImageObjectUrl(noteToRemove?.imageUrl ?? null);
    setAddedNotes(prev => prev.filter(note => note.id !== noteId));
    setRemovedNoteIds(prev => {
      if (!initialNotes.some(note => note.id === noteId) || prev.has(noteId)) {
        return prev;
      }

      return new Set(prev).add(noteId);
    });
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
    addNote,
  };
};
