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

/** useAddProcedureNote 훅 반환 타입 */
export interface UseAddProcedureNoteReturn {
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