import { create } from "zustand";

type SavedAiStylesState = {
  savedTitles: Set<string>;
  toggleSaved: (title: string) => void;
  isSaved: (title: string) => boolean;
};

/**
 * 추천 항목에 고유 id가 아직 없어 title을 임시 키로 사용.
 * 저장 API 연결 시 서버 id 기반으로 교체 예정.
 */
export const useSavedAiStyles = create<SavedAiStylesState>((set, get) => ({
  savedTitles: new Set(),
  toggleSaved: (title) => {
    const next = new Set(get().savedTitles);
    if (next.has(title)) {
      next.delete(title);
    } else {
      next.add(title);
    }
    set({ savedTitles: next });
  },
  isSaved: (title) => get().savedTitles.has(title),
}));
