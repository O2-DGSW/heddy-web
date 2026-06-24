type EmployeeRole = "director" | "designer";

interface EmployeeRow {
  id: number;
  designerId?: number;
  name: string;
  phone: string;
  accountId: string;
  registeredAt: string;
  role: EmployeeRole;
}

interface PermissionOption {
  id: EmployeeRole;
  label: string;
  image: string;
  selected: boolean;
}

interface RoleBadgeProps {
  role: EmployeeRole;
  menuPlacement?: "top" | "bottom";
  isOpen: boolean;
  onToggle: () => void;
  onSelectRole: (role: EmployeeRole) => void;
}

interface EmployeeTableProps {
  employees: EmployeeRow[];
  searchQuery: string;
  isLoading: boolean;
  emptyMessage: string;
  openRoleMenuRowId: number | null;
  onChangeSearchQuery: (query: string) => void;
  onToggleRoleMenu: (employeeId: number) => void;
  onSelectRole: (employeeId: number, role: EmployeeRole) => void;
  onDeleteEmployee: (employeeId: number) => void;
  onStartEditEmployee: (employee: EmployeeRow) => void;
}

interface PermissionPanelProps {
  employeeName: string;
  employeePhone: string;
  employeeRegisteredAt: string;
  accountId: string;
  accountIdMessage: string;
  isEditingEmployee: boolean;
  permissionOptions: PermissionOption[];
  onChangeEmployeeName: (name: string) => void;
  onChangeEmployeePhone: (phone: string) => void;
  onChangeEmployeeRegisteredAt: (registeredAt: string) => void;
  onChangeAccountId: (accountId: string) => void;
  onCheckAccountId: () => void;
  onSelectPermissionRole: (role: EmployeeRole) => void;
  onCancelPermissionForm: () => void;
  onSubmitPermissionForm: () => void;
}

export type {
  EmployeeRole,
  EmployeeRow,
  EmployeeTableProps,
  PermissionOption,
  PermissionPanelProps,
  RoleBadgeProps,
};
