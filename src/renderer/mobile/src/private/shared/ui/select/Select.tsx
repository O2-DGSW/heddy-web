import { font, lightTheme } from "@design-tokens";

/** Select 컴포넌트의 옵션 항목 */
type SelectOption = {
  label: string;
  value: string;
};

/** Select 컴포넌트 props */
interface SelectProps {
  /** 선택 옵션 목록 */
  options: readonly SelectOption[];
  /** 현재 선택된 값 */
  value: string;
  /** 값 변경 핸들러 */
  onChange: (value: string) => void;
  /** 기본 표시 텍스트 */
  placeholder?: string;
}

/**
 * 공통 스타일 Select 컴포넌트
 * @param props {@link SelectProps}
 */
export const Select = ({ options, value, onChange, placeholder }: SelectProps) => {
  return (
    <select
      className={`w-full px-4 py-3 rounded-xl focus:outline-none ${font.caption.regular}`}
      style={{
        backgroundColor: lightTheme.background.neutral,
        color: value ? lightTheme.label.neutral : lightTheme.label.assistive,
      }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};