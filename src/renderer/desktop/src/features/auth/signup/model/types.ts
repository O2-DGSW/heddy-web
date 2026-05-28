export type SignupStep = "terms" | "account" | "shop";

export type MainCarrier = "SKT" | "KT" | "LG U+";
export type MvnoCarrier = "SKT 알뜰폰" | "KT 알뜰폰" | "LGU+ 알뜰폰";
export type Carrier = MainCarrier | MvnoCarrier;

export type OwnerAccountFormValues = {
  id: string;
  password: string;
  passwordConfirm: string;
  representativeName: string;
  carrier: Carrier;
  phone: string;
  verificationCode: string;
};

export type OwnerShopFormValues = {
  shopName: string;
  address: string;
  addressDetail: string;
  category: string;
  landline: string;
  businessNumber: string;
};
