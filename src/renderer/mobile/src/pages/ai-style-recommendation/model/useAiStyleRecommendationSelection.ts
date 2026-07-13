import { create } from "zustand";
import type { AiStyleRecommendationItem } from "@/entities/ai/model/AiStyleRecommendation.types";

type AiStyleRecommendationSelectionState = {
  selected: AiStyleRecommendationItem | null;
  setSelected: (item: AiStyleRecommendationItem) => void;
  reset: () => void;
};

export const useAiStyleRecommendationSelection = create<AiStyleRecommendationSelectionState>((set) => ({
  selected: null,
  setSelected: (item) => set({ selected: item }),
  reset: () => set({ selected: null }),
}));
