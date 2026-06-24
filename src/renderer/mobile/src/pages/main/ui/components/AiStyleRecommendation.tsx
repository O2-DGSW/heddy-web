import { font, lightTheme } from "@design-tokens";

import { AI_STYLE_RECOMMENDATION_MOCK } from "@/pages/main/model/aiStyleRecommendation.mock";
import { AiStyleRecommendationCard } from "@/pages/main/ui/components/AiStyleRecommendationCard";

export const AiStyleRecommendation = () => {
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

      <div className="grid grid-cols-2 gap-3">
        {AI_STYLE_RECOMMENDATION_MOCK.map((recommendation) => (
          <AiStyleRecommendationCard key={recommendation.id} recommendation={recommendation} />
        ))}
      </div>
    </div>
  );
};
