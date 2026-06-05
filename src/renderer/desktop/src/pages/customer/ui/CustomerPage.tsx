import { lightTheme } from "@design-tokens";

import {
  CUSTOMER_CONTENT_BOTTOM_OFFSET_REM,
  CUSTOMER_CONTENT_TOP_OFFSET_REM,
  CUSTOMER_PAGE_LEFT_PADDING_REM,
  CUSTOMER_PAGE_RIGHT_PADDING_REM,
} from "@/pages/customer/model/Customer.constant";
import { useCustomer } from "@/pages/customer/model/useCustomer";

import { CustomerSummaryCards } from "./Customer.SummaryCards";
import { CustomerTable } from "./Customer.Table";

const CustomerPage = () => {
  const {
    pageRef,
    scale,
    layoutWidthRem,
    layoutHeightRem,
    scaledLayoutWidthRem,
    scaledLayoutHeightRem,
    summaries,
    filters,
    rows,
  } = useCustomer();

  return (
    <div
      ref={pageRef}
      className="h-full overflow-hidden"
      style={{
        backgroundColor: lightTheme.background.alternative,
        paddingLeft: `${CUSTOMER_PAGE_LEFT_PADDING_REM}rem`,
        paddingRight: `${CUSTOMER_PAGE_RIGHT_PADDING_REM}rem`,
      }}
    >
      <div
        className="shrink-0 overflow-visible"
        style={{
          width: `${scaledLayoutWidthRem}rem`,
          height: `${scaledLayoutHeightRem}rem`,
        }}
      >
        <div
          className="origin-top-left"
          style={{
            transform: `scale(${scale})`,
            width: `${layoutWidthRem}rem`,
            height: `${layoutHeightRem}rem`,
          }}
        >
          <div
            className="flex flex-col gap-7"
            style={{
              boxSizing: "border-box",
              width: `${layoutWidthRem}rem`,
              height: `${layoutHeightRem}rem`,
              paddingTop: `${CUSTOMER_CONTENT_TOP_OFFSET_REM}rem`,
              paddingBottom: `${CUSTOMER_CONTENT_BOTTOM_OFFSET_REM}rem`,
            }}
          >
            <div className="flex items-center gap-[0.75rem]">
              <h1
                className="font-['Pretendard'] text-[1.75rem] font-bold leading-[1.3]"
                style={{ color: lightTheme.label.neutral }}
              >
                고객 목록
              </h1>
              <span
                className="font-['Pretendard'] text-2xl font-medium leading-[1.3]"
                style={{ color: lightTheme.label.assistive }}
              >
                ·
              </span>
              <span
                className="font-['Pretendard'] text-lg font-medium leading-[1.3]"
                style={{ color: lightTheme.label.assistive }}
              >
                총 고객 128명
              </span>
            </div>

            <CustomerSummaryCards summaries={summaries} />
            <CustomerTable filters={filters} rows={rows} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { CustomerPage };
