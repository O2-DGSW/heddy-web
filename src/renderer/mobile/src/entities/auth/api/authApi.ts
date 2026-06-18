import { api } from "@/shared/api";
import type { LoginRequest, LoginResponse } from "@/entities/auth/model/auth.types";

type AuthApiResponse = {
  success: boolean;
  message: string;
  data: LoginResponse;
  error: { code: string; message: string } | null;
};

export const loginApi = async (body: LoginRequest): Promise<LoginResponse> => {
  const res = await api.post<AuthApiResponse>("/auth/login", body);
  return res.data.data;
};
