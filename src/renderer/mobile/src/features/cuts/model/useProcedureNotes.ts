import { useEffect, useMemo, useRef, useState } from "react";

import { useMyTreatmentRecordsQuery } from "@/entities/customer/api/query/useMyTreatmentRecords.query";
import { mapTreatmentRecordToProcedureNote } from "@/features/cuts/utils/mapTreatmentRecord";
import type { ProcedureNote } from "./types/AddProcedureNoteModal.types";

export const useProcedureNotes = () => {
  const { data: treatmentRecords, isLoading, isError } = useMyTreatmentRecordsQuery();

  const [addedNotes, setAddedNotes] = useState<ProcedureNote[]>([]);
  const objectUrlsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const objectUrls = objectUrlsRef.current;
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
      objectUrls.clear();
    };
  }, []);

  const notes = useMemo(() => {
    const fetchedNotes = (treatmentRecords ?? []).map((record) =>
      mapTreatmentRecordToProcedureNote(record, record.designer_name)
    );
    return [...addedNotes, ...fetchedNotes];
  }, [treatmentRecords, addedNotes]);

  const addNote = (note: ProcedureNote) => {
    if (note.imageUrl) objectUrlsRef.current.add(note.imageUrl);
    setAddedNotes((prev) => [note, ...prev]);
  };

  const removeNote = (noteId: string) => {
    const noteToRemove = addedNotes.find((note) => note.id === noteId);
    if (noteToRemove?.imageUrl && objectUrlsRef.current.has(noteToRemove.imageUrl)) {
      URL.revokeObjectURL(noteToRemove.imageUrl);
      objectUrlsRef.current.delete(noteToRemove.imageUrl);
    }
    setAddedNotes((prev) => prev.filter((note) => note.id !== noteId));
  };

  return { notes, addNote, removeNote, isLoading, isError };
};