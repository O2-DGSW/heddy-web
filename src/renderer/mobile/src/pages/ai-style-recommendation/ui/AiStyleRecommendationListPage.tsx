import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { font, lightTheme } from "@design-tokens";

import arrowSvg from "@/private/shared/ui/dialog/assets/Arrow.svg";
import { useAiStyleRecommendationsQuery } from "@/entities/ai/api/query/useAiStyleRecommendations.query";
import { useAiStyleRecommendationSelection } from "@/pages/ai-style-recommendation/model/useAiStyleRecommendationSelection";
import { useNavigateToAiStyleDetail } from "@/pages/ai-style-recommendation/model/useNavigateToAiStyleDetail";
import { AiStyleRecommendationCard } from "@/pages/main/ui/components/AiStyleRecommendationCard";

export const AiStyleRecommendationListPage = () => {
  const navigate = useNavigate();
  const { data, isError, isLoading } = useAiStyleRecommendationsQuery();
  const resetSelection = useAiStyleRecommendationSelection((state) => state.reset);
  const handleSelect = useNavigateToAiStyleDetail();

  // 목록에 새로 진입할 때 이전에 선택해뒀던 상세 데이터를 비워서 다음 진입과 섞이지 않게 함
  useEffect(() => {
    resetSelection();
  }, [resetSelection]);

  const recommendations = data?.recommendations ?? [];
  const isEmpty = !isLoading && !isError && recommendations.length === 0;

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden pt-safe"
      style={{ backgroundColor: lightTheme.background.normal }}
    >
      <div className="relative flex items-center px-4 py-3 pt-5 shrink-0">
        <button type="button" onClick={() => navigate(-1)} className="absolute left-4 p-1">
          <img src={arrowSvg} alt="뒤로가기" className="w-4 h-4" />
        </button>
        <h2
          className={`flex-1 text-center ${font.headline1.semiBold}`}
          style={{ color: lightTheme.label.neutral }}
        >
          AI 스타일 추천
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8">
        {isError || isEmpty ? (
          <p
            className={`${font.label.regular} text-center pt-10`}
            style={{ color: lightTheme.label.assistive }}
          >
            {isError ? "추천 스타일을 불러오지 못했어요." : "아직 추천할 스타일이 없어요."}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 pt-2">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-full aspect-square rounded-xl animate-pulse"
                    style={{ backgroundColor: lightTheme.fill.neutral }}
                  />
                ))
              : recommendations.map((recommendation, index) => (
                  <div
                    key={`${recommendation.title}-${index}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSelect(recommendation)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleSelect(recommendation);
                      }
                    }}
                  >
                    <AiStyleRecommendationCard rank={index + 1} recommendation={recommendation} />
                  </div>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};
