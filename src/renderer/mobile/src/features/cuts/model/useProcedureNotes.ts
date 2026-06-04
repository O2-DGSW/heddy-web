import { useEffect, useRef, useState } from "react";

import type { ProcedureNote } from "./types/AddProcedureNoteModal.types";

export const useProcedureNotes = () => {
  const [notes, setNotes] = useState<ProcedureNote[]>([]);
  const objectUrlsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const objectUrls = objectUrlsRef.current;
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
      objectUrls.clear();
    };
  }, []);

  const addNote = (note: ProcedureNote) => {
    if (note.imageUrl) objectUrlsRef.current.add(note.imageUrl);
    setNotes((prev) => [note, ...prev]);
  };

  const removeNote = (noteId: string) => {
    const noteToRemove = notes.find((note) => note.id === noteId);
    if (noteToRemove?.imageUrl && objectUrlsRef.current.has(noteToRemove.imageUrl)) {
      URL.revokeObjectURL(noteToRemove.imageUrl);
      objectUrlsRef.current.delete(noteToRemove.imageUrl);
    }
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
  };

  return { notes, addNote, removeNote };
};