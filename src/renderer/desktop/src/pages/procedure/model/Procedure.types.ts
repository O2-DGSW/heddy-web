export type ProcedureUploadSlot = "before" | "after";

export interface ProcedureCustomer {
  id: number;
  name: string;
  phoneNumber: string;
  avatar: string;
  tags: string[];
  date: string;
  time: string;
}

export interface ProcedureDesigner {
  id: number;
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
  selectedCustomerId: number | null;
  isLoading: boolean;
  emptyMessage: string;
  onQueryChange: (query: string) => void;
  onSelectCustomer: (customerId: number) => void;
}

export interface ProcedureBasicInfoPanelProps {
  procedureDate: string;
  designers: ProcedureDesigner[];
  selectedDesignerId: number | null;
  onProcedureDateChange: (date: string) => void;
  onDesignerChange: (designerId: number) => void;
}

export interface ProcedureRecordPanelProps {
  tags: ProcedureTag[];
  memo: string;
  price: string;
  isSaving: boolean;
  saveMessage: string;
  imagePreviews: Record<ProcedureUploadSlot, string | null>;
  onToggleTag: (tagId: string) => void;
  onMemoChange: (memo: string) => void;
  onPriceChange: (price: string) => void;
  onImageChange: (slot: ProcedureUploadSlot, file: File | null) => void;
  onCancel: () => void;
  onSave: () => void;
}
