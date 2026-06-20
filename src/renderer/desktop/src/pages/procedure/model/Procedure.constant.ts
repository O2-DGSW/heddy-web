import customerAvatar from "@/pages/procedure/assets/images/customer-avatar.png";
import {
  DESKTOP_PAGE_CONTENT_BOTTOM_OFFSET_REM,
  DESKTOP_PAGE_CONTENT_HEIGHT_REM,
  DESKTOP_PAGE_CONTENT_TOP_OFFSET_REM,
  DESKTOP_PAGE_CONTENT_WIDTH_REM,
  DESKTOP_PAGE_LEFT_PADDING_REM,
  DESKTOP_PAGE_RIGHT_PADDING_REM,
} from "@/shared/constants/Layout.constant";

import type { ProcedureCustomer, ProcedureDesigner, ProcedureTag } from "./Procedure.types";

export const PROCEDURE_CONTENT_WIDTH_REM = DESKTOP_PAGE_CONTENT_WIDTH_REM;
export const PROCEDURE_CONTENT_HEIGHT_REM = DESKTOP_PAGE_CONTENT_HEIGHT_REM;
export const PROCEDURE_CONTENT_TOP_OFFSET_REM = DESKTOP_PAGE_CONTENT_TOP_OFFSET_REM;
export const PROCEDURE_CONTENT_BOTTOM_OFFSET_REM = DESKTOP_PAGE_CONTENT_BOTTOM_OFFSET_REM;
export const PROCEDURE_PAGE_LEFT_PADDING_REM = DESKTOP_PAGE_LEFT_PADDING_REM;
export const PROCEDURE_PAGE_RIGHT_PADDING_REM = DESKTOP_PAGE_RIGHT_PADDING_REM;
export const MIN_PROCEDURE_SCALE = 0.32;

export const PROCEDURE_BODY_HEIGHT_REM = 47.875;
export const PROCEDURE_LEFT_PANEL_WIDTH_REM = 27.9375;
export const PROCEDURE_RIGHT_PANEL_WIDTH_REM = 56.125;

export const PROCEDURE_CUSTOMERS: ProcedureCustomer[] = [
  {
    id: 1,
    name: "오용준",
    avatar: customerAvatar,
    tags: ["# 남자", "# 다운펌"],
    date: "10/10",
    time: "10:00",
  },
  {
    id: 2,
    name: "오용준",
    avatar: customerAvatar,
    tags: ["# 남자", "# 다운펌"],
    date: "10/10",
    time: "10:00",
  },
  {
    id: 3,
    name: "오용준",
    avatar: customerAvatar,
    tags: ["# 남자", "# 다운펌"],
    date: "10/10",
    time: "10:00",
  },
];

export const PROCEDURE_DESIGNERS: ProcedureDesigner[] = [
  { id: "oh-yong-jun", name: "오용준" },
  { id: "kim-heddy", name: "김헤디" },
  { id: "lee-designer", name: "이디자이너" },
];

const SELECTED_TAG_INDEXES = new Set([4, 9, 10, 11, 14, 15, 16, 19, 22, 23, 24, 25, 33]);

export const PROCEDURE_TAGS: ProcedureTag[] = Array.from({ length: 35 }, (_, index) => ({
  id: `procedure-tag-${index + 1}`,
  label: index === 0 ? "# 남자" : "# 다운펌",
  selected: SELECTED_TAG_INDEXES.has(index),
}));

export const DEFAULT_PROCEDURE_DATE = "2026/09/09";
export const PROCEDURE_MEMO_MAX_LENGTH = 500;
