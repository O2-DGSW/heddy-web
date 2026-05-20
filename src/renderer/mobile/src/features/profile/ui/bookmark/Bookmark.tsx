import { font, lightTheme } from "@design-tokens";
import ArrowIcon from "@/features/profile/assets/edit/Arrow.svg";
import OYJ from "@/features/profile/assets/bookmark/oyj-profile.jpeg";

import { useNavigate } from "react-router-dom";

interface CategoryProps {
  text: string;
}

const Category = ({ text }: CategoryProps) => {
  return (
    <div
      className="px-[0.325rem] py-[0.125rem] rounded-[0.325rem]"
      style={{ backgroundColor: lightTheme.fill.neutral }}
    >
      <p className={font.caption.medium} style={{ color: lightTheme.label.alternative }}>
        # {text}
      </p>
    </div>
  );
};

const StyleBox = () => {
  return (
    <div
      className="flex flex-col w-full rounded-[1rem] px-[0.75rem] py-[1rem] gap-[1rem]"
      style={{ backgroundColor: lightTheme.background.normal }}
    >
      <div className="h-[6rem] rounded-[0.75rem] overflow-hidden">
        <img className="w-full h-full object-cover object-center" src={OYJ} alt="oyj" />
      </div>
      <div className="flex flex-row items-center gap-[0.5rem]">
        <div
          className="flex w-[1rem] h-[1rem] items-center justify-center rounded-[100%]"
          style={{ backgroundColor: lightTheme.primary.normal }}
        >
          <p className={font.caption.semiBold} style={{ color: lightTheme.label.buttonText }}>
            1
          </p>
        </div>
        <p className={font.body.bold} style={{ color: lightTheme.label.neutral }}>
          남자 다운펌
        </p>
      </div>
      <p className={font.caption.medium} style={{ color: lightTheme.label.alternative }}>
        남자 다운펌 알려드립니다
      </p>
      <div className="flex flex-row gap-[0.5rem]">
        <Category text="남자" />
        <Category text="밤톨이" />
      </div>
    </div>
  );
};

export const Bookmark = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex flex-row justify-between items-center px-[1.5rem] mb-[1.5rem] shrink-0">
        <button className="size-[1.25rem]" onClick={() => navigate("/profile")}>
          <img className="rotate-180 size-full" src={ArrowIcon} alt="arrow" />
        </button>

        <p className={font.headline1.semiBold} style={{ color: lightTheme.label.neutral }}>
          저장 스타일
        </p>

        <div className="size-[1.25rem]" />
      </div>

      <div
        className="grid grid-cols-2 gap-[1rem] p-[1.5rem] flex-1 overflow-y-auto min-h-0"
        style={{ backgroundColor: lightTheme.fill.normal }}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <StyleBox key={index} />
        ))}
      </div>
    </div>
  );
};
