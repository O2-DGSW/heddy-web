import { lightTheme, palette } from "@design-tokens";

import designerImage from "@/pages/employee/assets/png/designer-dinosaur.png";
import directorImage from "@/pages/employee/assets/png/director-dinosaur.png";
import {
  DESKTOP_PAGE_CONTENT_BOTTOM_OFFSET_REM,
  DESKTOP_PAGE_CONTENT_HEIGHT_REM,
  DESKTOP_PAGE_CONTENT_TOP_OFFSET_REM,
  DESKTOP_PAGE_CONTENT_WIDTH_REM,
  DESKTOP_PAGE_LEFT_PADDING_REM,
  DESKTOP_PAGE_RIGHT_PADDING_REM,
} from "@/shared/constants/Layout.constant";

import type { EmployeeRole, PermissionOption } from "./Employee.types";

export const EMPLOYEE_CONTENT_WIDTH_REM = DESKTOP_PAGE_CONTENT_WIDTH_REM;
export const EMPLOYEE_CONTENT_HEIGHT_REM = DESKTOP_PAGE_CONTENT_HEIGHT_REM;
export const EMPLOYEE_CONTENT_TOP_OFFSET_REM = DESKTOP_PAGE_CONTENT_TOP_OFFSET_REM;
export const EMPLOYEE_CONTENT_BOTTOM_OFFSET_REM = DESKTOP_PAGE_CONTENT_BOTTOM_OFFSET_REM;
export const EMPLOYEE_PAGE_LEFT_PADDING_REM = DESKTOP_PAGE_LEFT_PADDING_REM;
export const EMPLOYEE_PAGE_RIGHT_PADDING_REM = DESKTOP_PAGE_RIGHT_PADDING_REM;
export const MIN_EMPLOYEE_SCALE = 0.32;

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
    backgroundColor: palette.main[80],
    color: lightTheme.primary.normal,
  },
  director: {
    label: "원장",
    backgroundColor: lightTheme.primary.normal,
    color: lightTheme.label.buttonText,
  },
} satisfies Record<EmployeeRole, { label: string; backgroundColor: string; color: string }>;
