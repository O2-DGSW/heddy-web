import { lightTheme } from "@design-tokens";

import { summaryCards } from "@/pages/home/model/homeDashboardData";
import { DashboardCard } from "@/pages/home/ui/components/DashboardPrimitives";

const SUMMARY_CARD_BASE_WIDTH = 245;

const SummaryCard = ({ card }: { card: (typeof summaryCards)[number] }) => {
  const isRight = card.align === "right";
  const imageOffset = SUMMARY_CARD_BASE_WIDTH - card.imageStyle.left - card.imageStyle.width;
  const textOffset = SUMMARY_CARD_BASE_WIDTH - card.textStyle.left - card.textStyle.width;
  const imageStyle = {
    top: card.imageStyle.top,
    width: card.imageStyle.width,
    height: card.imageStyle.height,
    ...(isRight ? { left: card.imageStyle.left } : { right: imageOffset }),
  };
  const textStyle = {
    top: card.textStyle.top,
    width: card.textStyle.width,
    ...(isRight ? { right: textOffset } : { left: card.textStyle.left }),
  };

  return (
    <DashboardCard
      className="relative h-[126px] w-full overflow-hidden"
      style={{ backgroundColor: card.backgroundColor ?? lightTheme.background.normal }}
    >
      <img
        src={card.image}
        alt=""
        aria-hidden="true"
        className="absolute object-contain"
        style={imageStyle}
      />
      <div
        className={`absolute z-10 flex flex-col font-['Pretendard'] leading-[1.3] ${
          isRight ? "items-end text-right" : "items-start text-left"
        }`}
        style={textStyle}
      >
        <p
          className={`whitespace-nowrap text-[18px] tracking-[-0.36px] ${
            card.currency ? "font-semibold" : "font-medium"
          }`}
          style={{ color: lightTheme.label.assistive }}
        >
          {card.title}
        </p>
        {card.currency ? (
          <p className="flex w-[131px] items-start gap-1 whitespace-nowrap font-bold leading-[1.3] tracking-[-0.48px] text-[24px]">
            <span className="w-[23px] shrink-0" style={{ color: lightTheme.label.neutral }}>
              ₩
            </span>
            <span
              className="w-[104px] min-w-0 shrink-0 overflow-hidden text-ellipsis whitespace-nowrap"
              style={{ color: lightTheme.primary.normal }}
            >
              {card.value}
            </span>
          </p>
        ) : (
          <p className="flex items-baseline gap-1 whitespace-nowrap font-bold leading-[1.3] tracking-[-0.56px] text-[28px]">
            <span style={{ color: lightTheme.primary.normal }}>{card.value}</span>
            {card.unit && <span style={{ color: lightTheme.label.neutral }}>{card.unit}</span>}
          </p>
        )}
      </div>
    </DashboardCard>
  );
};

const SummaryCards = () => (
  <div className="grid h-[404px] w-full grid-cols-[minmax(245px,1fr)_minmax(245px,1fr)] gap-x-[18px] gap-y-[13px]">
    {summaryCards.map(card => (
      <SummaryCard key={card.title} card={card} />
    ))}
  </div>
);

export { SummaryCards };
