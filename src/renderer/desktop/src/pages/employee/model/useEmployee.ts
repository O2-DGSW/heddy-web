import { useEffect, useMemo, useRef, useState } from "react";

import {
  getShopDetail,
  inviteDesigner,
  removeDesigner,
  type DesignerResponse,
} from "@/entities/employee/api/employeeApi";
import { getMe } from "@/entities/user/api/userApi";
import {
  EMPLOYEE_CONTENT_BOTTOM_OFFSET_REM,
  EMPLOYEE_CONTENT_HEIGHT_REM,
  EMPLOYEE_CONTENT_TOP_OFFSET_REM,
  EMPLOYEE_CONTENT_WIDTH_REM,
  EMPLOYEE_PAGE_LEFT_PADDING_REM,
  EMPLOYEE_PAGE_RIGHT_PADDING_REM,
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

const normalizeAccountId = (accountId: string) => accountId.trim().toLowerCase();

const getDesignerAccountId = (designer: DesignerResponse) => {
  const loginId = designer.login_id?.trim();

  if (loginId) {
    return loginId;
  }

  // getShopDetail may not include login_id yet; this fallback is the DB designer ID, not the login ID.
  return String(designer.designer_id);
};

const mapDesignerToEmployee = (designer: DesignerResponse): EmployeeRow => ({
  id: designer.designer_id,
  designerId: designer.designer_id,
  name: designer.name || `디자이너 ${designer.designer_id}`,
  phone: "-",
  accountId: getDesignerAccountId(designer),
  registeredAt: "-",
  role: "designer",
});

const getEmployeeErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (!(error instanceof Error)) {
    return fallbackMessage;
  }

  if (error.message.includes("401")) {
    return "로그인 후 직원 정보를 확인해주세요.";
  }

  return error.message;
};

export const useEmployee = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(getEmployeeScale);
  const [availableContentWidthRem, setAvailableContentWidthRem] =
    useState(getAvailableContentWidth);
  const [shopId, setShopId] = useState<number | null>(null);
  const [employees, setEmployees] = useState<EmployeeRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [emptyMessage, setEmptyMessage] = useState("직원 정보가 없습니다");
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

  useEffect(() => {
    let ignore = false;

    const loadMe = async () => {
      setIsLoading(true);

      try {
        const me = await getMe();
        const firstShopId = me.shopMembers[0]?.shopId;

        if (!firstShopId) {
          throw new Error("연결된 매장이 없습니다");
        }

        if (!ignore) {
          setShopId(firstShopId);
          setEmptyMessage("직원 정보가 없습니다");
        }
      } catch (error) {
        if (!ignore) {
          setEmployees([]);
          setEmptyMessage(getEmployeeErrorMessage(error, "사용자 정보를 불러오지 못했습니다."));
          setIsLoading(false);
        }
      }
    };

    loadMe();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (shopId === null) {
      return;
    }

    let ignore = false;

    const loadEmployees = async () => {
      setIsLoading(true);

      try {
        const shop = await getShopDetail(shopId);

        if (!ignore) {
          setEmployees(shop.designers.map(mapDesignerToEmployee));
          setEmptyMessage("직원 정보가 없습니다");
        }
      } catch (error) {
        if (!ignore) {
          setEmployees([]);
          setEmptyMessage(getEmployeeErrorMessage(error, "직원 정보를 불러오지 못했습니다."));
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadEmployees();

    return () => {
      ignore = true;
    };
  }, [shopId]);

  const layoutWidthRem = Math.max(EMPLOYEE_CONTENT_WIDTH_REM, availableContentWidthRem / scale);
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredEmployees = useMemo(() => {
    if (normalizedSearchQuery.length === 0) {
      return employees;
    }

    const queryWithoutHyphen = normalizedSearchQuery.replace(/-/g, "");

    return employees.filter(employee => {
      const searchString = [
        employee.name,
        employee.phone,
        employee.accountId,
        employee.registeredAt,
        roleMeta[employee.role].label,
      ]
        .join(" ")
        .toLowerCase();

      return (
        searchString.includes(normalizedSearchQuery) ||
        (queryWithoutHyphen.length > 0 &&
          searchString.replace(/-/g, "").includes(queryWithoutHyphen))
      );
    });
  }, [employees, normalizedSearchQuery]);
  const permissionOptions = PERMISSION_OPTIONS.map(option => ({
    ...option,
    selected: option.id === selectedPermissionRole,
  }));
  const hasDuplicateAccountId = (nextAccountId: string) => {
    const normalizedNextAccountId = normalizeAccountId(nextAccountId);
    const editingEmployee =
      editingEmployeeId === null
        ? undefined
        : employees.find(employee => employee.id === editingEmployeeId);

    if (
      editingEmployee &&
      normalizeAccountId(editingEmployee.accountId) === normalizedNextAccountId
    ) {
      return false;
    }

    return employees.some(
      employee => normalizeAccountId(employee.accountId) === normalizedNextAccountId
    );
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
    setAccountIdMessage("서버에 권한 변경 API가 없어 화면에만 반영되었습니다.");
  };
  const handleDeleteEmployee = async (employeeId: number) => {
    setOpenRoleMenuRowId(null);

    const employee = employees.find(currentEmployee => currentEmployee.id === employeeId);

    if (!employee) {
      return;
    }

    if (shopId === null || employee.designerId === undefined) {
      setAccountIdMessage("서버에 연결된 직원만 삭제할 수 있습니다.");
      return;
    }

    try {
      await removeDesigner(shopId, employee.designerId);
      setEmployees(currentEmployees =>
        currentEmployees.filter(currentEmployee => currentEmployee.id !== employeeId)
      );

      if (editingEmployeeId === employeeId) {
        resetPermissionForm();
      } else {
        setAccountIdMessage("삭제되었습니다.");
      }
    } catch (error) {
      setAccountIdMessage(getEmployeeErrorMessage(error, "직원을 삭제하지 못했습니다."));
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

    if (editingEmployeeId === null && selectedPermissionRole !== "designer") {
      setAccountIdMessage("서버는 디자이너 초대만 지원합니다.");
      return;
    }

    if (hasDuplicateAccountId(nextAccountId)) {
      setAccountIdMessage("이미 등록된 계정 ID입니다.");
      return;
    }

    setAccountIdMessage(
      editingEmployeeId === null
        ? "초대 요청 시 서버에서 계정 ID를 확인합니다."
        : "사용 가능한 계정 ID입니다."
    );
  };
  const handleSubmitPermissionForm = async () => {
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

    if (editingEmployeeId !== null) {
      const nextEmployeeName = employeeName.trim();
      const nextEmployeePhone = employeePhone.trim();
      const nextEmployeeRegisteredAt = employeeRegisteredAt.trim();

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
      resetPermissionForm("서버에 직원 수정 API가 없어 화면에만 반영되었습니다.");
      return;
    }

    if (selectedPermissionRole !== "designer") {
      setAccountIdMessage("서버는 디자이너 초대만 지원합니다.");
      return;
    }

    if (shopId === null) {
      setAccountIdMessage("연결된 매장이 없습니다.");
      return;
    }

    setAccountIdMessage("");

    try {
      await inviteDesigner(shopId, nextAccountId);
      const shop = await getShopDetail(shopId);

      setEmployees(shop.designers.map(mapDesignerToEmployee));
      resetPermissionForm("초대가 발송되었습니다.");
    } catch (error) {
      setAccountIdMessage(getEmployeeErrorMessage(error, "직원 초대에 실패했습니다."));
    }
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
    isLoading,
    emptyMessage: searchQuery.trim() ? "검색 결과가 없습니다" : emptyMessage,
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
