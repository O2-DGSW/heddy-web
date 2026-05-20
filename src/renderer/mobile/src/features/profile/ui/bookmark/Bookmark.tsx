import { font, lightTheme } from "@design-tokens";
import ArrowIcon from "@/features/profile/assets/edit/Arrow.svg";
import OYJ from "@/features/profile/assets/bookmark/oyj-profile.jpeg";

import { useNavigate } from "react-router-dom";

interface CategoryProps {
  text: string;
}

type StyleData = {
  id: number;
  title: string;
  description: string;
  rank: number;
  image: string;
  categories: string[];
};

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

interface StyleBoxProps {
  data: StyleData;
}

const StyleBox = ({ data }: StyleBoxProps) => {
  return (
    <div
      className="flex flex-col w-full rounded-[1rem] px-[0.75rem] py-[1rem] gap-[1rem]"
      style={{ backgroundColor: lightTheme.background.normal }}
    >
      <div className="h-[6rem] rounded-[0.75rem] overflow-hidden">
        <img
          className="w-full h-full object-cover object-center"
          src={data.image}
          alt={data.title}
        />
      </div>

      <div className="flex flex-row items-center gap-[0.5rem]">
        <div
          className="flex w-[1rem] h-[1rem] items-center justify-center rounded-full"
          style={{ backgroundColor: lightTheme.primary.normal }}
        >
          <p className={font.caption.semiBold} style={{ color: lightTheme.label.buttonText }}>
            {data.rank}
          </p>
        </div>

        <p className={font.body.bold} style={{ color: lightTheme.label.neutral }}>
          {data.title}
        </p>
      </div>

      <p className={font.caption.medium} style={{ color: lightTheme.label.alternative }}>
        {data.description}
      </p>

      <div className="flex flex-row flex-wrap gap-[0.5rem]">
        {data.categories.map(category => (
          <Category key={category} text={category} />
        ))}
      </div>
    </div>
  );
};

export const Bookmark = () => {
  const navigate = useNavigate();

  const dummyData: StyleData[] = [
    {
      id: 1,
      title: "남자 다운펌",
      description: "자연스럽게 눌러주는 남자 다운펌 스타일",
      rank: 1,
      image: OYJ,
      categories: ["남자", "다운펌"],
    },
    {
      id: 2,
      title: "쉐도우 펌",
      description: "볼륨감 있는 쉐도우 펌 스타일",
      rank: 2,
      image: OYJ,
      categories: ["펌", "쉐도우"],
    },
    {
      id: 3,
      title: "가르마 펌",
      description: "부드러운 분위기의 가르마 펌",
      rank: 3,
      image: OYJ,
      categories: ["가르마", "남친룩"],
    },
    {
      id: 4,
      title: "리프 컷",
      description: "트렌디한 리프 컷 스타일",
      rank: 4,
      image: OYJ,
      categories: ["리프컷", "트렌드"],
    },
    {
      id: 5,
      title: "애즈 펌",
      description: "깔끔하고 세련된 애즈 펌",
      rank: 5,
      image: OYJ,
      categories: ["애즈펌", "훈훈"],
    },
    {
      id: 6,
      title: "아이비리그 컷",
      description: "짧고 단정한 남자 스타일",
      rank: 6,
      image: OYJ,
      categories: ["짧은머리", "남자"],
    },
  ];

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
        {dummyData.map(data => (
          <StyleBox key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};
