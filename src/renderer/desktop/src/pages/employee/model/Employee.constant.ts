import { lightTheme } from "@design-tokens";

import designerImage from "@/pages/employee/assets/designer-dinosaur.png";
import directorImage from "@/pages/employee/assets/director-dinosaur.png";

import type { EmployeeRow, PermissionOption } from "./Employee.types";

export const EMPLOYEE_CONTENT_WIDTH_REM = 85.0625;
export const EMPLOYEE_CONTENT_HEIGHT_REM = 51.875;
export const EMPLOYEE_CONTENT_TOP_OFFSET_REM = 2.625;
export const EMPLOYEE_CONTENT_BOTTOM_OFFSET_REM = 2.5625;
export const EMPLOYEE_PAGE_LEFT_PADDING_REM = 2.5625;
export const EMPLOYEE_PAGE_RIGHT_PADDING_REM = 2.5;
export const MIN_EMPLOYEE_SCALE = 0.32;

export const DROPDOWN_FILTER =
  "brightness(0) saturate(100%) invert(36%) sepia(7%) saturate(235%) hue-rotate(169deg) brightness(94%) contrast(88%)";

export const EMPLOYEE_ROWS: EmployeeRow[] = [
  {
    id: 1,
    name: "오용준",
    phone: "010-1234-5678",
    accountId: "dhdydwns",
    registeredAt: "2002.10.10",
    role: "designer",
  },
  {
    id: 2,
    name: "오용준",
    phone: "010-1234-5678",
    accountId: "dhdydwns",
    registeredAt: "2002.10.10",
    role: "director",
  },
  {
    id: 3,
    name: "오용준",
    phone: "010-1234-5678",
    accountId: "dhdydwns",
    registeredAt: "2002.10.10",
    role: "designer",
  },
  {
    id: 4,
    name: "오용준",
    phone: "010-1234-5678",
    accountId: "dhdydwns",
    registeredAt: "2002.10.10",
    role: "designer",
  },
  {
    id: 5,
    name: "오용준",
    phone: "010-1234-5678",
    accountId: "dhdydwns",
    registeredAt: "2002.10.10",
    role: "designer",
  },
  {
    id: 6,
    name: "오용준",
    phone: "010-1234-5678",
    accountId: "dhdydwns",
    registeredAt: "2002.10.10",
    role: "designer",
  },
];

export const PERMISSION_OPTIONS: PermissionOption[] = [
  {
    id: "director",
    label: "원장으로 권한 등록",
    image: directorImage,
    selected: true,
  },
  {
    id: "designer",
    label: "디자이너로 권한 등록",
    image: designerImage,
    selected: false,
  },
];

export const roleMeta = {
  designer: {
    label: "디자이너",
    backgroundColor: "#B3E5D2",
    color: lightTheme.primary.normal,
    dropdownFilter: DROPDOWN_FILTER,
  },
  director: {
    label: "원장",
    backgroundColor: lightTheme.primary.normal,
    color: lightTheme.label.buttonText,
    dropdownFilter: "brightness(0) invert(1)",
  },
} satisfies Record<
  EmployeeRow["role"],
  { label: string; backgroundColor: string; color: string; dropdownFilter: string }
>;
