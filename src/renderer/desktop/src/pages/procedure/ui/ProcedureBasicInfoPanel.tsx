import { font, lightTheme } from "@design-tokens";

import dateIcon from "@/pages/procedure/assets/svg/date.svg";
import dropdownIcon from "@/pages/procedure/assets/svg/dropdown.svg";
import type { ProcedureBasicInfoPanelProps } from "@/pages/procedure/model/Procedure.types";

import { ProcedurePanel } from "./ProcedurePanel";

const ProcedureBasicInfoPanel = ({
  procedureDate,
  designers,
  selectedDesignerId,
  onProcedureDateChange,
  onDesignerChange,
}: ProcedureBasicInfoPanelProps) => {
  return (
    <ProcedurePanel className="h-[15.3125rem] w-full">
      <div className="flex h-full flex-col px-[1.9375rem] pt-6">
        <h2
          className={`font-['Pretendard'] ${font.headline2.bold}`}
          style={{ color: lightTheme.label.neutral }}
        >
          기본 정보
        </h2>

        <div
          className="mt-4 h-px w-[25.5rem] -translate-x-3"
          style={{ backgroundColor: lightTheme.line.alternative }}
        />

        <div className="mt-4 flex flex-col gap-2">
          <label className="flex flex-col gap-1.5">
            <span
              className={`pl-1.5 font-['Pretendard'] ${font.label.medium}`}
              style={{ color: lightTheme.label.alternative }}
            >
              시술 날짜
            </span>
            <span
              className="flex h-[2.375rem] items-center rounded-[1.25rem] border bg-white px-[0.9375rem]"
              style={{ borderColor: lightTheme.line.alternative }}
            >
              <img src={dateIcon} alt="" className="size-5 shrink-0" aria-hidden="true" />
              <input
                value={procedureDate}
                onChange={event => onProcedureDateChange(event.target.value)}
                className={`ml-3 min-w-0 flex-1 bg-transparent font-['Pretendard'] ${font.body.medium} outline-none placeholder:text-[#C1C2C3]`}
                aria-label="시술 날짜"
                style={{ color: lightTheme.line.normal }}
              />
            </span>
          </label>

          <label className="flex flex-col gap-1.5">
            <span
              className={`pl-1.5 font-['Pretendard'] ${font.label.medium}`}
              style={{ color: lightTheme.label.alternative }}
            >
              디자이너 선택
            </span>
            <span
              className="flex h-[2.375rem] items-center rounded-[1.25rem] border bg-white px-[0.9375rem]"
              style={{ borderColor: lightTheme.line.alternative }}
            >
              <img
                src={dropdownIcon}
                alt=""
                className="size-[1.4375rem] shrink-0"
                aria-hidden="true"
              />
              <select
                value={selectedDesignerId ?? ""}
                onChange={event => onDesignerChange(Number(event.target.value))}
                className={`ml-2 min-w-0 flex-1 appearance-none bg-transparent font-['Pretendard'] ${font.body.medium} outline-none`}
                aria-label="디자이너 선택"
                style={{ color: lightTheme.label.alternative }}
              >
                {designers.length === 0 ? <option value="">디자이너 없음</option> : null}
                {designers.map(designer => (
                  <option key={designer.id} value={designer.id}>
                    {designer.name}
                  </option>
                ))}
              </select>
            </span>
          </label>
        </div>
      </div>
    </ProcedurePanel>
  );
};

export { ProcedureBasicInfoPanel };
