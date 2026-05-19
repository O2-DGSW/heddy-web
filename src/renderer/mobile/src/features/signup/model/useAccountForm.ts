import { useState } from 'react';
import type { BaseAccountForm } from './types';
import { isValidPhone, isPasswordMatch } from './validation';

export const useAccountForm = (form: BaseAccountForm, extraValid: boolean, onNext: () => void) => {
  const [submitted, setSubmitted] = useState(false);

  const isValid =
    !!form.id &&
    isPasswordMatch(form.password, form.passwordConfirm) &&
    isValidPhone(form.phone) &&
    extraValid;

  const canRequestVerification =
    !!form.id &&
    isPasswordMatch(form.password, form.passwordConfirm) &&
    isValidPhone(form.phone);

  const showPasswordError = submitted && !isPasswordMatch(form.password, form.passwordConfirm);
  const showPhoneError = submitted && !isValidPhone(form.phone);

  const handleNext = () => {
    setSubmitted(true);
    if (isValid) onNext();
  };

  return { isValid, canRequestVerification, showPasswordError, showPhoneError, submitted, handleNext };
};