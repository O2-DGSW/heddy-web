/** AI 스타일 추천 카드 - 추후 추천 API 연결 시 응답 타입으로 교체 예정 */
export type AiStyleRecommendation = {
  id: string;
  rank: number;
  imageUrl: string | null;
  title: string;
  description: string;
  tags: string[];
};
