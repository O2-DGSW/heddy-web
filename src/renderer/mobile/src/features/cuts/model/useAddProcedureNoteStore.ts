import { create } from "zustand";

type AddProcedureNoteState = {
  title: string;
  description: string;
  date: Date;
  customer: string;
  selectedTags: string[];
  beforeImageFile: File | null;
  afterImageFile: File | null;

  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setDate: (date: Date) => void;
  setCustomer: (value: string) => void;
  toggleTag: (value: string) => void;
  setBeforeImageFile: (file: File | null) => void;
  setAfterImageFile: (file: File | null) => void;
  reset: () => void;
};

const initialState = {
  title: "",
  description: "",
  date: new Date(),
  customer: "",
  selectedTags: [] as string[],
  beforeImageFile: null,
  afterImageFile: null,
};

export const useAddProcedureNoteStore = create<AddProcedureNoteState>((set, get) => ({
  ...initialState,

  setTitle: (value) => set({ title: value }),
  setDescription: (value) => set({ description: value }),
  setDate: (date) => set({ date }),
  setCustomer: (value) => set({ customer: value }),
  toggleTag: (value) => {
    const { selectedTags } = get();
    const next = selectedTags.includes(value)
      ? selectedTags.filter((t) => t !== value)
      : [...selectedTags, value];
    set({ selectedTags: next });
  },
  setBeforeImageFile: (file) => set({ beforeImageFile: file }),
  setAfterImageFile: (file) => set({ afterImageFile: file }),
  reset: () => set(initialState),
}));
