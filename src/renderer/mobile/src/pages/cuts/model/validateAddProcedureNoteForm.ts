interface AddProcedureNoteFormValues {
  title: string;
  description: string;
  customer: string;
  selectedTags: string[];
  beforeImage: File | null;
}

export const validateAddProcedureNoteForm = ({
  title,
  description,
  customer,
  selectedTags,
  beforeImage,
}: AddProcedureNoteFormValues): boolean => {
  return (
    title.trim() !== "" &&
    description.trim() !== "" &&
    customer.trim() !== "" &&
    selectedTags.length > 0 &&
    beforeImage !== null
  );
};