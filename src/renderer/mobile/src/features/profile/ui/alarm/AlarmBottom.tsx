import { font, lightTheme } from "@design-tokens";
import { Toggle } from "@/private/shared/ui/toggle/Toggle.tsx";

export const AlarmBottom = () => {
  return (
    <div className="size-full px-[1.5rem] py-[2.5rem]">
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
              혜택/세일/이벤트
            </p>
            <p className={font.label.regular} style={{ color: lightTheme.label.assistive }}>
              쿠폰, 특가, 관심 상품 가격 인하 등 이벤트 혜택 정보
            </p>
          </div>
          <Toggle />
        </div>
        <div className="flex flex-row items-center w-full justify-between">
          <div className="flex flex-col items-start">
            <p className={font.body.medium} style={{ color: lightTheme.label.alternative }}>
              발매
            </p>
            <p className={font.label.regular} style={{ color: lightTheme.label.assistive }}>
              알림 신청한 관심 브랜드 신상품, 인기 상품 재입고
            </p>
          </div>
          <Toggle />
        </div>
      </div>
    </div>
  );
};
