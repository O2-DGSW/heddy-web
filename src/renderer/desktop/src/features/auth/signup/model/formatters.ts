export const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;

  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
};

export const formatLandline = (value: string): string => {
  const digits = value.replace(/\D/g, "");

  if (digits.startsWith("02")) {
    const seoulDigits = digits.slice(0, 10);

    if (seoulDigits.length < 3) return seoulDigits;
    if (seoulDigits.length < 6) return `${seoulDigits.slice(0, 2)}-${seoulDigits.slice(2)}`;
    if (seoulDigits.length < 10) {
      return `${seoulDigits.slice(0, 2)}-${seoulDigits.slice(2, 5)}-${seoulDigits.slice(5)}`;
    }

    return `${seoulDigits.slice(0, 2)}-${seoulDigits.slice(2, 6)}-${seoulDigits.slice(6)}`;
  }

  const digitsWithAreaCode = digits.slice(0, 11);

  if (digitsWithAreaCode.length < 4) return digitsWithAreaCode;
  if (digitsWithAreaCode.length < 7) {
    return `${digitsWithAreaCode.slice(0, 3)}-${digitsWithAreaCode.slice(3)}`;
  }
  if (digitsWithAreaCode.length < 11) {
    return `${digitsWithAreaCode.slice(0, 3)}-${digitsWithAreaCode.slice(3, 6)}-${digitsWithAreaCode.slice(6)}`;
  }

  return `${digitsWithAreaCode.slice(0, 3)}-${digitsWithAreaCode.slice(3, 7)}-${digitsWithAreaCode.slice(7)}`;
};

export const formatBusinessNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 10);

  if (digits.length < 4) return digits;
  if (digits.length < 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;

  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
};
