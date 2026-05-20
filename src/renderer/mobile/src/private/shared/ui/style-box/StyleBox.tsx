import { font, lightTheme } from "@design-tokens";
import { CutsTag } from "@/private/shared/ui/cuts-tag/CutsTag.tsx";

import type { StyleData } from "@/features/profile/model/bookmark/types/Bookmark.types.ts";
import type { PortfolioData } from "@/features/profile/model/portfolio/types/Portfolio.types.ts";

interface StyleBoxProps {
  data: StyleData | PortfolioData;
  usedBy: "bookmark" | "portfolio";
}

export const StyleBox = ({ data, usedBy }: StyleBoxProps) => {
  const isBookmark = usedBy === "bookmark";

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
        {isBookmark && "rank" in data && (
          <div
            className="flex w-[1rem] h-[1rem] items-center justify-center rounded-full"
            style={{ backgroundColor: lightTheme.primary.normal }}
          >
            <p className={font.caption.semiBold} style={{ color: lightTheme.label.buttonText }}>
              {data.rank}
            </p>
          </div>
        )}

        <p className={font.body.bold} style={{ color: lightTheme.label.neutral }}>
          {data.title}
        </p>
      </div>

      <p className={font.caption.medium} style={{ color: lightTheme.label.alternative }}>
        {data.description}
      </p>

      {"categories" in data ? (
        <div className="flex flex-row flex-wrap gap-[0.5rem]">
          {data.categories.map(category => (
            <CutsTag key={category} text={category} />
          ))}
        </div>
      ) : (
        <div className="flex flex-row flex-wrap gap-[0.5rem]">{data.date}</div>
      )}
    </div>
  );
};
