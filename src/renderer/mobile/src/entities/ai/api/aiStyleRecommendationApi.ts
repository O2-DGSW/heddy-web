import { api } from "@/shared/api";
import type { AiStyleRecommendationsResponse } from "@/entities/ai/model/AiStyleRecommendation.types";

type AiApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  error: { code: string; message: string } | null;
};

export const getAiStyleRecommendations = async (): Promise<AiStyleRecommendationsResponse> => {
  const res = await api.get<AiApiResponse<AiStyleRecommendationsResponse>>("/ai/style-recommendations");
  if (!res.data.success) {
    throw new Error(res.data.error?.message || res.data.message || "AI 스타일 추천을 불러오지 못했습니다.");
  }
  return res.data.data;
};
