import { useNavigate } from "react-router-dom";

import { font, lightTheme } from "@design-tokens";
import { CutsTag } from "@/private/shared/ui/cuts-tag/CutsTag";
import type { Customer } from "@/features/cuts/model/types/Customer.types";
import arrowSvg from "@/private/shared/ui/dialog/assets/Arrow.svg";
import anagImg from "@/features/profile/assets/default/top-field/ANAG.png";
import dateSvg from "@/features/cuts/assets/procedute-note/Date.svg";
import timeSvg from "@/features/shop/assets/reservation/Time.svg";

import { useCustomerSearch } from "../model/useCustomerSearch";

const CustomerItem = ({ customer, onSelect }: { customer: Customer; onSelect: (c: Customer) => void }) => (
  <button
    type="button"
    className="w-full flex items-center gap-3 px-4 py-5 rounded-2xl"
    style={{ backgroundColor: lightTheme.background.neutral }}
    onClick={() => onSelect(customer)}
  >
    <img src={anagImg} alt="프로필" className="w-10 h-10 rounded-full shrink-0" />

    <div className="flex flex-col gap-0.5 flex-1 min-w-0 text-left">
      <span className={font.body.bold} style={{ color: lightTheme.label.neutral }}>
        {customer.name} 님
      </span>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <img src={dateSvg} alt="날짜" className="w-3 h-3" />
          <span className={font.caption.regular} style={{ color: lightTheme.label.assistive }}>
            {customer.lastVisitDate}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <img src={timeSvg} alt="시간" className="w-3 h-3" />
          <span className={font.caption.regular} style={{ color: lightTheme.label.assistive }}>
            {customer.lastVisitTime}
          </span>
        </div>
      </div>
    </div>

    <div className="flex gap-1 shrink-0">
      {customer.tags.map((tag) => (
        <CutsTag key={tag} text={tag} />
      ))}
    </div>
  </button>
);

export const CustomerSearchPage = () => {
  const navigate = useNavigate();
  const { query, setQuery, filtered } = useCustomerSearch();

  const handleSelect = (customer: Customer) => {
    navigate("/cuts/add", { state: { selectedCustomer: customer.name } });
  };

  return (
    <div
      className="fixed inset-0 flex flex-col overflow-hidden pt-safe"
      style={{ backgroundColor: lightTheme.background.normal }}
    >
      {/* 헤더 */}
      <div className="relative flex items-center px-4 py-3 pt-5 shrink-0">
        <button type="button" onClick={() => navigate(-1)} className="absolute left-4 p-1">
          <img src={arrowSvg} alt="뒤로가기" className="w-4 h-4" />
        </button>
        <h2
          className={`flex-1 text-center ${font.headline1.semiBold}`}
          style={{ color: lightTheme.label.neutral }}
        >
          시술 기록 추가
        </h2>
      </div>

      {/* 검색 바 */}
      <div className="px-4 pt-2 pb-3 shrink-0">
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-full border"
          style={{ borderColor: lightTheme.line.alternative }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke={lightTheme.label.assistive} strokeWidth="2" />
            <path d="M16.5 16.5L21 21" stroke={lightTheme.label.assistive} strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            className={`flex-1 bg-transparent focus:outline-none ${font.body.regular}`}
            style={{ color: lightTheme.label.normal }}
            placeholder="고객 이름 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 고객 목록 */}
      <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-2">
        {filtered.map((customer) => (
          <CustomerItem key={customer.id} customer={customer} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  );
};