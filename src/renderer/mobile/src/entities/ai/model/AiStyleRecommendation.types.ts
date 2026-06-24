export interface AiStyleRecommendationItem {
  title: string;
  imageUrl: string | null;
  imageSourceName: string | null;
  imageSourceUrl: string | null;
  tags: string[];
  summary: string;
}

export interface AiStyleRecommendationsResponse {
  recommendations: AiStyleRecommendationItem[];
}
