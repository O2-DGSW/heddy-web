import { lightTheme } from "@design-tokens";

import dateIcon from "@/pages/employee/assets/date.svg";
import dropdownIcon from "@/pages/employee/assets/dropdown.svg";
import editIcon from "@/pages/employee/assets/edit.svg";
import searchIcon from "@/pages/employee/assets/search.svg";
import trashIcon from "@/pages/employee/assets/trash.svg";
import {
  EMPLOYEE_CONTENT_BOTTOM_OFFSET_REM,
  EMPLOYEE_CONTENT_TOP_OFFSET_REM,
  EMPLOYEE_PAGE_LEFT_PADDING_REM,
  EMPLOYEE_PAGE_RIGHT_PADDING_REM,
  roleMeta,
} from "@/pages/employee/model/Employee.constant";
import type {
  EmployeeRole,
  EmployeeTableProps,
  PermissionPanelProps,
} from "@/pages/employee/model/Employee.types";
import { useEmployee } from "@/pages/employee/model/useEmployee";

const EMPLOYEE_TABLE_COLUMNS = "54fr 121fr 112fr 115fr 96fr 54fr";

const RoleBadge = ({ role }: { role: EmployeeRole }) => {
  const meta = roleMeta[role];

  return (
    <button
      type="button"
      className="flex h-[1.75rem] w-full min-w-[5.75rem] items-center justify-center rounded-[0.9375rem] pl-[0.625rem] pr-[0.125rem] font-['Pretendard'] text-base font-medium leading-[1.3] whitespace-nowrap"
      style={{ backgroundColor: meta.backgroundColor, color: meta.color }}
    >
      {meta.label}
      <img
        src={dropdownIcon}
        alt=""
        className="size-[1.25rem] shrink-0"
        style={{ filter: meta.dropdownFilter }}
        aria-hidden="true"
      />
    </button>
  );
};

const EmployeeTable = ({ employees }: EmployeeTableProps) => {
  return (
    <section className="h-[47.625rem] rounded-xl bg-white shadow-[0_0_0.25rem_rgba(0,0,0,0.08)]">
      <div className="flex h-full flex-col items-center pt-[1.4375rem]">
        <div className="flex w-[93.25%] flex-col gap-[0.75rem]">
          <h2
            className="font-['Pretendard'] text-2xl font-bold leading-[1.3]"
            style={{ color: lightTheme.label.alternative }}
          >
            등록 직원
          </h2>
          <div
            className="h-[0.0625rem] w-full"
            style={{ backgroundColor: lightTheme.line.alternative }}
          />
        </div>

        <div className="mt-[2rem] flex w-full flex-col items-center gap-[1.25rem]">
          <div className="w-[91.625%]">
            <label
              className="flex h-[2.0625rem] w-[20.8125rem] items-center rounded-[1.25rem] border bg-white px-[0.9375rem]"
              style={{ borderColor: lightTheme.line.alternative }}
            >
              <img src={searchIcon} alt="" className="size-[1.25rem] shrink-0" aria-hidden="true" />
              <input
                className="ml-[0.75rem] min-w-0 flex-1 bg-transparent font-['Pretendard'] text-lg font-medium leading-[1.3] outline-none"
                placeholder="검색"
                style={{ color: lightTheme.label.neutral }}
              />
            </label>
          </div>

          <div className="w-full overflow-hidden">
            <div
              className="grid h-[2.25rem] items-center gap-[3rem] px-[2.21875rem] font-['Pretendard'] text-xl font-medium leading-[1.3]"
              style={{
                gridTemplateColumns: EMPLOYEE_TABLE_COLUMNS,
                backgroundColor: lightTheme.label.disable,
                color: lightTheme.label.assistive,
              }}
            >
              <span className="whitespace-nowrap">이름</span>
              <span className="whitespace-nowrap text-center">연락처</span>
              <span className="whitespace-nowrap text-center">계정 ID</span>
              <span className="whitespace-nowrap text-center">등록일</span>
              <span className="whitespace-nowrap text-center">권한</span>
              <span className="whitespace-nowrap text-center">관리</span>
            </div>

            <div>
              {employees.map(employee => (
                <div
                  key={employee.id}
                  className="h-[4rem] border-b"
                  style={{ borderColor: lightTheme.background.neutral }}
                >
                  <div
                    className="grid h-full items-center gap-[3rem] px-[2.21875rem] font-['Pretendard'] text-xl font-medium leading-[1.3]"
                    style={{
                      gridTemplateColumns: EMPLOYEE_TABLE_COLUMNS,
                      color: lightTheme.label.assistive,
                    }}
                  >
                    <span
                      className="min-w-0 truncate font-bold"
                      style={{ color: lightTheme.label.alternative }}
                    >
                      {employee.name}
                    </span>
                    <span className="min-w-0 truncate text-center">{employee.phone}</span>
                    <span className="min-w-0 truncate text-center">{employee.accountId}</span>
                    <span className="flex min-w-0 items-center justify-center gap-[0.5rem] whitespace-nowrap">
                      <img src={dateIcon} alt="" className="size-[1.375rem]" aria-hidden="true" />
                      {employee.registeredAt}
                    </span>
                    <RoleBadge role={employee.role} />
                    <span className="flex min-w-0 items-center justify-center gap-[0.375rem]">
                      <button type="button" aria-label="직원 삭제" className="size-[1.5rem]">
                        <img src={trashIcon} alt="" className="size-full" aria-hidden="true" />
                      </button>
                      <button type="button" aria-label="직원 수정" className="size-[1.5rem]">
                        <img src={editIcon} alt="" className="size-full" aria-hidden="true" />
                      </button>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PermissionPanel = ({ permissionOptions }: PermissionPanelProps) => {
  return (
    <aside className="h-[47.625rem] rounded-xl bg-white shadow-[0_0_0.25rem_rgba(0,0,0,0.08)]">
      <div className="flex h-full flex-col px-[1.8125rem] pt-[1.625rem]">
        <div className="flex flex-col gap-[0.75rem]">
          <h2
            className="font-['Pretendard'] text-2xl font-bold leading-[1.3]"
            style={{ color: lightTheme.label.alternative }}
          >
            권한 등록
          </h2>
          <div
            className="h-[0.0625rem] w-full"
            style={{ backgroundColor: lightTheme.line.alternative }}
          />
          <p
            className="font-['Pretendard'] text-lg font-medium leading-[1.3]"
            style={{ color: lightTheme.label.assistive }}
          >
            *가입된 계정 ID를 조회하여 디자이너 또는 원장 권한을
            <br />
            부여합니다.
          </p>
        </div>

        <div className="mt-[3.75rem] flex flex-col">
          <div className="flex flex-col gap-[3.3125rem]">
            <div className="flex flex-col gap-[1.25rem]">
              <label
                className="pl-[0.6875rem] font-['Pretendard'] text-lg font-semibold leading-[1.3]"
                style={{ color: lightTheme.label.assistive }}
              >
                계정 ID
              </label>
              <div className="flex h-[2.75rem] gap-[0.5rem]">
                <input
                  className="min-w-0 flex-1 rounded-[0.625rem] border bg-white px-[1.3125rem] font-['Pretendard'] text-lg font-medium leading-[1.3] outline-none"
                  placeholder="계정 ID 입력"
                  style={{
                    borderColor: lightTheme.line.alternative,
                    color: lightTheme.label.neutral,
                  }}
                />
                <button
                  type="button"
                  className="w-[5.625rem] rounded-[0.625rem] font-['Pretendard'] text-base font-medium leading-[1.3]"
                  style={{
                    backgroundColor: lightTheme.line.alternative,
                    color: lightTheme.line.normal,
                  }}
                >
                  중복 확인
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-[1.25rem]">
              <span
                className="pl-[0.6875rem] font-['Pretendard'] text-lg font-semibold leading-[1.3]"
                style={{ color: lightTheme.label.assistive }}
              >
                권한 선택
              </span>
              <div className="flex flex-col gap-[1rem]">
                {permissionOptions.map(option => (
                  <button
                    key={option.id}
                    type="button"
                    className="relative flex h-[6.1875rem] w-full items-center justify-center rounded-[0.9375rem] border shadow-[0_0_0.25rem_currentColor]"
                    style={{
                      borderColor: option.selected
                        ? lightTheme.primary.normal
                        : lightTheme.label.disable,
                      color: option.selected ? lightTheme.primary.normal : lightTheme.label.disable,
                    }}
                  >
                    <span
                      className="absolute left-[0.6875rem] top-[0.6875rem] size-[1rem] rounded-full border-[0.125rem]"
                      style={{
                        borderColor: option.selected
                          ? lightTheme.primary.normal
                          : lightTheme.line.normal,
                      }}
                    >
                      {option.selected && (
                        <span
                          className="absolute left-1/2 top-1/2 size-[0.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
                          style={{ backgroundColor: lightTheme.primary.normal }}
                        />
                      )}
                    </span>
                    <span className="grid w-full grid-cols-[7.875rem_1fr] items-center">
                      <span className="flex justify-center">
                        <img
                          src={option.image}
                          alt=""
                          className="h-[3.625rem] w-[3.75rem] object-contain object-center"
                        />
                      </span>
                      <span
                        className="font-['Pretendard'] text-xl font-bold leading-[1.3]"
                        style={{ color: lightTheme.label.neutral }}
                      >
                        {option.label}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-[6.75rem] flex justify-end gap-[0.75rem]">
            <button
              type="button"
              className="h-[2rem] w-[5.625rem] rounded-md font-['Pretendard'] text-lg font-semibold leading-[1.3]"
              style={{
                backgroundColor: lightTheme.background.neutral,
                color: lightTheme.line.normal,
              }}
            >
              취소
            </button>
            <button
              type="button"
              className="h-[2rem] w-[5.625rem] rounded-md font-['Pretendard'] text-lg font-semibold leading-[1.3]"
              style={{ backgroundColor: lightTheme.primary.normal, color: lightTheme.fill.normal }}
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

const EmployeePage = () => {
  const {
    pageRef,
    scale,
    layoutWidthRem,
    layoutHeightRem,
    scaledLayoutWidthRem,
    scaledLayoutHeightRem,
    employees,
    permissionOptions,
  } = useEmployee();

  return (
    <div
      ref={pageRef}
      className="h-full overflow-hidden"
      style={{
        backgroundColor: lightTheme.background.alternative,
        paddingLeft: `${EMPLOYEE_PAGE_LEFT_PADDING_REM}rem`,
        paddingRight: `${EMPLOYEE_PAGE_RIGHT_PADDING_REM}rem`,
      }}
    >
      <div
        className="shrink-0 overflow-visible"
        style={{ width: `${scaledLayoutWidthRem}rem`, height: `${scaledLayoutHeightRem}rem` }}
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
            className="flex flex-col gap-[2rem]"
            style={{
              boxSizing: "border-box",
              width: `${layoutWidthRem}rem`,
              height: `${layoutHeightRem}rem`,
              paddingTop: `${EMPLOYEE_CONTENT_TOP_OFFSET_REM}rem`,
              paddingBottom: `${EMPLOYEE_CONTENT_BOTTOM_OFFSET_REM}rem`,
            }}
          >
            <div className="flex items-center gap-[0.75rem]">
              <h1
                className="font-['Pretendard'] text-[2rem] font-bold leading-[1.3]"
                style={{ color: lightTheme.label.neutral }}
              >
                직원 권한 관리
              </h1>
              <span
                className="font-['Pretendard'] text-2xl font-medium leading-[1.3]"
                style={{ color: lightTheme.label.assistive }}
              >
                ·
              </span>
              <span
                className="font-['Pretendard'] text-xl font-medium leading-[1.3]"
                style={{ color: lightTheme.label.assistive }}
              >
                총 직원 128명
              </span>
            </div>

            <div className="grid flex-1 grid-cols-[minmax(0,1fr)_30.4375rem] gap-[1rem]">
              <EmployeeTable employees={employees} />
              <PermissionPanel permissionOptions={permissionOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EmployeePage };
