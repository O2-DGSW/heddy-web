import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { ProcedureNote } from "@/features/cuts/model/types/AddProcedureNoteModal.types";

const toInputDateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const useAddProcedureNoteForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [customer, setCustomer] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const dateValue = toInputDateValue(date);

  const toggleTag = (value: string) => {
    setSelectedTags((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
    );
  };

  const handleSubmit = (beforeImage: File | null) => {
    const newNote: ProcedureNote = {
      id: crypto.randomUUID(),
      customerName: customer || "고객",
      title,
      description,
      date,
      tags: selectedTags.join(", "),
      imageUrl: beforeImage ? URL.createObjectURL(beforeImage) : null,
    };
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