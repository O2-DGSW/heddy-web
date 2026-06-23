import { useNavigate } from "react-router-dom";

import type { ProcedureNote } from "@/features/cuts/model/types/AddProcedureNoteModal.types";
import { useAddProcedureNoteStore } from "@/features/cuts/model/useAddProcedureNoteStore";

const toInputDateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const createObjectUrl = (file: File | null) => {
  if (!file) return null;
  return URL.createObjectURL(file);
};

export const useAddProcedureNoteForm = () => {
  const navigate = useNavigate();
  const {
    title, setTitle,
    description, setDescription,
    date, setDate,
    customer, setCustomer,
    selectedTags, toggleTag,
    beforeImageFile, setBeforeImageFile,
    afterImageFile, setAfterImageFile,
    reset,
  } = useAddProcedureNoteStore();

  const handleSubmit = () => {
    const beforeImageUrl = createObjectUrl(beforeImageFile);
    const afterImageUrl = createObjectUrl(afterImageFile);

    const newNote: ProcedureNote = {
      id: crypto.randomUUID(),
      customerName: customer || "고객",
      title,
      description,
      date,
      tags: selectedTags.join(", "),
      imageUrl: beforeImageUrl,
      afterImageUrl,
    };

    reset();
    navigate("/cuts", { state: { newNote } });
  };

  return {
    title, setTitle,
    description, setDescription,
    dateValue: toInputDateValue(date), setDate,
    customer, setCustomer,
    selectedTags, toggleTag,
    beforeImageFile, setBeforeImageFile,
    afterImageFile, setAfterImageFile,
    handleSubmit,
  };
};
