import { create } from "zustand";

type AddProcedureNoteState = {
  title: string;
  memo: string;
  date: Date;
  phoneNumber: string;
  price: string;
  selectedTags: string[];
  beforeImageFile: File | null;
  afterImageFile: File | null;

  setTitle: (value: string) => void;
  setMemo: (value: string) => void;
  setDate: (date: Date) => void;
  setPhoneNumber: (value: string) => void;
  setPrice: (value: string) => void;
  toggleTag: (value: string) => void;
  setBeforeImageFile: (file: File | null) => void;
  setAfterImageFile: (file: File | null) => void;
  reset: () => void;
};

const getInitialState = () => ({
  title: "",
  memo: "",
  date: new Date(),
  phoneNumber: "",
  price: "",
  selectedTags: [] as string[],
  beforeImageFile: null,
  afterImageFile: null,
});

export const useAddProcedureNoteStore = create<AddProcedureNoteState>((set, get) => ({
  ...getInitialState(),

  setTitle: (value) => set({ title: value }),
  setMemo: (value) => set({ memo: value }),
  setDate: (date) => set({ date }),
  setPhoneNumber: (value) => set({ phoneNumber: value }),
  setPrice: (value) => set({ price: value }),
  toggleTag: (value) => {
    const { selectedTags } = get();
    const next = selectedTags.includes(value)
      ? selectedTags.filter((t) => t !== value)
      : [...selectedTags, value];
    set({ selectedTags: next });
  },
  setBeforeImageFile: (file) => set({ beforeImageFile: file }),
  setAfterImageFile: (file) => set({ afterImageFile: file }),
  reset: () => set(getInitialState()),
}));
