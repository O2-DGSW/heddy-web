import { font, lightTheme } from "@design-tokens";

import dateSmallIcon from "@/pages/procedure/assets/svg/date-small.svg";
import searchIcon from "@/pages/procedure/assets/svg/search.svg";
import timeIcon from "@/pages/procedure/assets/svg/time.svg";
import type {
  ProcedureCustomer,
  ProcedureCustomerPanelProps,
} from "@/pages/procedure/model/Procedure.types";

import { ProcedurePanel } from "./ProcedurePanel";
import { ProcedureTagChip } from "./ProcedureTagChip";

const CustomerResultCard = ({
  customer,
  selected,
  onSelect,
}: {
  customer: ProcedureCustomer;
  selected: boolean;
  onSelect: (customerId: number) => void;
}) => {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(customer.id)}
      className="flex h-[5.25rem] w-full items-center justify-center overflow-hidden rounded-xl text-left shadow-[0_0_0.375rem_rgba(0,0,0,0.02)] transition-shadow hover:shadow-[0_0_0.375rem_rgba(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-[#41BE8E]/30"
      style={{ backgroundColor: lightTheme.fill.normal }}
    >
      <div className="flex w-[21.75rem] items-center gap-4">
        <span
          className="flex size-[3.25rem] shrink-0 items-center justify-center overflow-hidden rounded-full"
          style={{ backgroundColor: lightTheme.background.normal }}
        >
          <img
            src={customer.avatar}
            alt=""
            className="h-[2.25rem] w-[2.375rem] object-contain"
            aria-hidden="true"
          />
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-px">
          <span className="flex min-w-0 items-center justify-between gap-3">
            <span
              className={`flex shrink-0 items-center gap-1 font-['Pretendard'] ${font.headline2.semiBold}`}
              style={{ color: lightTheme.label.neutral }}
            >
              <strong className="font-bold">{customer.name}</strong>
              <span>님</span>
            </span>

            <span className="flex shrink-0 items-center gap-[0.3125rem]">
              {customer.tags.map(tag => (
                <ProcedureTagChip
                  key={`${customer.id}-${tag}`}
                  tag={{ id: `${customer.id}-${tag}`, label: tag, selected: false }}
                />
              ))}
            </span>
          </span>

          <span className="flex items-center gap-2.5">
            <span className="flex items-center gap-[0.1875rem]">
              <img src={dateSmallIcon} alt="" className="size-[0.9375rem]" aria-hidden="true" />
              <span
                className={`font-['Pretendard'] ${font.label.regular}`}
                style={{ color: lightTheme.label.alternative }}
              >
                {customer.date}
              </span>
            </span>
            <span
              className={`font-['Pretendard'] ${font.body.medium}`}
              style={{ color: lightTheme.label.assistive }}
            >
              ·
            </span>
            <span className="flex items-center gap-[0.1875rem]">
              <img src={timeIcon} alt="" className="size-[0.9375rem]" aria-hidden="true" />
              <span
                className={`font-['Pretendard'] ${font.label.regular}`}
                style={{ color: lightTheme.label.alternative }}
              >
                {customer.time}
              </span>
            </span>
          </span>
        </span>
      </div>
    </button>
  );
};

const ProcedureCustomerPanel = ({
  customers,
  query,
  selectedCustomerId,
  onQueryChange,
  onSelectCustomer,
}: ProcedureCustomerPanelProps) => {
  return (
    <ProcedurePanel className="h-[31.5625rem] w-full">
      <div className="flex w-full flex-col px-[2.125rem] pt-[1.875rem]">
        <div className="flex flex-col gap-4">
          <h2
            className={`font-['Pretendard'] ${font.headline1.bold}`}
            style={{ color: lightTheme.label.neutral }}
          >
            고객 검색
          </h2>

          <label
            className="flex h-[2.0625rem] w-full items-center overflow-hidden rounded-[1.25rem] border bg-white px-[0.9375rem]"
            style={{ borderColor: lightTheme.line.alternative }}
          >
            <img src={searchIcon} alt="" className="size-5 shrink-0" aria-hidden="true" />
            <input
              value={query}
              onChange={event => onQueryChange(event.target.value)}
              className={`ml-3 min-w-0 flex-1 bg-transparent font-['Pretendard'] ${font.body.medium} outline-none placeholder:text-[#C1C2C3]`}
              placeholder="고객 이름 검색"
              aria-label="고객 이름 검색"
              style={{ color: lightTheme.label.neutral }}
            />
          </label>
        </div>

        <div className="mt-9 flex h-[17.625rem] flex-col gap-[0.9375rem] overflow-x-hidden overflow-y-auto">
          {customers.map(customer => (
            <CustomerResultCard
              key={customer.id}
              customer={customer}
              selected={customer.id === selectedCustomerId}
              onSelect={onSelectCustomer}
            />
          ))}
        </div>
      </div>
    </ProcedurePanel>
  );
};

export { ProcedureCustomerPanel };
