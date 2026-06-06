import { useState } from "react";

import type { ProcedureNote } from "./types/AddProcedureNoteModal.types";

export const usePublicSettings = () => {
  const [notes, setNotes] = useState<ProcedureNote[]>([
    {
      id: "1",
      customerName: "오용준",
      title: "레이어드 커트",
      description: "자연스러운 레이어드로 볼륨감 살린 스타일",
      date: new Date("2026-05-20"),
      tags: "커트,레이어드",
      imageUrl: null,
    },
    {
      id: "2",
      customerName: "강장민",
      title: "남자 투블럭",
      description: "옆면 짧게 정리하고 윗머리 텍스처 살림",
      date: new Date("2026-05-22"),
      tags: "커트,투블럭",
      imageUrl: null,
    },
    {
      id: "3",
      customerName: "이민수",
      title: "볼륨 펌",
      description: "C컬로 자연스러운 떨어짐 연출",
      date: new Date("2026-05-23"),
      tags: "펌,볼륨",
      imageUrl: null,
    },
  ]);

  return { notes, setNotes };
};
