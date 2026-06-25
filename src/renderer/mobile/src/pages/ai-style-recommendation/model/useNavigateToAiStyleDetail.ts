import { useNavigate } from "react-router-dom";
import type { AiStyleRecommendationItem } from "@/entities/ai/model/AiStyleRecommendation.types";
import { useAiStyleRecommendationSelection } from "@/pages/ai-style-recommendation/model/useAiStyleRecommendationSelection";

export const useNavigateToAiStyleDetail = () => {
  const navigate = useNavigate();
  const setSelected = useAiStyleRecommendationSelection((state) => state.setSelected);

  return (recommendation: AiStyleRecommendationItem) => {
    setSelected(recommendation);
    navigate("/ai-style-recommendation/detail");
  };
};
