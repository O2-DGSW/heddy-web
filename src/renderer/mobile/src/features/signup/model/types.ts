export type MemberType = "customer" | "owner";

export type SignupStep = "type-select" | "terms" | "account" | "shop";

export type MainCarrier = "SKT" | "KT" | "LG U+";
export type MvnoCarrier = "SKT 알뜰폰" | "KT 알뜰폰" | "LGU+ 알뜰폰";
export type Carrier = MainCarrier | MvnoCarrier;

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
