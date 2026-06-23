import { useState } from "react";

import { lightTheme } from "@design-tokens";

import dateIcon from "@/pages/employee/assets/svg/date.svg";
import DropdownIcon from "@/pages/employee/assets/svg/dropdown.svg?react";
import editIcon from "@/pages/employee/assets/svg/edit.svg";
import searchIcon from "@/pages/employee/assets/svg/search.svg";
import trashIcon from "@/pages/employee/assets/svg/trash.svg";
import emptyEmployeeImage from "@/pages/reservation/assets/reservation-customer.png";
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
  RoleBadgeProps,
} from "@/pages/employee/model/Employee.types";
import { useEmployee } from "@/pages/employee/model/useEmployee";

const EMPLOYEE_TABLE_COLUMNS = "54fr 121fr 112fr 115fr 96fr 54fr";
const EMPLOYEE_ROLE_OPTIONS: EmployeeRole[] = ["director", "designer"];

const RoleBadge = ({
  role,
  menuPlacement = "bottom",
  isOpen,
  onToggle,
  onSelectRole,
}: RoleBadgeProps) => {
  const meta = roleMeta[role];
  const [hoveredRole, setHoveredRole] = useState<EmployeeRole | null>(null);

  return (
    <div className="relative justify-self-center">
      <button
        type="button"
        className="flex h-8 w-27.5 items-center justify-center gap-0.75 rounded-[0.9375rem] pl-2.5 pr-1.5 font-['Pretendard'] text-lg font-medium leading-[1.3] whitespace-nowrap"
        style={{ backgroundColor: meta.backgroundColor, color: meta.color }}
        aria-label={`${meta.label} 권한 선택`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={event => {
          event.stopPropagation();
          onToggle();
        }}
      >
        {meta.label}
        <DropdownIcon
          aria-hidden="true"
          className="size-5 shrink-0"
          style={{ color: meta.color }}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute z-[100] flex w-18 flex-col overflow-hidden rounded-md bg-white py-0.25 shadow-[0_0.125rem_0.5rem_rgba(0,0,0,0.1)]"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            ...(menuPlacement === "top"
              ? { bottom: "calc(100% + 0.25rem)" }
              : { top: "calc(100% + 0.25rem)" }),
            border: `0.0625rem solid ${lightTheme.line.alternative}`,
          }}
          onClick={event => event.stopPropagation()}
          onMouseLeave={() => setHoveredRole(null)}
        >
          {EMPLOYEE_ROLE_OPTIONS.map(optionRole => {
            const optionMeta = roleMeta[optionRole];
            const isSelected = role === optionRole;
            const isHovered = hoveredRole === optionRole;

            return (
              <button
                key={optionRole}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                className={[
                  "flex h-5.5 items-center justify-center border-b font-['Pretendard'] text-xs",
                  "font-normal leading-none transition-colors last:border-b-0",
                ].join(" ")}
                style={{
                  borderColor: lightTheme.line.alternative,
                  color: isSelected ? lightTheme.primary.normal : lightTheme.label.assistive,
                  backgroundColor:
                    isHovered || isSelected
                      ? lightTheme.background.neutral
                      : lightTheme.background.normal,
                }}
                onMouseEnter={() => setHoveredRole(optionRole)}
                onMouseLeave={() => setHoveredRole(null)}
                onClick={event => {
                  event.stopPropagation();
                  setHoveredRole(null);
                  onSelectRole(optionRole);
                }}
              >
                {optionMeta.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const EmployeeTable = ({
  employees,
  searchQuery,
  isLoading,
  emptyMessage,
  openRoleMenuRowId,
  onChangeSearchQuery,
  onToggleRoleMenu,
  onSelectRole,
  onDeleteEmployee,
  onStartEditEmployee,
}: EmployeeTableProps) => {
  return (
    <section className="h-190.5 rounded-xl bg-white shadow-[0_0_0.25rem_rgba(0,0,0,0.08)]">
      <div className="flex h-full flex-col items-center pt-5.75">
        <div className="flex w-[93.25%] flex-col gap-3">
          <h2
            className="font-['Pretendard'] text-2xl font-bold leading-[1.3]"
            style={{ color: lightTheme.label.alternative }}
          >
            등록 직원
          </h2>
          <div className="h-px w-full" style={{ backgroundColor: lightTheme.line.alternative }} />
        </div>

        <div className="mt-8 flex min-h-0 w-full flex-1 flex-col items-center gap-5">
          <div className="w-[91.625%]">
            <label
              className="flex h-8.25 w-83.25 items-center rounded-[1.25rem] border bg-white px-3.75"
              style={{ borderColor: lightTheme.line.alternative }}
            >
              <img src={searchIcon} alt="" className="size-5 shrink-0" aria-hidden="true" />
              <input
                className="ml-3 min-w-0 flex-1 bg-transparent font-['Pretendard'] text-lg font-medium leading-[1.3] outline-none"
                placeholder="검색"
                style={{ color: lightTheme.label.neutral }}
                value={searchQuery}
                onChange={event => onChangeSearchQuery(event.target.value)}
              />
            </label>
          </div>

          <div className="flex min-h-0 w-full flex-1 flex-col overflow-visible">
            <div
              className="grid h-9 items-center gap-12 px-[2.21875rem] font-['Pretendard'] text-xl font-medium leading-[1.3]"
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

            <div className="flex min-h-0 flex-1 flex-col">
              {employees.map((employee, employeeIndex) => {
                const isRoleMenuOpen = openRoleMenuRowId === employee.id;
                const menuPlacement =
                  employeeIndex >= Math.max(0, employees.length - 2) ? "top" : "bottom";

                return (
                  <div
                    key={employee.id}
                    className={["relative h-16 border-b", isRoleMenuOpen ? "z-30" : "z-0"].join(
                      " "
                    )}
                    style={{ borderColor: lightTheme.background.neutral }}
                  >
                    <div
                      className="grid h-full items-center gap-12 px-[2.21875rem] font-['Pretendard'] text-xl font-medium leading-[1.3]"
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
                      <span className="flex min-w-0 items-center justify-center gap-2 whitespace-nowrap">
                        <img src={dateIcon} alt="" className="size-5.5" aria-hidden="true" />
                        {employee.registeredAt}
                      </span>
                      <RoleBadge
                        role={employee.role}
                        menuPlacement={menuPlacement}
                        isOpen={isRoleMenuOpen}
                        onToggle={() => onToggleRoleMenu(employee.id)}
                        onSelectRole={role => onSelectRole(employee.id, role)}
                      />
                      <span className="flex min-w-0 items-center justify-center gap-1.5">
                        <button
                          type="button"
                          aria-label="직원 삭제"
                          className="size-6"
                          onClick={() => onDeleteEmployee(employee.id)}
                        >
                          <img src={trashIcon} alt="" className="size-full" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          aria-label="직원 수정"
                          className="size-6"
                          onClick={() => onStartEditEmployee(employee)}
                        >
                          <img src={editIcon} alt="" className="size-full" aria-hidden="true" />
                        </button>
                      </span>
                    </div>
                  </div>
                );
              })}
              {isLoading ? (
                <div
                  className="flex flex-1 items-center justify-center font-['Pretendard'] text-xl font-medium leading-[1.3]"
                  style={{ color: lightTheme.label.assistive }}
                >
                  직원 정보를 불러오는 중입니다
                </div>
              ) : employees.length === 0 ? (
                <div
                  className="flex flex-1 flex-col items-center justify-center gap-3.5 text-center font-['Pretendard'] text-xl font-medium leading-[1.3]"
                  style={{ color: lightTheme.label.assistive }}
                >
                  <div className="relative size-24 overflow-hidden rounded-full bg-white shadow-[0_0_0.375rem_rgba(0,0,0,0.02)]">
                    <img
                      src={emptyEmployeeImage}
                      alt=""
                      className="absolute left-1/2 top-1/2 h-[71.052631%] w-[75%] -translate-x-1/2 -translate-y-1/2 object-cover"
                      aria-hidden="true"
                    />
                  </div>
                  {emptyMessage}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PermissionPanel = ({
  employeeName,
  employeePhone,
  employeeRegisteredAt,
  accountId,
  accountIdMessage,
  isEditingEmployee,
  permissionOptions,
  onChangeEmployeeName,
  onChangeEmployeePhone,
  onChangeEmployeeRegisteredAt,
  onChangeAccountId,
  onCheckAccountId,
  onSelectPermissionRole,
  onCancelPermissionForm,
  onSubmitPermissionForm,
}: PermissionPanelProps) => {
  return (
    <aside className="h-190.5 rounded-xl bg-white shadow-[0_0_0.25rem_rgba(0,0,0,0.08)]">
      <div className="relative flex h-full flex-col px-7.25 pt-6.5">
        <div className="flex flex-col gap-3">
          <h2
            className="font-['Pretendard'] text-2xl font-bold leading-[1.3]"
            style={{ color: lightTheme.label.alternative }}
          >
            {isEditingEmployee ? "권한 수정" : "권한 등록"}
          </h2>
          <div className="h-px w-full" style={{ backgroundColor: lightTheme.line.alternative }} />
          <p
            className="font-['Pretendard'] text-lg font-medium leading-[1.3]"
            style={{ color: lightTheme.label.assistive }}
          >
            {isEditingEmployee ? (
              "직원 정보와 권한을 수정합니다."
            ) : (
              <>
                *가입된 계정 ID로 매장 디자이너 초대를
                <br />
                발송합니다.
              </>
            )}
          </p>
        </div>

        <div className="mt-8 flex min-h-0 flex-1 flex-col pb-14">
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-x-3 gap-y-4">
              <label className="flex flex-col gap-2">
                <span
                  className="pl-2.75 font-['Pretendard'] text-lg font-semibold leading-[1.3]"
                  style={{ color: lightTheme.label.assistive }}
                >
                  이름
                </span>
                <input
                  className="h-10 rounded-[0.625rem] border bg-white px-4 font-['Pretendard'] text-lg font-medium leading-[1.3] outline-none"
                  placeholder="이름 입력"
                  style={{
                    borderColor: lightTheme.line.alternative,
                    color: lightTheme.label.neutral,
                  }}
                  value={employeeName}
                  onChange={event => onChangeEmployeeName(event.target.value)}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span
                  className="pl-2.75 font-['Pretendard'] text-lg font-semibold leading-[1.3]"
                  style={{ color: lightTheme.label.assistive }}
                >
                  등록일
                </span>
                <input
                  className="h-10 rounded-[0.625rem] border bg-white px-4 font-['Pretendard'] text-lg font-medium leading-[1.3] outline-none"
                  placeholder="YYYY.MM.DD"
                  style={{
                    borderColor: lightTheme.line.alternative,
                    color: lightTheme.label.neutral,
                  }}
                  value={employeeRegisteredAt}
                  onChange={event => onChangeEmployeeRegisteredAt(event.target.value)}
                />
              </label>
              <label className="col-span-2 flex flex-col gap-2">
                <span
                  className="pl-2.75 font-['Pretendard'] text-lg font-semibold leading-[1.3]"
                  style={{ color: lightTheme.label.assistive }}
                >
                  연락처
                </span>
                <input
                  className="h-10 rounded-[0.625rem] border bg-white px-4 font-['Pretendard'] text-lg font-medium leading-[1.3] outline-none"
                  placeholder="연락처 입력"
                  style={{
                    borderColor: lightTheme.line.alternative,
                    color: lightTheme.label.neutral,
                  }}
                  value={employeePhone}
                  onChange={event => onChangeEmployeePhone(event.target.value)}
                />
              </label>
            </div>

            <div className="flex flex-col gap-4">
              <label
                className="pl-2.75 font-['Pretendard'] text-lg font-semibold leading-[1.3]"
                style={{ color: lightTheme.label.assistive }}
              >
                계정 ID
              </label>
              <div className="flex h-11 gap-2">
                <input
                  className="min-w-0 flex-1 rounded-[0.625rem] border bg-white px-5.25 font-['Pretendard'] text-lg font-medium leading-[1.3] outline-none"
                  placeholder="계정 ID 입력"
                  style={{
                    borderColor: lightTheme.line.alternative,
                    color: lightTheme.label.neutral,
                  }}
                  value={accountId}
                  onChange={event => onChangeAccountId(event.target.value)}
                />
                <button
                  type="button"
                  className="w-22.5 rounded-[0.625rem] font-['Pretendard'] text-base font-medium leading-[1.3]"
                  style={{
                    backgroundColor: lightTheme.line.alternative,
                    color: lightTheme.line.normal,
                  }}
                  onClick={onCheckAccountId}
                >
                  중복 확인
                </button>
              </div>
              <p
                className="h-5.5 overflow-hidden whitespace-nowrap pl-2.75 font-['Pretendard'] text-base font-medium leading-[1.3]"
                style={{ color: lightTheme.label.assistive }}
              >
                {accountIdMessage}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <span
                className="pl-2.75 font-['Pretendard'] text-lg font-semibold leading-[1.3]"
                style={{ color: lightTheme.label.assistive }}
              >
                권한 선택
              </span>
              <div className="flex flex-col gap-2.5">
                {permissionOptions.map(option => (
                  <button
                    key={option.id}
                    type="button"
                    className="relative flex h-11 w-full items-center rounded-[0.625rem] border px-4 transition-colors hover:bg-[#FAFAFA]"
                    style={{
                      borderColor: option.selected
                        ? lightTheme.primary.normal
                        : lightTheme.line.alternative,
                      color: option.selected ? lightTheme.primary.normal : lightTheme.label.neutral,
                      backgroundColor: option.selected ? "#F5FCF9" : lightTheme.background.normal,
                    }}
                    onClick={() => onSelectPermissionRole(option.id)}
                  >
                    <span className="min-w-0 flex-1 text-left">
                      <span
                        className="block truncate font-['Pretendard'] text-lg font-medium leading-[1.3]"
                        style={{
                          color: option.selected
                            ? lightTheme.primary.normal
                            : lightTheme.label.alternative,
                        }}
                      >
                        {option.label}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-7.25 flex justify-end gap-3">
            <button
              type="button"
              className="h-8 w-22.5 rounded-md font-['Pretendard'] text-lg font-semibold leading-[1.3]"
              style={{
                backgroundColor: lightTheme.background.neutral,
                color: lightTheme.line.normal,
              }}
              onClick={onCancelPermissionForm}
            >
              취소
            </button>
            <button
              type="button"
              className="h-8 w-22.5 rounded-md font-['Pretendard'] text-lg font-semibold leading-[1.3]"
              style={{ backgroundColor: lightTheme.primary.normal, color: lightTheme.fill.normal }}
              onClick={onSubmitPermissionForm}
            >
              {isEditingEmployee ? "수정" : "등록"}
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
    totalEmployeeCount,
    isLoading,
    emptyMessage,
    searchQuery,
    openRoleMenuRowId,
    employeeName,
    employeePhone,
    employeeRegisteredAt,
    accountId,
    accountIdMessage,
    isEditingEmployee,
    permissionOptions,
    onChangeSearchQuery,
    onToggleRoleMenu,
    onSelectRole,
    onDeleteEmployee,
    onStartEditEmployee,
    onChangeEmployeeName,
    onChangeEmployeePhone,
    onChangeEmployeeRegisteredAt,
    onChangeAccountId,
    onCheckAccountId,
    onSelectPermissionRole,
    onCancelPermissionForm,
    onSubmitPermissionForm,
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
            className="flex flex-col gap-8"
            style={{
              boxSizing: "border-box",
              width: `${layoutWidthRem}rem`,
              height: `${layoutHeightRem}rem`,
              paddingTop: `${EMPLOYEE_CONTENT_TOP_OFFSET_REM}rem`,
              paddingBottom: `${EMPLOYEE_CONTENT_BOTTOM_OFFSET_REM}rem`,
            }}
          >
            <div className="flex items-center gap-3">
              <h1
                className="font-['Pretendard'] text-[2rem] font-bold leading-[1.3]"
                style={{ color: lightTheme.label.neutral }}
              >
                직원 권한 관리
              </h1>
              <span
                className="font-['Pretendard'] text-xl font-medium leading-[1.3]"
                style={{ color: lightTheme.label.assistive }}
              >
                총 직원 {totalEmployeeCount}명
              </span>
            </div>

            <div className="grid flex-1 grid-cols-[minmax(0,1fr)_30.4375rem] gap-4">
              <EmployeeTable
                employees={employees}
                searchQuery={searchQuery}
                isLoading={isLoading}
                emptyMessage={emptyMessage}
                openRoleMenuRowId={openRoleMenuRowId}
                onChangeSearchQuery={onChangeSearchQuery}
                onToggleRoleMenu={onToggleRoleMenu}
                onSelectRole={onSelectRole}
                onDeleteEmployee={onDeleteEmployee}
                onStartEditEmployee={onStartEditEmployee}
              />
              <PermissionPanel
                employeeName={employeeName}
                employeePhone={employeePhone}
                employeeRegisteredAt={employeeRegisteredAt}
                accountId={accountId}
                accountIdMessage={accountIdMessage}
                isEditingEmployee={isEditingEmployee}
                permissionOptions={permissionOptions}
                onChangeEmployeeName={onChangeEmployeeName}
                onChangeEmployeePhone={onChangeEmployeePhone}
                onChangeEmployeeRegisteredAt={onChangeEmployeeRegisteredAt}
                onChangeAccountId={onChangeAccountId}
                onCheckAccountId={onCheckAccountId}
                onSelectPermissionRole={onSelectPermissionRole}
                onCancelPermissionForm={onCancelPermissionForm}
                onSubmitPermissionForm={onSubmitPermissionForm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EmployeePage };
