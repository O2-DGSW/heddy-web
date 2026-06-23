import { useEffect, useMemo, useRef, useState } from "react";

import {
  EMPLOYEE_CONTENT_BOTTOM_OFFSET_REM,
  EMPLOYEE_CONTENT_HEIGHT_REM,
  EMPLOYEE_CONTENT_TOP_OFFSET_REM,
  EMPLOYEE_CONTENT_WIDTH_REM,
  EMPLOYEE_PAGE_LEFT_PADDING_REM,
  EMPLOYEE_PAGE_RIGHT_PADDING_REM,
  EMPLOYEE_ROWS,
  MIN_EMPLOYEE_SCALE,
  PERMISSION_OPTIONS,
  roleMeta,
} from "./Employee.constant";
import type { EmployeeRole, EmployeeRow } from "./Employee.types";

interface EmployeeContainerSize {
  width: number;
  height: number;
}

const getRootFontSize = () => {
  if (typeof window === "undefined") {
    return 16;
  }

  const rootFontSize = window.getComputedStyle(document.documentElement)?.fontSize;

  return Number.parseFloat(rootFontSize ?? "") || 16;
};

const getFallbackContainerSize = (): EmployeeContainerSize => {
  if (typeof window === "undefined") {
    return {
      width:
        EMPLOYEE_PAGE_LEFT_PADDING_REM +
        EMPLOYEE_CONTENT_WIDTH_REM +
        EMPLOYEE_PAGE_RIGHT_PADDING_REM,
      height:
        EMPLOYEE_CONTENT_TOP_OFFSET_REM +
        EMPLOYEE_CONTENT_HEIGHT_REM +
        EMPLOYEE_CONTENT_BOTTOM_OFFSET_REM,
    };
  }

  const rootFontSize = getRootFontSize();

  return {
    width: window.innerWidth / rootFontSize,
    height: window.innerHeight / rootFontSize,
  };
};

const getAvailableContentWidth = (containerSize = getFallbackContainerSize()) => {
  return Math.max(
    0,
    containerSize.width - EMPLOYEE_PAGE_LEFT_PADDING_REM - EMPLOYEE_PAGE_RIGHT_PADDING_REM
  );
};

const getEmployeeScale = (containerSize = getFallbackContainerSize()) => {
  const availableWidth = getAvailableContentWidth(containerSize);
  const availableWidthRatio = availableWidth / EMPLOYEE_CONTENT_WIDTH_REM;
  const availableHeightRatio =
    containerSize.height /
    (EMPLOYEE_CONTENT_TOP_OFFSET_REM +
      EMPLOYEE_CONTENT_HEIGHT_REM +
      EMPLOYEE_CONTENT_BOTTOM_OFFSET_REM);
  const viewportScale = Math.min(availableWidthRatio, availableHeightRatio);

  return Math.min(1, Math.max(MIN_EMPLOYEE_SCALE, viewportScale));
};

const normalizeDirectorRole = (employees: EmployeeRow[]): EmployeeRow[] => {
  let hasDirector = false;

  return employees.map((employee): EmployeeRow => {
    if (employee.role !== "director") {
      return employee;
    }

    if (!hasDirector) {
      hasDirector = true;
      return employee;
    }

    return { ...employee, role: "designer" };
  });
};

const updateEmployeeRole = (
  employees: EmployeeRow[],
  targetEmployeeId: number,
  role: EmployeeRole
) => {
  return employees.map((employee): EmployeeRow => {
    if (employee.id === targetEmployeeId) {
      return { ...employee, role };
    }

    if (role === "director" && employee.role === "director") {
      return { ...employee, role: "designer" };
    }

    return employee;
  });
};

export const useEmployee = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(getEmployeeScale);
  const [availableContentWidthRem, setAvailableContentWidthRem] =
    useState(getAvailableContentWidth);
  const [employees, setEmployees] = useState<EmployeeRow[]>(() =>
    normalizeDirectorRole(EMPLOYEE_ROWS)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [openRoleMenuRowId, setOpenRoleMenuRowId] = useState<number | null>(null);
  const [employeeName, setEmployeeName] = useState("");
  const [employeePhone, setEmployeePhone] = useState("");
  const [employeeRegisteredAt, setEmployeeRegisteredAt] = useState("");
  const [accountId, setAccountId] = useState("");
  const [accountIdMessage, setAccountIdMessage] = useState("");
  const [selectedPermissionRole, setSelectedPermissionRole] = useState<EmployeeRole | null>(null);
  const [editingEmployeeId, setEditingEmployeeId] = useState<number | null>(null);
  const layoutHeightRem =
    EMPLOYEE_CONTENT_TOP_OFFSET_REM +
    EMPLOYEE_CONTENT_HEIGHT_REM +
    EMPLOYEE_CONTENT_BOTTOM_OFFSET_REM;

  useEffect(() => {
    const updateLayout = () => {
      const pageElement = pageRef.current;
      const rootFontSize = getRootFontSize();
      const containerSize = pageElement
        ? {
            width: pageElement.getBoundingClientRect().width / rootFontSize,
            height: pageElement.getBoundingClientRect().height / rootFontSize,
          }
        : getFallbackContainerSize();

      setAvailableContentWidthRem(getAvailableContentWidth(containerSize));
      setScale(getEmployeeScale(containerSize));
    };

    updateLayout();

    const resizeObserver = new ResizeObserver(updateLayout);

    if (pageRef.current) {
      resizeObserver.observe(pageRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const layoutWidthRem = Math.max(EMPLOYEE_CONTENT_WIDTH_REM, availableContentWidthRem / scale);
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredEmployees = useMemo(() => {
    if (normalizedSearchQuery.length === 0) {
      return employees;
    }

    return employees.filter(employee =>
      [
        employee.name,
        employee.phone,
        employee.accountId,
        employee.registeredAt,
        roleMeta[employee.role].label,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearchQuery)
    );
  }, [employees, normalizedSearchQuery]);
  const permissionOptions = PERMISSION_OPTIONS.map(option => ({
    ...option,
    selected: option.id === selectedPermissionRole,
  }));
  const hasDuplicateAccountId = (nextAccountId: string) => {
    const editingEmployee =
      editingEmployeeId === null
        ? undefined
        : employees.find(employee => employee.id === editingEmployeeId);

    if (editingEmployee?.accountId === nextAccountId) {
      return false;
    }

    return employees.some(employee => employee.accountId === nextAccountId);
  };
  const resetPermissionForm = (message = "") => {
    setEmployeeName("");
    setEmployeePhone("");
    setEmployeeRegisteredAt("");
    setAccountId("");
    setAccountIdMessage(message);
    setSelectedPermissionRole(null);
    setEditingEmployeeId(null);
  };
  const handleChangeSearchQuery = (query: string) => {
    setSearchQuery(query);
    setOpenRoleMenuRowId(null);
  };
  const handleToggleRoleMenu = (employeeId: number) => {
    setOpenRoleMenuRowId(currentEmployeeId =>
      currentEmployeeId === employeeId ? null : employeeId
    );
  };
  const handleSelectRole = (employeeId: number, role: EmployeeRole) => {
    setEmployees(currentEmployees => updateEmployeeRole(currentEmployees, employeeId, role));
    setOpenRoleMenuRowId(null);
  };
  const handleDeleteEmployee = (employeeId: number) => {
    setEmployees(currentEmployees =>
      currentEmployees.filter(employee => employee.id !== employeeId)
    );
    setOpenRoleMenuRowId(null);

    if (editingEmployeeId === employeeId) {
      resetPermissionForm();
    }
  };
  const handleStartEditEmployee = (employee: EmployeeRow) => {
    setEmployeeName(employee.name);
    setEmployeePhone(employee.phone);
    setEmployeeRegisteredAt(employee.registeredAt);
    setAccountId(employee.accountId);
    setSelectedPermissionRole(employee.role);
    setEditingEmployeeId(employee.id);
    setAccountIdMessage(`${employee.name} 님의 권한을 수정합니다.`);
    setOpenRoleMenuRowId(null);
  };
  const handleChangeAccountId = (nextAccountId: string) => {
    setAccountId(nextAccountId);
    setAccountIdMessage("");
  };
  const handleCheckAccountId = () => {
    const nextAccountId = accountId.trim();

    if (nextAccountId.length === 0) {
      setAccountIdMessage("계정 ID를 입력해주세요.");
      return;
    }

    if (selectedPermissionRole === null) {
      setAccountIdMessage("권한을 선택해주세요.");
      return;
    }

    if (hasDuplicateAccountId(nextAccountId)) {
      setAccountIdMessage("이미 등록된 계정 ID입니다.");
      return;
    }

    setAccountIdMessage("등록 가능한 계정 ID입니다.");
  };
  const handleSubmitPermissionForm = () => {
    const nextEmployeeName = employeeName.trim();
    const nextEmployeePhone = employeePhone.trim();
    const nextEmployeeRegisteredAt = employeeRegisteredAt.trim();
    const nextAccountId = accountId.trim();

    if (nextAccountId.length === 0) {
      setAccountIdMessage("계정 ID를 입력해주세요.");
      return;
    }

    if (selectedPermissionRole === null) {
      setAccountIdMessage("권한을 선택해주세요.");
      return;
    }

    if (hasDuplicateAccountId(nextAccountId)) {
      setAccountIdMessage("이미 등록된 계정 ID입니다.");
      return;
    }

    if (
      nextEmployeeName.length === 0 ||
      nextEmployeePhone.length === 0 ||
      nextEmployeeRegisteredAt.length === 0
    ) {
      setAccountIdMessage("직원 정보를 모두 입력해주세요.");
      return;
    }

    if (editingEmployeeId !== null) {
      setEmployees(currentEmployees => {
        const updatedEmployees = currentEmployees.map(employee =>
          employee.id === editingEmployeeId
            ? {
                ...employee,
                name: nextEmployeeName,
                phone: nextEmployeePhone,
                registeredAt: nextEmployeeRegisteredAt,
                accountId: nextAccountId,
              }
            : employee
        );

        return updateEmployeeRole(updatedEmployees, editingEmployeeId, selectedPermissionRole);
      });
      resetPermissionForm("수정되었습니다.");
      return;
    }

    setEmployees(currentEmployees => {
      const nextEmployeeId = Math.max(0, ...currentEmployees.map(employee => employee.id)) + 1;
      const nextEmployee: EmployeeRow = {
        id: nextEmployeeId,
        name: nextEmployeeName,
        phone: nextEmployeePhone,
        accountId: nextAccountId,
        registeredAt: nextEmployeeRegisteredAt,
        role: selectedPermissionRole,
      };

      return updateEmployeeRole(
        [...currentEmployees, nextEmployee],
        nextEmployeeId,
        selectedPermissionRole
      );
    });
    resetPermissionForm("등록되었습니다.");
  };

  return {
    pageRef,
    scale,
    layoutWidthRem,
    layoutHeightRem,
    scaledLayoutWidthRem: layoutWidthRem * scale,
    scaledLayoutHeightRem: layoutHeightRem * scale,
    employees: filteredEmployees,
    totalEmployeeCount: employees.length,
    searchQuery,
    openRoleMenuRowId,
    employeeName,
    employeePhone,
    employeeRegisteredAt,
    accountId,
    accountIdMessage,
    isEditingEmployee: editingEmployeeId !== null,
    permissionOptions,
    onChangeSearchQuery: handleChangeSearchQuery,
    onToggleRoleMenu: handleToggleRoleMenu,
    onSelectRole: handleSelectRole,
    onDeleteEmployee: handleDeleteEmployee,
    onStartEditEmployee: handleStartEditEmployee,
    onChangeEmployeeName: setEmployeeName,
    onChangeEmployeePhone: setEmployeePhone,
    onChangeEmployeeRegisteredAt: setEmployeeRegisteredAt,
    onChangeAccountId: handleChangeAccountId,
    onCheckAccountId: handleCheckAccountId,
    onSelectPermissionRole: setSelectedPermissionRole,
    onCancelPermissionForm: () => resetPermissionForm(),
    onSubmitPermissionForm: handleSubmitPermissionForm,
  };
};
