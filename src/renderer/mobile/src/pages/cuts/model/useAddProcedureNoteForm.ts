import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { ProcedureNote } from "@/features/cuts/model/types/AddProcedureNoteModal.types";

const SESSION_KEY = "addProcedureNoteForm";

const toInputDateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const loadSession = () => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as { title: string; description: string; dateStr: string; customer: string; selectedTags: string[] }) : null;
  } catch {
    return null;
  }
};

const saveSession = (data: { title: string; description: string; dateStr: string; customer: string; selectedTags: string[] }) => {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
};

const clearSession = () => sessionStorage.removeItem(SESSION_KEY);

export const useAddProcedureNoteForm = () => {
  const navigate = useNavigate();
  const saved = loadSession();

  const [title, setTitleState] = useState(saved?.title ?? "");
  const [description, setDescriptionState] = useState(saved?.description ?? "");
  const [date, setDateState] = useState(saved?.dateStr ? new Date(saved.dateStr) : new Date());
  const [customer, setCustomerState] = useState(saved?.customer ?? "");
  const [selectedTags, setSelectedTags] = useState<string[]>(saved?.selectedTags ?? []);

  const dateValue = toInputDateValue(date);

  const persist = (patch: Partial<{ title: string; description: string; dateStr: string; customer: string; selectedTags: string[] }>) => {
    saveSession({ title, description, dateStr: toInputDateValue(date), customer, selectedTags, ...patch });
  };

  const setTitle = (value: string) => { setTitleState(value); persist({ title: value }); };
  const setDescription = (value: string) => { setDescriptionState(value); persist({ description: value }); };
  const setDate = (d: Date) => { setDateState(d); persist({ dateStr: toInputDateValue(d) }); };
  const setCustomer = (value: string) => { setCustomerState(value); persist({ customer: value }); };

  const toggleTag = (value: string) => {
    setSelectedTags((prev) => {
      const next = prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value];
      persist({ selectedTags: next });
      return next;
    });
  };

  const handleSubmit = (beforeImage: File | null, afterImage: File | null) => {
    const newNote: ProcedureNote = {
      id: crypto.randomUUID(),
      customerName: customer || "고객",
      title,
      description,
      date,
      tags: selectedTags.join(", "),
      imageUrl: beforeImage ? URL.createObjectURL(beforeImage) : null,
      afterImageUrl: afterImage ? URL.createObjectURL(afterImage) : null,
    };
    clearSession();
    navigate("/cuts", { state: { newNote } });
  };

  return {
    title, setTitle,
    description, setDescription,
    dateValue, setDate,
    customer, setCustomer,
    selectedTags, toggleTag,
    handleSubmit,
  };
};