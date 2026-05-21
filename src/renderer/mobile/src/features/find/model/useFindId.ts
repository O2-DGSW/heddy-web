import { useState } from 'react';
import { formatPhone } from '@/private/shared/utils/formatPhone';

export const useFindId = () => {
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const canRequestVerification = phone.length >= 13;

  const handlePhoneChange = (value: string) => {
    setPhone(formatPhone(value));
  };

  return {
    phone,
    verificationCode,
    canRequestVerification,
    handlePhoneChange,
    setVerificationCode,
  };
};