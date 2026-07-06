interface AddProcedureNoteFormValues {
  phoneNumber: string;
  price: string;
  treatmentDate: string;
}

export const validateAddProcedureNoteForm = ({
  phoneNumber,
  price,
  treatmentDate,
}: AddProcedureNoteFormValues): boolean => {
  const digits = phoneNumber.replace(/\D/g, "");
  return digits.length >= 10 && price.trim() !== "" && Number(price) > 0 && treatmentDate !== "";
};
