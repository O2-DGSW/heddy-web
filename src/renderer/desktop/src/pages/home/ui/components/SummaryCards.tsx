import { lightTheme } from "@design-tokens";

import { summaryCards } from "@/pages/home/model/homeDashboardData";
import { DashboardCard } from "@/pages/home/ui/components/DashboardPrimitives";

const SummaryCard = ({ card }: { card: (typeof summaryCards)[number] }) => {
  const isRight = card.align === "right";

  return (
    <DashboardCard
      className="relative h-[126px] w-[245px] overflow-hidden"
      style={{ backgroundColor: card.backgroundColor ?? lightTheme.background.normal }}
    >
      <img
        src={card.image}
        alt=""
        aria-hidden="true"
        className="absolute object-contain"
        style={card.imageStyle}
      />
      <div
        className={`absolute z-10 flex flex-col font-['Pretendard'] leading-[1.3] tracking-normal ${
          isRight ? "items-end text-right" : "items-start text-left"
        }`}
        style={card.textStyle}
      >
        <p
          className="whitespace-nowrap text-[18px] font-medium"
          style={{ color: lightTheme.label.assistive }}
        >
          {card.title}
        </p>
        <p
          className={`flex items-baseline gap-1 whitespace-nowrap font-bold leading-[1.3] ${
            card.currency ? "text-[24px]" : "text-[28px]"
          }`}
        >
          {card.currency && <span style={{ color: lightTheme.label.neutral }}>₩</span>}
          <span style={{ color: lightTheme.primary.normal }}>{card.value}</span>
          {card.unit && <span style={{ color: lightTheme.label.neutral }}>{card.unit}</span>}
        </p>
      </div>
    </DashboardCard>
  );
};

const SummaryCards = () => (
  <div className="grid w-[508px] shrink-0 grid-cols-[245px_245px] gap-x-[18px] gap-y-[13px]">
    {summaryCards.map(card => (
      <SummaryCard key={card.title} card={card} />
    ))}
  </div>
);

export { SummaryCards };
