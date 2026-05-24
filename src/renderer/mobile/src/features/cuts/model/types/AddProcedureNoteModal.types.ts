/** 시술기록 추가 폼 데이터 */
export interface AddProcedureNoteForm {
  title: string;
  description: string;
  date: Date;
  tags: string;
  image: File | null;
}

/** AddProcedureNoteModal 컴포넌트 props */
export interface AddProcedureNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: AddProcedureNoteForm;
  onChangeTitle: (value: string) => void;
  onChangeDescription: (value: string) => void;
  onChangeDate: (date: Date) => void;
  onChangeTags: (value: string) => void;
  onChangeImage: (file: File | null) => void;
  onSubmit: () => void;
}

/** 저장된 시술기록 도메인 타입 */
export interface ProcedureNote {
  id: string;
  /** TODO: 서버 연결 시 동적으로 처리 */
  customerName: string;
  title: string;
  description: string;
  date: Date;
  tags: string;
  imageUrl: string | null;
}

/** useAddProcedureNote 훅 반환 타입 */
export interface UseAddProcedureNoteReturn {
  notes: ProcedureNote[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  form: AddProcedureNoteForm;
  onChangeTitle: (value: string) => void;
  onChangeDescription: (value: string) => void;
  onChangeDate: (date: Date) => void;
  onChangeTags: (value: string) => void;
  onChangeImage: (file: File | null) => void;
  onSubmit: () => void;
}