import { font, lightTheme } from "@design-tokens";
import ArrowIcon from "@/features/profile/assets/edit/Arrow.svg";
import OYJ from "@/features/profile/assets/bookmark/oyj-profile.jpeg";

import { useNavigate } from "react-router-dom";

import { StyleBox } from "@/private/shared/ui/style-box/StyleBox.tsx";
import type { PortfolioData } from "@/features/profile/model/portfolio/types/Portfolio.types.ts";

export const Portfolio = () => {
  const navigate = useNavigate();

  const dummyData: PortfolioData[] = [
    {
      id: 1,
      title: "남자 다운펌",
      description: "자연스럽게 눌러주는 남자 다운펌 스타일",
      image: OYJ,
      date: "2026-04-04",
    },
    {
      id: 2,
      title: "남자 다운펌",
      description: "자연스럽게 눌러주는 남자 다운펌 스타일",
      image: OYJ,
      date: "2026-04-04",
    },
    {
      id: 3,
      title: "남자 다운펌",
      description: "자연스럽게 눌러주는 남자 다운펌 스타일",
      image: OYJ,
      date: "2026-04-04",
    },
    {
      id: 4,
      title: "남자 다운펌",
      description: "자연스럽게 눌러주는 남자 다운펌 스타일",
      image: OYJ,
      date: "2026-04-04",
    },
    {
      id: 5,
      title: "남자 다운펌",
      description: "자연스럽게 눌러주는 남자 다운펌 스타일",
      image: OYJ,
      date: "2026-04-04",
    },
    {
      id: 6,
      title: "남자 다운펌",
      description: "자연스럽게 눌러주는 남자 다운펌 스타일",
      image: OYJ,
      date: "2026-04-04",
    },
  ];

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex flex-row justify-between items-center px-[1.5rem] mb-[1.5rem] shrink-0">
        <button className="size-[1.25rem]" onClick={() => navigate("/profile")}>
          <img className="rotate-180 size-full" src={ArrowIcon} alt="arrow" />
        </button>

        <p className={font.headline1.semiBold} style={{ color: lightTheme.label.neutral }}>
          포트폴리오 관리
        </p>

        <div className="size-[1.25rem]" />
      </div>

      <div
        className="grid grid-cols-2 gap-[1rem] p-[1.5rem] flex-1 overflow-y-auto min-h-0"
        style={{ backgroundColor: lightTheme.fill.normal }}
      >
        {dummyData.map(data => (
          <StyleBox key={data.id} data={data} usedBy="portfolio" />
        ))}
      </div>
    </div>
  );
};
