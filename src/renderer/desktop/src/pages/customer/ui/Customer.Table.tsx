import { lightTheme } from "@design-tokens";

import dateIcon from "@/pages/customer/assets/date.svg";
import dropdownIcon from "@/pages/customer/assets/dropdown.svg";
import searchIcon from "@/pages/customer/assets/search.svg";
import { DROPDOWN_FILTER } from "@/pages/customer/model/Customer.constant";
import type { CustomerRiskLevel, CustomerTableProps } from "@/pages/customer/model/Customer.types";
import emptyCustomerImage from "@/pages/reservation/assets/reservation-customer.png";

const CUSTOMER_GRID_COLUMNS = "54fr 131fr 82fr 67fr 228fr 140fr 55fr 98fr";

const riskColorMap: Record<CustomerRiskLevel, string> = {
  normal: lightTheme.status.success,
  caution: lightTheme.status.warning,
  risk: lightTheme.status.error,
};

const CustomerTable = ({
  filters,
  rows,
  searchQuery,
  isLoading,
  emptyMessage,
  sortLabel,
  sortOptions,
  designerOptions,
  isSortMenuOpen,
  openDesignerMenuRowId,
  onChangeSearchQuery,
  onSelectFilter,
  onToggleSortMenu,
  onSelectSort,
  onToggleDesignerMenu,
  onSelectDesigner,
}: CustomerTableProps) => {
  return (
    <section className="flex h-[38.75rem] w-full flex-col gap-5">
      <h2
        className="font-['Pretendard'] text-2xl font-bold leading-[1.3]"
        style={{ color: lightTheme.label.alternative }}
      >
        고객 현황
      </h2>

      <div className="h-[35.625rem] overflow-hidden rounded-xl bg-white shadow-[0_0_0.25rem_rgba(0,0,0,0.08)]">
        <div className="mb-[1rem] flex h-[3.5625rem] items-end justify-between px-[1.75rem] pb-[0.25rem]">
          <label
            className="flex h-[2.0625rem] w-[20.8125rem] items-center rounded-[1.25rem] border bg-white px-[0.9375rem]"
            style={{ borderColor: lightTheme.line.alternative }}
          >
            <img src={searchIcon} alt="" className="size-[1.25rem] shrink-0" aria-hidden="true" />
            <input
              value={searchQuery}
              onChange={event => onChangeSearchQuery(event.target.value)}
              className="ml-[0.75rem] min-w-0 flex-1 bg-transparent font-['Pretendard'] text-base font-medium leading-[1.3] outline-none"
              placeholder="검색"
              style={{ color: lightTheme.label.neutral }}
            />
          </label>

          <div className="flex h-[1.875rem] items-center gap-[2rem]">
            <div className="flex items-center gap-[0.5rem]">
              {filters.map(filter => (
                <button
                  key={filter.key}
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
                  onClick={() => onSelectFilter(filter.key)}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={isSortMenuOpen}
                className="flex h-[1.875rem] w-[7.6875rem] items-center justify-center rounded-[1rem] border bg-white font-['Pretendard'] text-sm font-medium leading-[1.3]"
                style={{
                  borderColor: lightTheme.line.alternative,
                  color: lightTheme.label.assistive,
                }}
                onClick={onToggleSortMenu}
              >
                {sortLabel}
                <img
                  src={dropdownIcon}
                  alt=""
                  className="ml-[0.125rem] size-[1.3125rem]"
                  style={{ filter: DROPDOWN_FILTER }}
                  aria-hidden="true"
                />
              </button>

              {isSortMenuOpen ? (
                <div
                  className="absolute right-0 top-[2.25rem] z-10 flex w-[7.6875rem] flex-col overflow-hidden rounded-[0.75rem] bg-white py-[0.25rem] shadow-[0_0_0.5rem_rgba(0,0,0,0.08)]"
                  style={{ border: `0.0625rem solid ${lightTheme.line.alternative}` }}
                >
                  {sortOptions.map(option => (
                    <button
                      key={option.key}
                      type="button"
                      className="flex h-[2rem] items-center justify-center whitespace-nowrap font-['Pretendard'] text-sm font-medium leading-[1.3] hover:bg-[#F7F7F7]"
                      style={{ color: lightTheme.label.assistive }}
                      onClick={() => onSelectSort(option.key)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div
          className="grid h-[2.25rem] items-center gap-[3.25rem] px-[4.4375rem] font-['Pretendard'] text-lg font-medium leading-[1.3]"
          style={{
            gridTemplateColumns: CUSTOMER_GRID_COLUMNS,
            backgroundColor: lightTheme.label.disable,
            color: lightTheme.label.assistive,
          }}
        >
          <span className="col-start-1 whitespace-nowrap text-left">고객명</span>
          <span className="col-start-2 whitespace-nowrap text-center">연락처</span>
          <span className="col-start-3 whitespace-nowrap text-center">최근 방문일</span>
          <span className="col-start-4 whitespace-nowrap text-center">방문 주기</span>
          <span className="col-start-5 whitespace-nowrap text-center">이탈 위험도</span>
          <span className="col-start-6 whitespace-nowrap text-center">시술 태그</span>
          <span className="col-start-7 whitespace-nowrap text-center">총 방문</span>
          <span className="col-start-8 whitespace-nowrap text-center">담당 디자이너</span>
        </div>

        <div className="flex h-[28.8125rem] flex-col">
          {isLoading ? (
            <div
              className="flex h-full flex-col items-center justify-center gap-[0.875rem] text-center font-['Pretendard'] text-lg font-medium leading-[1.3]"
              style={{ color: lightTheme.label.assistive }}
            >
              고객 정보를 불러오는 중입니다
            </div>
          ) : rows.length === 0 ? (
            <div
              className="flex h-full flex-col items-center justify-center gap-[0.875rem] text-center font-['Pretendard'] text-lg font-medium leading-[1.3]"
              style={{ color: lightTheme.label.assistive }}
            >
              <img
                src={emptyCustomerImage}
                alt=""
                className="size-[5rem] object-contain"
                aria-hidden="true"
              />
              {emptyMessage}
            </div>
          ) : (
            rows.map(row => (
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
                  <span className="col-start-7 min-w-0 truncate text-center">
                    {row.totalVisits}
                  </span>
                  <div className="relative col-start-8 flex min-w-0 justify-center">
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={openDesignerMenuRowId === row.id}
                      className="flex h-[1.625rem] w-full min-w-[6.125rem] items-center justify-center rounded-[1rem] border bg-white font-['Pretendard'] text-base font-medium leading-[1.3]"
                      style={{
                        borderColor: lightTheme.line.alternative,
                        color: lightTheme.label.assistive,
                      }}
                      onClick={() => onToggleDesignerMenu(row.id)}
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

                    {openDesignerMenuRowId === row.id ? (
                      <div
                        className="absolute right-0 top-[2rem] z-20 flex w-[6.125rem] flex-col overflow-hidden rounded-[0.75rem] bg-white py-[0.25rem] shadow-[0_0_0.5rem_rgba(0,0,0,0.08)]"
                        style={{ border: `0.0625rem solid ${lightTheme.line.alternative}` }}
                      >
                        {designerOptions.map(option => (
                          <button
                            key={option.id}
                            type="button"
                            className="flex h-[2rem] items-center justify-center whitespace-nowrap font-['Pretendard'] text-base font-medium leading-[1.3] hover:bg-[#F7F7F7]"
                            style={{
                              color:
                                row.designer === option.name
                                  ? lightTheme.primary.normal
                                  : lightTheme.label.assistive,
                            }}
                            onClick={() => onSelectDesigner(row.id, option.name)}
                          >
                            {option.name}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export { CustomerTable };
