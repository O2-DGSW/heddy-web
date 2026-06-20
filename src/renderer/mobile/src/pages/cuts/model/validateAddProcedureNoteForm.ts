interface AddProcedureNoteFormValues {
  title: string;
  description: string;
  customer: string;
  selectedTags: string[];
  beforeImageFile: File | null;
}

export const validateAddProcedureNoteForm = ({
  title,
  description,
  customer,
  selectedTags,
  beforeImageFile,
}: AddProcedureNoteFormValues): boolean => {
  return (
    title.trim() !== "" &&
    description.trim() !== "" &&
    customer.trim() !== "" &&
    selectedTags.length > 0 &&
    beforeImageFile !== null
  );
};