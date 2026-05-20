import { font, lightTheme } from "@design-tokens";
import { Toggle } from "@/private/shared/ui/toggle/Toggle.tsx";
import ArrowIcon from "@/features/profile/assets/edit/Arrow.svg";
import { useNavigate } from "react-router-dom";

export const AlarmTop = () => {
  const navigate = useNavigate();

  return (
    <div className="size-full flex flex-col justify-between px-[1.5rem]">
      <div className="flex flex-row justify-between items-center">
        <button className="size-[1.25rem]" onClick={() => navigate("/profile")}>
          <img className="rotate-180 size-full" src={ArrowIcon} alt="arrow" />
        </button>
        <p className={font.headline1.semiBold} style={{ color: lightTheme.label.neutral }}>
          알림 설정
        </p>
        <div className="size-[1.25rem]" />
      </div>

      <div className="size-full flex-col justify-between py-[2.5rem]">
        <div className="size-full flex flex-col justify-between items-start">
          <p className={font.headline1.semiBold} style={{ color: lightTheme.label.neutral }}>
            활동 푸시
          </p>

          <div className="flex flex-row items-center w-full justify-between">
            <div className="flex flex-col items-start">
              <p className={font.body.medium} style={{ color: lightTheme.label.alternative }}>
                활동/소식
              </p>
              <p className={font.label.regular} style={{ color: lightTheme.label.assistive }}>
                후기 작성, 후기 댓글, 이벤트 참여 등 소식
              </p>
            </div>
            <Toggle />
          </div>
          <div className="flex flex-row items-center w-full justify-between">
            <div className="flex flex-col items-start">
              <p className={font.body.medium} style={{ color: lightTheme.label.alternative }}>
                스냅
              </p>
              <p className={font.label.regular} style={{ color: lightTheme.label.assistive }}>
                스냅 좋아요, 댓글, 팔로우 소식 및 패션톡 활동
              </p>
            </div>
            <Toggle />
          </div>
        </div>
      </div>
    </div>
  );
};
