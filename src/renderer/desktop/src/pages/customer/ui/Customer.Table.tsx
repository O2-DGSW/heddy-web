import { lightTheme } from "@design-tokens";

import dateIcon from "@/pages/customer/assets/date.svg";
import dropdownIcon from "@/pages/customer/assets/dropdown.svg";
import searchIcon from "@/pages/customer/assets/search.svg";
import { DROPDOWN_FILTER } from "@/pages/customer/model/Customer.constant";
import type { CustomerRiskLevel, CustomerTableProps } from "@/pages/customer/model/Customer.types";

const CUSTOMER_GRID_COLUMNS = "54fr 131fr 82fr 67fr 228fr 140fr 55fr 98fr";

const riskColorMap: Record<CustomerRiskLevel, string> = {
  normal: lightTheme.status.success,
  caution: lightTheme.status.warning,
  risk: lightTheme.status.error,
};

const CustomerTable = ({ filters, rows }: CustomerTableProps) => {
  return (
    <section className="flex h-[38.75rem] w-full flex-col gap-5">
      <h2
        className="font-['Pretendard'] text-2xl font-bold leading-[1.3]"
        style={{ color: lightTheme.label.alternative }}
      >
        예약 현황
      </h2>

      <div className="h-[35.625rem] overflow-hidden rounded-xl bg-white shadow-[0_0_0.25rem_rgba(0,0,0,0.08)]">
        <div className="mb-[1rem] flex h-[3.5625rem] items-end justify-between px-[1.75rem] pb-[0.25rem]">
          <label
            className="flex h-[2.125rem] w-[20.8125rem] items-center rounded-[1.25rem] border bg-white px-[0.9375rem]"
            style={{ borderColor: lightTheme.line.alternative }}
          >
            <img src={searchIcon} alt="" className="size-[1.25rem] shrink-0" aria-hidden="true" />
            <input
              className="ml-[0.75rem] min-w-0 flex-1 bg-transparent font-['Pretendard'] text-base font-medium leading-[1.3] outline-none"
              placeholder="검색"
              style={{ color: lightTheme.label.neutral }}
            />
          </label>

          <div className="flex h-[1.875rem] items-center gap-[2rem]">
            <div className="flex items-center gap-[0.5rem]">
              {filters.map(filter => (
                <button
                  key={filter.label}
                  type="button"
                  className="flex h-[1.875rem] w-[3.375rem] items-center justify-center rounded-[1rem] font-['Pretendard'] text-sm font-medium leading-[1.3]"
                  style={{
                    backgroundColor: filter.active
                      ? lightTheme.primary.normal
                      : lightTheme.fill.neutral,
                    color: filter.active
                      ? lightTheme.label.buttonText
                      : lightTheme.label.alternative,
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="flex h-[1.875rem] w-[7.75rem] items-center justify-center rounded-[1rem] border bg-white font-['Pretendard'] text-sm font-medium leading-[1.3]"
              style={{
                borderColor: lightTheme.line.alternative,
                color: lightTheme.label.assistive,
              }}
            >
              최근 방문 순
              <img
                src={dropdownIcon}
                alt=""
                className="ml-[0.25rem] size-[1.25rem]"
                style={{ filter: DROPDOWN_FILTER }}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <div
          className="grid h-[2.25rem] items-center gap-[3.25rem] px-[4.4375rem] text-center font-['Pretendard'] text-lg font-medium leading-[1.3]"
          style={{
            gridTemplateColumns: CUSTOMER_GRID_COLUMNS,
            backgroundColor: lightTheme.label.disable,
            color: lightTheme.label.assistive,
          }}
        >
          <span className="col-start-1 whitespace-nowrap">고객명</span>
          <span className="col-start-2 whitespace-nowrap">연락처</span>
          <span className="col-start-3 whitespace-nowrap">최근 방문일</span>
          <span className="col-start-4 whitespace-nowrap">방문 주기</span>
          <span className="col-start-5 whitespace-nowrap">이탈 위험도</span>
          <span className="col-start-6 whitespace-nowrap">시술 태그</span>
          <span className="col-start-7 whitespace-nowrap">총 방문</span>
          <span className="col-start-8 whitespace-nowrap">담당 디자이너</span>
        </div>

        <div className="flex flex-col">
          {rows.map(row => (
            <div
              key={row.id}
              className="h-16 border-b"
              style={{ borderColor: lightTheme.background.neutral }}
            >
              <div
                className="grid h-full items-center gap-[3.25rem] px-[4.4375rem] font-['Pretendard'] text-lg font-medium leading-[1.3]"
                style={{
                  gridTemplateColumns: CUSTOMER_GRID_COLUMNS,
                  color: lightTheme.label.assistive,
                }}
              >
                <span
                  className="col-start-1 min-w-0 truncate font-bold"
                  style={{ color: lightTheme.label.alternative }}
                >
                  {row.name}
                </span>
                <span className="col-start-2 min-w-0 truncate text-center">{row.phone}</span>
                <span className="col-start-3 flex min-w-0 items-center justify-center gap-[0.5rem] whitespace-nowrap">
                  <img src={dateIcon} alt="" className="size-[1.375rem]" aria-hidden="true" />
                  {row.lastVisit}
                </span>
                <span className="col-start-4 min-w-0 truncate whitespace-nowrap text-center">
                  {row.visitCycle}
                </span>
                <span className="col-start-5 flex min-w-0 items-center gap-[0.5rem]">
                  <span
                    className="relative h-[1rem] min-w-[11.625rem] flex-1 overflow-hidden rounded-[1.25rem]"
                    style={{ backgroundColor: lightTheme.label.buttonText }}
                  >
                    <span
                      className="absolute left-0 top-0 h-full rounded-[1.25rem]"
                      style={{
                        width: `${row.riskPercent}%`,
                        backgroundColor: riskColorMap[row.riskLevel],
                      }}
                    />
                  </span>
                  <span
                    className="w-[2.125rem] shrink-0 text-base"
                    style={{ color: lightTheme.label.alternative }}
                  >
                    {row.riskPercent}%
                  </span>
                </span>
                <span className="col-start-6 flex min-w-0 justify-center gap-[0.25rem]">
                  {row.tags.map(tag => (
                    <span
                      key={tag}
                      className="shrink-0 rounded-[0.25rem] px-[0.5rem] py-[0.25rem] font-['Pretendard'] text-xs font-medium leading-[1.3]"
                      style={{
                        backgroundColor: lightTheme.fill.neutral,
                        color: lightTheme.label.alternative,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </span>
                <span className="col-start-7 min-w-0 truncate text-center">{row.totalVisits}</span>
                <button
                  type="button"
                  className="col-start-8 flex h-[1.625rem] w-full min-w-[6.125rem] items-center justify-center rounded-[1rem] border bg-white font-['Pretendard'] text-base font-medium leading-[1.3]"
                  style={{
                    borderColor: lightTheme.line.alternative,
                    color: lightTheme.label.assistive,
                  }}
                >
                  {row.designer}
                  <img
                    src={dropdownIcon}
                    alt=""
                    className="ml-[0.375rem] size-[1.25rem]"
                    style={{ filter: DROPDOWN_FILTER }}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { CustomerTable };
