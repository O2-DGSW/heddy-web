import { api } from "@/shared/api";
import type { LoginRequest, LoginResponse } from "@/entities/auth/model/auth.types";

type AuthApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  error: { code: string; message: string } | null;
};

export const loginApi = async (body: LoginRequest): Promise<LoginResponse> => {
  const res = await api.post<AuthApiResponse<LoginResponse>>("/auth/login", body);
  if (!res.data.success) {
    throw new Error(res.data.error?.message || res.data.message || "로그인에 실패했습니다.");
  }
  return res.data.data;
};

export const refreshTokenApi = async (): Promise<LoginResponse> => {
  const res = await api.post<AuthApiResponse<LoginResponse>>("/auth/token/refresh");
  if (!res.data.success) {
    throw new Error(res.data.error?.message || res.data.message || "토큰 재발급에 실패했습니다.");
  }
  return res.data.data;
};
