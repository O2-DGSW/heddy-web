type EmployeeRole = "director" | "designer";

interface EmployeeRow {
  id: number;
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

interface EmployeeTableProps {
  employees: EmployeeRow[];
}

interface PermissionPanelProps {
  permissionOptions: PermissionOption[];
}

export type {
  EmployeeRole,
  EmployeeRow,
  EmployeeTableProps,
  PermissionOption,
  PermissionPanelProps,
};
