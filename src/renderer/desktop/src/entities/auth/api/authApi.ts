import { isAxiosError } from "axios";

import { api } from "@/shared/api";
import type {
  LoginRequest,
  LoginResponse,
  OwnerSignupRequest,
  SmsSendRequest,
  SmsVerifyRequest,
} from "@/entities/auth/model/auth.types";

type AuthApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
  error: { code: string; message: string } | null;
};

type MaybeAuthApiResponse = Partial<AuthApiResponse<unknown>>;

const isAuthApiResponse = (value: unknown): value is MaybeAuthApiResponse =>
  typeof value === "object" && value !== null && "success" in value;

const assertSuccessfulResponse = (value: unknown, fallbackMessage: string) => {
  if (isAuthApiResponse(value) && value.success === false) {
    throw new Error(value.error?.message || value.message || fallbackMessage);
  }
};

const getResponseErrorMessage = (value: unknown) => {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const response = value as { error?: { message?: unknown } | null; message?: unknown };
  if (typeof response.error?.message === "string") {
    return response.error.message;
  }
  if (typeof response.message === "string") {
    return response.message;
  }

  return null;
};

const getApiErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (isAxiosError(error)) {
    return getResponseErrorMessage(error.response?.data) || fallbackMessage;
  }
  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};

const postPublicAuth = async <TBody>(
  url: string,
  body: TBody,
  fallbackMessage: string,
) => {
  try {
    const res = await api.post<unknown>(url, body);
    assertSuccessfulResponse(res.data, fallbackMessage);
  } catch (error) {
    throw new Error(getApiErrorMessage(error, fallbackMessage), { cause: error });
  }
};

export const loginApi = async (body: LoginRequest): Promise<LoginResponse> => {
  const res = await api.post<AuthApiResponse<LoginResponse>>("/auth/login", body);
  if (!res.data.success) {
    throw new Error(res.data.error?.message || res.data.message || "로그인에 실패했습니다.");
  }
  return res.data.data;
};

export const sendSmsApi = async (body: SmsSendRequest): Promise<void> => {
  await postPublicAuth("/auth/sms/send", body, "인증번호 발송에 실패했습니다.");
};

export const verifySmsApi = async (body: SmsVerifyRequest): Promise<void> => {
  await postPublicAuth("/auth/sms/verify", body, "인증번호 확인에 실패했습니다.");
};

export const ownerSignupApi = async (body: OwnerSignupRequest): Promise<void> => {
  await postPublicAuth("/auth/signup/owner", body, "회원가입에 실패했습니다.");
};
