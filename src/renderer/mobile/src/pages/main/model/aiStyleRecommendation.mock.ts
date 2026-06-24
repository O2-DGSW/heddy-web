import type { AiStyleRecommendation } from "@/pages/main/model/aiStyleRecommendation.types";

/** 임시 목업 데이터 - 추후 AI 스타일 추천 API 연결 시 제거 */
export const AI_STYLE_RECOMMENDATION_MOCK: AiStyleRecommendation[] = [
  {
    id: "1",
    rank: 1,
    imageUrl: null,
    title: "남자 다운펌",
    description: "남자 다운펌 알려드립니다",
    tags: ["남자", "다운펌"],
  },
  {
    id: "2",
    rank: 1,
    imageUrl: null,
    title: "남자 다운펌",
    description: "남자 다운펌 알려드립니다",
    tags: ["남자", "다운펌"],
  },
];
