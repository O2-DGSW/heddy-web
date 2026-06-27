import { Link } from "react-router-dom";
import { font, lightTheme } from "@design-tokens";

import { useAiStyleRecommendationsQuery } from "@/entities/ai/api/query/useAiStyleRecommendations.query";
import { useNavigateToAiStyleDetail } from "@/pages/ai-style-recommendation/model/useNavigateToAiStyleDetail";
import { AiStyleRecommendationCard } from "@/pages/main/ui/components/AiStyleRecommendationCard";

const HOME_PREVIEW_COUNT = 6;

export const AiStyleRecommendation = () => {
  const { data, isError, isLoading } = useAiStyleRecommendationsQuery();
  const handleSelect = useNavigateToAiStyleDetail();

  const recommendations = data?.recommendations.slice(0, HOME_PREVIEW_COUNT) ?? [];
  const isEmpty = !isLoading && !isError && recommendations.length === 0;

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between px-5">
        <h2 className={font.headline1.bold} style={{ color: lightTheme.label.normal }}>
          AI 스타일 추천
        </h2>
        <Link to="/ai-style-recommendation" className={font.label.medium} style={{ color: lightTheme.label.assistive }}>
          더보기 &gt;
        </Link>
      </div>

      {isError || isEmpty ? (
        <p className={`${font.label.regular} px-5`} style={{ color: lightTheme.label.assistive }}>
          {isError ? "추천 스타일을 불러오지 못했어요." : "아직 추천할 스타일이 없어요."}
        </p>
      ) : (
        <div className="flex gap-3 overflow-x-auto scrollbar-hidden snap-x snap-mandatory scroll-pl-5 pr-2">
          {isLoading
            ? Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className={`w-[42%] shrink-0 aspect-square rounded-xl animate-pulse snap-start ${index === 0 ? "ml-5" : ""}`}
                  style={{ backgroundColor: lightTheme.fill.neutral }}
                />
              ))
            : recommendations.map((recommendation, index) => (
                <div
                  key={`${recommendation.title}-${index}`}
                  role="button"
                  tabIndex={0}
                  className={`w-[42%] shrink-0 snap-start ${index === 0 ? "ml-5" : ""}`}
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
  );
};
