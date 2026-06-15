export type ProcedureUploadSlot = "before" | "after";

export interface ProcedureCustomer {
  id: number;
  name: string;
  avatar: string;
  tags: string[];
  date: string;
  time: string;
}

export interface ProcedureDesigner {
  id: string;
  name: string;
}

export interface ProcedureTag {
  id: string;
  label: string;
  selected: boolean;
}

export interface ProcedureCustomerPanelProps {
  customers: ProcedureCustomer[];
  query: string;
  selectedCustomerId: number;
  onQueryChange: (query: string) => void;
  onSelectCustomer: (customerId: number) => void;
}

export interface ProcedureBasicInfoPanelProps {
  procedureDate: string;
  designers: ProcedureDesigner[];
  selectedDesignerId: string;
  onProcedureDateChange: (date: string) => void;
  onDesignerChange: (designerId: string) => void;
}

export interface ProcedureRecordPanelProps {
  tags: ProcedureTag[];
  memo: string;
  imagePreviews: Record<ProcedureUploadSlot, string | null>;
  onToggleTag: (tagId: string) => void;
  onMemoChange: (memo: string) => void;
  onImageChange: (slot: ProcedureUploadSlot, file: File | null) => void;
  onCancel: () => void;
  onSave: () => void;
}
