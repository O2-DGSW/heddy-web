import { useState } from "react";

import type { PublicSettingsCutsResponse } from "@/features/cuts/model/types/PublicSettings.types.ts";

export const usePublicSettings = () => {
  const [notes, setNotes] = useState<PublicSettingsCutsResponse[]>([
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
  ]);

  const handleTogglePublicSettings = async (noteId: string, publicSettings: boolean) => {
    try {
      // API 호출
      // await cutsApi.updatePublicSettings({
      //   noteId,
      //   publicSettings,
      // });

      setNotes(prev => prev.map(note => (note.id === noteId ? { ...note, publicSettings } : note)));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    notes,
    handleTogglePublicSettings,
  };
};
