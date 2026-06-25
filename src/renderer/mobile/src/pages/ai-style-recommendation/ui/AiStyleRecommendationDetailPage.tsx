import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { font, lightTheme, palette } from "@design-tokens";

import arrowSvg from "@/private/shared/ui/dialog/assets/Arrow.svg";
import PictureIcon from "@/features/cuts/assets/procedute-note/Picture.svg";
import BookmarkButton from "@/features/profile/assets/bookmark/bookmark-button.svg";
import BookmarkButtonActive from "@/pages/main/assets/icons/bookmark-button-active.svg";
import { useSavedAiStyles } from "@/entities/ai/model/useSavedAiStyles";
import { useAiStyleRecommendationSelection } from "@/pages/ai-style-recommendation/model/useAiStyleRecommendationSelection";

export const AiStyleRecommendationDetailPage = () => {
  const navigate = useNavigate();
  const recommendation = useAiStyleRecommendationSelection((state) => state.selected);
  const isSaved = useSavedAiStyles((state) => (recommendation ? state.isSaved(recommendation.title) : false));
  const toggleSaved = useSavedAiStyles((state) => state.toggleSaved);

  useEffect(() => {
    if (!recommendation) {
      navigate(-1);
    }
  }, [recommendation, navigate]);

  if (!recommendation) {
    return null;
  }

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

      <div className="flex-1 overflow-y-auto pb-8">
        <div
          className="relative w-full aspect-[4/3] flex items-center justify-center"
          style={{ backgroundColor: lightTheme.fill.neutral }}
        >
          {recommendation.image_url ? (
            <img
              src={recommendation.image_url}
              alt={recommendation.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <img src={PictureIcon} alt="" className="w-10 h-10 opacity-50" />
          )}
          <button
            type="button"
            className="absolute bottom-3 right-3"
            onClick={() => toggleSaved(recommendation.title)}
          >
            <img src={isSaved ? BookmarkButtonActive : BookmarkButton} alt="북마크" className="w-8 h-8" />
          </button>
        </div>

        <div className="px-4 flex flex-col gap-4 pt-4">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={font.headline2.bold} style={{ color: lightTheme.label.normal }}>
              {recommendation.title}
            </h3>
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

          {recommendation.image_source_name && (
            <p className={font.label.regular} style={{ color: lightTheme.label.assistive }}>
              사진 출처 ·{" "}
              {recommendation.image_source_url ? (
                <a
                  href={recommendation.image_source_url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: palette.main[50] }}
                >
                  {recommendation.image_source_name}
                </a>
              ) : (
                recommendation.image_source_name
              )}
            </p>
          )}

          <div
            className="rounded-2xl p-4 flex flex-col gap-2"
            style={{ backgroundColor: lightTheme.background.normal, border: `1px solid ${palette.neutral[90]}` }}
          >
            <span className={font.body.bold} style={{ color: lightTheme.label.neutral }}>
              스타일 설명
            </span>
            <p className={font.label.regular} style={{ color: lightTheme.label.alternative }}>
              {recommendation.summary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
