import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { font, lightTheme } from "@design-tokens";

import { useProcedureNotes } from "@/features/cuts/model/useProcedureNotes";
import type { ProcedureNote } from "@/features/cuts/model/types/AddProcedureNoteModal.types";
import { ProcedureNoteItem } from "./item/ProcedureNoteItem.tsx";
import icRoundPlus from "@/features/cuts/assets/procedute-note/ic_round-plus.svg";
import { NotfoundCutsList } from "@/features/cuts/ui/NotfoundCutsList.tsx";

export const ProcedureNoteList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { notes, addNote, isLoading, isError } = useProcedureNotes();
  const processedRef = useRef(false);

  useEffect(() => {
    const newNote = location.state?.newNote as ProcedureNote | undefined;
    if (newNote && !processedRef.current) {
      processedRef.current = true;
      addNote(newNote);
      navigate("/cuts", { replace: true, state: null });
    }
  }, []);

  return (
    <div
      className="h-full flex flex-col overflow-hidden pb-20"
      style={{ backgroundColor: lightTheme.fill.normal }}
    >
      {isLoading ? (
        <div className="flex-1" />
      ) : isError ? (
        <p className={`text-center pt-10 ${font.label.regular}`} style={{ color: lightTheme.label.assistive }}>
          시술기록을 불러오지 못했어요.
        </p>
      ) : notes.length === 0 ? (
        <NotfoundCutsList />
      ) : (
        <div className="flex-1 overflow-y-auto flex flex-col gap-3 px-4 pt-4">
          {notes.map(note => (
            <ProcedureNoteItem key={note.id} note={note} />
          ))}
        </div>
      )}

      <button
        className="fixed right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{
          bottom: "calc(env(safe-area-inset-bottom) + 5.75rem)",
          backgroundColor: lightTheme.primary.normal,
        }}
        onClick={() => navigate("/cuts/add")}
      >
        <img src={icRoundPlus} alt="추가" className="w-8 h-8" />
      </button>
    </div>
  );
};
