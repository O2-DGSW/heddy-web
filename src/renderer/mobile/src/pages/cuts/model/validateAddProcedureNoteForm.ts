interface AddProcedureNoteFormValues {
  title: string;
  description: string;
  customer: string;
  selectedTags: string[];
  beforeImageUrl: string | null;
}

export const validateAddProcedureNoteForm = ({
  title,
  description,
  customer,
  selectedTags,
  beforeImageUrl,
}: AddProcedureNoteFormValues): boolean => {
  return (
    title.trim() !== "" &&
    description.trim() !== "" &&
    customer.trim() !== "" &&
    selectedTags.length > 0 &&
    beforeImageUrl !== null
  );
};