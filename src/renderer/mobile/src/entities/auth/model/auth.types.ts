export type LoginRequest = {
  loginId: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type SignupRequest = {
  loginId: string;
  password: string;
  name: string;
  phoneNumber: string;
};

export type SmsPurpose = "SIGNUP" | "FIND_PASSWORD";

export type SmsSendRequest = {
  phoneNumber: string;
  carrier: string;
  purpose: SmsPurpose;
};

export type SmsVerifyRequest = {
  phoneNumber: string;
  code: string;
  purpose: SmsPurpose;
};

export type SignupOwnerRequest = SignupRequest & {
  storeName: string;
  roadAddress: string;
  detailAddress: string;
  landline: string;
  storeEmail: string;
  businessNumber: string;
};
