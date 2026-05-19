import { useState } from 'react';
import type { MemberType, SignupStep, CustomerAccountForm, OwnerAccountForm, ShopForm } from './types';

export const useSignup = () => {
  const [step, setStep] = useState<SignupStep>('type-select');
  const [memberType, setMemberType] = useState<MemberType | null>(null);

  const [customerForm, setCustomerForm] = useState<CustomerAccountForm>({
    id: '',
    password: '',
    passwordConfirm: '',
    carrier: 'SKT',
    phone: '',
    verificationCode: '',
  });

  const [ownerForm, setOwnerForm] = useState<OwnerAccountForm>({
    id: '',
    password: '',
    passwordConfirm: '',
    representativeName: '',
    carrier: 'SKT',
    phone: '',
    verificationCode: '',
  });

  const [shopForm, setShopForm] = useState<ShopForm>({
    shopName: '',
    address: '',
    addressDetail: '',
    categories: [],
    landline: '',
    businessNumber: '',
  });

  const selectMemberType = (type: MemberType) => {
    setMemberType(type);
    setStep('account');
  };

  const nextStep = () => {
    if (step === 'account' && memberType === 'owner') setStep('shop');
    else if (step === 'account') setStep('terms');
    // TODO: API 연동 후 회원가입 완료 처리
  };

  return {
    step,
    memberType,
    customerForm,
    setCustomerForm,
    ownerForm,
    setOwnerForm,
    shopForm,
    setShopForm,
    selectMemberType,
    nextStep,
  };
};