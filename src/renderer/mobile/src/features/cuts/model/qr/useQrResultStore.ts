import { create } from "zustand";
import type { VerifyQrResponse } from "@/entities/qr/model/qr.types.ts";

type QrResultState = {
  result: VerifyQrResponse | null;
  error: string | null;
  setResult: (result: VerifyQrResponse) => void;
  setError: (error: string | null) => void;
  reset: () => void;
};

export const useQrResultStore = create<QrResultState>(set => ({
  result: null,
  error: null,
  setResult: result => set({ result, error: null }),
  setError: error => set({ error }),
  reset: () => set({ result: null, error: null }),
}));
