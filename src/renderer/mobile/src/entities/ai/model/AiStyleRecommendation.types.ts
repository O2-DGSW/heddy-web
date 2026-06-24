export interface AiStyleRecommendationItem {
  title: string;
  image_url: string | null;
  image_source_name: string | null;
  image_source_url: string | null;
  tags: string[];
  summary: string;
}

export interface AiStyleRecommendationsResponse {
  recommendations: AiStyleRecommendationItem[];
}
