const PASSWORD_PATTERN =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_~])[a-zA-Z0-9!@#$%^&*?_~]{8,100}$/;

const PHONE_NUMBER_PATTERN = /^01[016789]\d{7,8}$/;

export const toDigits = (value: string) => value.replace(/\D/g, "");

export const isValidLoginId = (value: string) => {
  const trimmedValue = value.trim();
  return trimmedValue.length >= 4 && trimmedValue.length <= 20;
};

export const isValidPassword = (value: string) => PASSWORD_PATTERN.test(value);

export const isValidPhoneNumber = (value: string) => PHONE_NUMBER_PATTERN.test(toDigits(value));

export const isValidVerificationCode = (value: string) => /^\d{6}$/.test(value.trim());
