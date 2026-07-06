import { lightTheme } from "@design-tokens";

import { SHOP_CATEGORIES } from "@/features/auth/signup/constants/signup";
import {
  fieldLabelClassName,
  inputClassName,
  inputStyle,
  primaryRingStyle,
} from "@/features/auth/signup/ui/SignupFormStyles";
import type { CategorySelectFieldProps } from "@/features/auth/signup/ui/types";

const CategorySelectField = ({ value, onChange }: CategorySelectFieldProps) => (
  <div className="mt-[clamp(10px,2.8vh,24px)] flex flex-col gap-1">
    <label
      htmlFor="signup-shop-category"
      className={fieldLabelClassName}
      style={{ color: lightTheme.label.assistive }}
    >
      상점 카테고리
    </label>
    <select
      id="signup-shop-category"
      name="category"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={`${inputClassName} appearance-none bg-[right_15px_center]`}
      style={{
        ...primaryRingStyle,
        ...inputStyle,
        color: value ? lightTheme.label.neutral : lightTheme.line.normal,
      }}
    >
      <option value="" disabled>
        카테고리를 선택해주세요
      </option>
      {SHOP_CATEGORIES.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  </div>
);

export { CategorySelectField };
