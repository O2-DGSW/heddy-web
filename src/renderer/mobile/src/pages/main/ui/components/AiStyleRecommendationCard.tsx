import { font, lightTheme } from "@design-tokens";

import PictureIcon from "@/features/cuts/assets/procedute-note/Picture.svg";
import BookmarkButton from "@/features/profile/assets/bookmark/bookmark-button.svg";
import type { AiStyleRecommendation } from "@/pages/main/model/aiStyleRecommendation.types";

interface AiStyleRecommendationCardProps {
  recommendation: AiStyleRecommendation;
}

export const AiStyleRecommendationCard = ({ recommendation }: AiStyleRecommendationCardProps) => {
  return (
    <div className="flex flex-col gap-2 min-w-0">
      <div
        className="relative w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: lightTheme.fill.neutral }}
      >
        {recommendation.imageUrl ? (
          <img src={recommendation.imageUrl} alt={recommendation.title} className="w-full h-full object-cover" />
        ) : (
          <img src={PictureIcon} alt="" className="w-8 h-8 opacity-50" />
        )}
        <button type="button" className="absolute top-2 right-2">
          <img src={BookmarkButton} alt="북마크" className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${font.caption.bold}`}
            style={{ backgroundColor: lightTheme.primary.normal, color: lightTheme.label.buttonText }}
          >
            {recommendation.rank}
          </span>
          <span className={`${font.label.bold} truncate`} style={{ color: lightTheme.label.normal }}>
            {recommendation.title}
          </span>
        </div>

        <p className={`${font.caption.regular} truncate`} style={{ color: lightTheme.label.alternative }}>
          {recommendation.description}
        </p>

        <div className="flex gap-1 flex-wrap">
          {recommendation.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-0.5 rounded-full ${font.caption.medium}`}
              style={{ backgroundColor: lightTheme.fill.normal, color: lightTheme.label.alternative }}
            >
              # {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
