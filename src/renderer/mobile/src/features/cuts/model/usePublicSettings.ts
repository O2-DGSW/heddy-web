import { useMemo, useState } from "react";

import type { PublicSettingsCutsResponse } from "@/features/cuts/model/types/PublicSettings.types.ts";

const initialNotes: PublicSettingsCutsResponse[] = [
  {
    id: "1",
    customerName: "오용준",
    title: "레이어드 커트",
    description: "자연스러운 레이어드로 볼륨감 살린 스타일",
    tags: "커트,레이어드",
    imageUrl: null,
    publicSettings: true,
  },
  {
    id: "2",
    customerName: "강장민",
    title: "남자 투블럭",
    description: "옆면 짧게 정리하고 윗머리 텍스처 살림",
    tags: "커트,투블럭",
    imageUrl: null,
    publicSettings: false,
  },
  {
    id: "3",
    customerName: "이민수",
    title: "볼륨 펌",
    description: "C컬로 자연스러운 떨어짐 연출",
    tags: "펌,볼륨",
    imageUrl: null,
    publicSettings: false,
  },
  {
    id: "4",
    customerName: "이민수",
    title: "볼륨 펌",
    description: "C컬로 자연스러운 떨어짐 연출",
    tags: "펌,볼륨",
    imageUrl: null,
    publicSettings: false,
  },
  {
    id: "5",
    customerName: "이민수",
    title: "볼륨 펌",
    description: "C컬로 자연스러운 떨어짐 연출",
    tags: "펌,볼륨",
    imageUrl: null,
    publicSettings: false,
  },
];

export const usePublicSettings = () => {
  const [notes, setNotes] = useState<PublicSettingsCutsResponse[]>(initialNotes);

  const handleTogglePublicSettings = (noteId: string, publicSettings: boolean) => {
    setNotes(prev => prev.map(note => (note.id === noteId ? { ...note, publicSettings } : note)));
  };

  const isDirty = useMemo(() => {
    return notes.some((note, index) => note.publicSettings !== initialNotes[index].publicSettings);
  }, [notes]);

  const handleSave = async () => {
    console.log("저장 요청", notes);

    try {
      // await api.save(notes);

      console.log("저장 성공");
    } catch (error) {
      console.error("저장 실패", error);
    }
  };

  return {
    notes,
    isDirty,
    handleSave,
    handleTogglePublicSettings,
  };
};
