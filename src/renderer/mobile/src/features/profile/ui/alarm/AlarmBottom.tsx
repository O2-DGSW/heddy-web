import { font, lightTheme } from "@design-tokens";
import { Toggle } from "@/private/shared/ui/toggle/Toggle.tsx";

export const AlarmBottom = () => {
  return (
    <div className="size-full px-[1.5rem] py-[3rem]">
      <div className="size-full flex flex-col justify-between items-start">
        <p className={font.headline1.semiBold} style={{ color: lightTheme.label.neutral }}>
          쇼핑 혜택 푸시
        </p>

        <div className="flex flex-row items-center w-full justify-between">
          <p className={font.label.regular} style={{ color: lightTheme.label.assistive }}>
            마케팅 목적의 개인정보 수집 및 이용 동의(선택)
          </p>
          <Toggle />
        </div>
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
  );
};
