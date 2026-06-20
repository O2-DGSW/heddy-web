import { font, lightTheme } from "@design-tokens";

import {
  PROCEDURE_BODY_HEIGHT_REM,
  PROCEDURE_CONTENT_BOTTOM_OFFSET_REM,
  PROCEDURE_CONTENT_TOP_OFFSET_REM,
  PROCEDURE_LEFT_PANEL_WIDTH_REM,
  PROCEDURE_PAGE_LEFT_PADDING_REM,
  PROCEDURE_PAGE_RIGHT_PADDING_REM,
} from "@/pages/procedure/model/Procedure.constant";
import { useProcedure } from "@/pages/procedure/model/useProcedure";

import { ProcedureBasicInfoPanel } from "./ProcedureBasicInfoPanel";
import { ProcedureCustomerPanel } from "./ProcedureCustomerPanel";
import { ProcedureRecordPanel } from "./ProcedureRecordPanel";

const ProcedurePage = () => {
  const {
    pageRef,
    scale,
    layoutWidthRem,
    layoutHeightRem,
    scaledLayoutWidthRem,
    scaledLayoutHeightRem,
    customers,
    query,
    selectedCustomerId,
    procedureDate,
    designers,
    selectedDesignerId,
    tags,
    memo,
    imagePreviews,
    setQuery,
    setSelectedCustomerId,
    setProcedureDate,
    setSelectedDesignerId,
    handleToggleTag,
    handleMemoChange,
    handleImageChange,
    handleCancel,
  } = useProcedure();

  return (
    <div
      ref={pageRef}
      className="h-full w-full overflow-hidden"
      style={{
        backgroundColor: lightTheme.background.alternative,
        paddingBottom: `${PROCEDURE_CONTENT_BOTTOM_OFFSET_REM}rem`,
        paddingLeft: `${PROCEDURE_PAGE_LEFT_PADDING_REM}rem`,
        paddingRight: `${PROCEDURE_PAGE_RIGHT_PADDING_REM}rem`,
        paddingTop: `${PROCEDURE_CONTENT_TOP_OFFSET_REM}rem`,
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
            }}
          >
            <h1
              className={`font-['Pretendard'] ${font.title1.bold}`}
              style={{ color: lightTheme.label.neutral }}
            >
              시술 관리
            </h1>

            <div
              className="flex min-w-0 gap-4"
              style={{ height: `${PROCEDURE_BODY_HEIGHT_REM}rem` }}
            >
              <div
                className="flex h-full shrink-0 flex-col gap-4"
                style={{ width: `${PROCEDURE_LEFT_PANEL_WIDTH_REM}rem` }}
              >
                <ProcedureCustomerPanel
                  customers={customers}
                  query={query}
                  selectedCustomerId={selectedCustomerId}
                  onQueryChange={setQuery}
                  onSelectCustomer={setSelectedCustomerId}
                />
                <ProcedureBasicInfoPanel
                  procedureDate={procedureDate}
                  designers={designers}
                  selectedDesignerId={selectedDesignerId}
                  onProcedureDateChange={setProcedureDate}
                  onDesignerChange={setSelectedDesignerId}
                />
              </div>

              <ProcedureRecordPanel
                tags={tags}
                memo={memo}
                imagePreviews={imagePreviews}
                onToggleTag={handleToggleTag}
                onMemoChange={handleMemoChange}
                onImageChange={handleImageChange}
                onCancel={handleCancel}
                onSave={() => undefined}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProcedurePage };
