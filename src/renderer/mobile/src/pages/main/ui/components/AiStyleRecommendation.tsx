import { font, lightTheme } from "@design-tokens";

import { useAiStyleRecommendationsQuery } from "@/entities/ai/api/query/useAiStyleRecommendations.query";
import { AiStyleRecommendationCard } from "@/pages/main/ui/components/AiStyleRecommendationCard";

const HOME_PREVIEW_COUNT = 4;

export const AiStyleRecommendation = () => {
  const { data, isError, isLoading } = useAiStyleRecommendationsQuery();

  const recommendations = data?.recommendations.slice(0, HOME_PREVIEW_COUNT) ?? [];
  const isEmpty = !isLoading && !isError && recommendations.length === 0;

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between">
        <h2 className={font.headline1.bold} style={{ color: lightTheme.label.normal }}>
          AI 스타일 추천
        </h2>
        <span className={font.label.medium} style={{ color: lightTheme.label.assistive }}>
          더보기 &gt;
        </span>
      </div>

      {isError || isEmpty ? (
        <p className={font.label.regular} style={{ color: lightTheme.label.assistive }}>
          {isError ? "추천 스타일을 불러오지 못했어요." : "아직 추천할 스타일이 없어요."}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {isLoading
            ? Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full aspect-square rounded-xl animate-pulse"
                  style={{ backgroundColor: lightTheme.fill.neutral }}
                />
              ))
            : recommendations.map((recommendation, index) => (
                <AiStyleRecommendationCard
                  key={`${recommendation.title}-${index}`}
                  rank={index + 1}
                  recommendation={recommendation}
                />
              ))}
        </div>
      )}
    </div>
  );
};
