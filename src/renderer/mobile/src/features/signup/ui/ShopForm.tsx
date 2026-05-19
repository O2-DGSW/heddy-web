import { font, lightTheme } from '@design-tokens';
import { Link } from 'react-router-dom';
import type { ShopForm as ShopFormType } from '@/features/signup/model/types';

interface Props {
  form: ShopFormType;
  onChange: (form: ShopFormType) => void;
  onNext: () => void;
}

export const ShopForm = ({ form, onChange, onNext }: Props) => {
  const inputStyle = {
    backgroundColor: lightTheme.background.neutral,
    color: lightTheme.label.normal,
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-col gap-1">
        <p className={`${font.label.medium} pl-2`} style={{ color: lightTheme.label.assistive }}>상점명</p>
        <input
          className={`w-full px-4 py-4 rounded-xl focus:outline-none ${font.caption.regular}`}
          style={inputStyle}
          placeholder="상점명"
          value={form.shopName}
          onChange={e => onChange({ ...form, shopName: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1">
        <p className={`${font.label.medium} pl-2`} style={{ color: lightTheme.label.assistive }}>주소 (사업장 소재지)</p>
        <div className="flex gap-2">
          <input
            className={`flex-1 px-4 py-4 rounded-xl focus:outline-none ${font.caption.regular}`}
            style={inputStyle}
            placeholder="주소검색"
            value={form.address}
            onChange={e => onChange({ ...form, address: e.target.value })}
            readOnly
          />
          <button
            className={`px-6 py-4 rounded-xl ${font.label.medium}`}
            style={{ backgroundColor: lightTheme.line.alternative, color: lightTheme.label.assistive }}
          >
            주소검색
          </button>
        </div>
        <input
          className={`w-full px-4 py-4 rounded-xl focus:outline-none ${font.caption.regular}`}
          style={inputStyle}
          placeholder="상세주소"
          value={form.addressDetail}
          onChange={e => onChange({ ...form, addressDetail: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1">
        <p className={`${font.label.medium} pl-2`} style={{ color: lightTheme.label.assistive }}>상점 카테고리</p>
        <div
          className={`w-full px-4 py-4 rounded-xl flex items-center justify-between ${font.caption.regular}`}
          style={inputStyle}
        >
          <span style={{ color: lightTheme.label.assistive }}>카테고리를 선택해주세요 (최대 5개)</span>
          <span style={{ color: lightTheme.label.assistive }}>▼</span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className={`${font.label.medium} pl-2`} style={{ color: lightTheme.label.assistive }}>유선번호</p>
        <input
          className={`w-full px-4 py-4 rounded-xl focus:outline-none ${font.caption.regular}`}
          style={inputStyle}
          placeholder="유선번호"
          value={form.landline}
          onChange={e => onChange({ ...form, landline: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1">
        <p className={`${font.label.medium} pl-2`} style={{ color: lightTheme.label.assistive }}>사업자등록번호</p>
        <input
          className={`w-full px-4 py-4 rounded-xl focus:outline-none ${font.caption.regular}`}
          style={inputStyle}
          placeholder="사업자등록번호"
          value={form.businessNumber}
          onChange={e => onChange({ ...form, businessNumber: e.target.value })}
        />
      </div>

      <button
        className={`w-full py-4 rounded-2xl mt-2 ${font.headline2.semiBold}`}
        style={{ backgroundColor: lightTheme.primary.normal, color: lightTheme.fill.normal }}
        onClick={onNext}
      >
        다음으로
      </button>

      <div className={`flex justify-center gap-2 ${font.caption.regular}`} style={{ color: lightTheme.label.assistive }}>
        <span>이미 계정이 있으신가요?</span>
        <Link to="/login" style={{ color: lightTheme.primary.normal }}>로그인</Link>
      </div>
    </div>
  );
};