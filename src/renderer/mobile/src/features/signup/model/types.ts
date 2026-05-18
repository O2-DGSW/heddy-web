export type MemberType = 'customer' | 'owner';

export type SignupStep = 'type-select' | 'terms' | 'account' | 'shop';

export type Carrier = 'SKT' | 'KT' | 'LG U+' | '알뜰폰';

export type CustomerAccountForm = {
  id: string;
  password: string;
  passwordConfirm: string;
  carrier: Carrier;
  phone: string;
  verificationCode: string;
};

export type OwnerAccountForm = {
  email: string;
  password: string;
  passwordConfirm: string;
  representativeName: string;
  carrier: Carrier;
  phone: string;
  verificationCode: string;
};

export type ShopForm = {
  shopName: string;
  address: string;
  addressDetail: string;
  categories: string[];
  landline: string;
  businessNumber: string;
};