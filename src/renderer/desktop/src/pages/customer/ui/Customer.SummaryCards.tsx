import { lightTheme } from "@design-tokens";

import type { CustomerSummaryCardsProps } from "@/pages/customer/model/Customer.types";

const CustomerSummaryCards = ({ summaries }: CustomerSummaryCardsProps) => {
  return (
    <div className="grid w-full grid-cols-3 gap-[1.75rem]">
      {summaries.map(summary => (
        <article
          key={summary.id}
          className="flex h-[7.375rem] min-w-0 items-center justify-between rounded-xl bg-white px-[2.3125rem]"
          style={{ boxShadow: `0 0 0.25rem ${summary.shadowColor}` }}
        >
          <div className="flex min-w-0 flex-col gap-[0.375rem]">
            <span
              className="min-w-0 whitespace-nowrap font-['Pretendard'] text-lg font-semibold leading-[1.3]"
              style={{ color: lightTheme.label.alternative }}
            >
              {summary.title}
            </span>

            <div className="flex items-center gap-[0.25rem] font-['Pretendard'] text-[1.75rem] font-bold leading-[1.3]">
              <span style={{ color: summary.color }}>{summary.count}</span>
              <span style={{ color: lightTheme.label.neutral }}>명</span>
            </div>
          </div>

          <img
            src={summary.image}
            alt=""
            className="h-[4.125rem] w-[4.625rem] shrink-0 object-contain"
          />
        </article>
      ))}
    </div>
  );
};

export { CustomerSummaryCards };
