import { api } from "@/shared/api";

type ApiError = { code: string; message: string } | null;

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  error: ApiError;
};

export type ShopMember = {
  shopId: number;
  shopName: string;
  memberRole: string;
};

export type MeResponse = {
  userId: number;
  name: string;
  shopMembers: ShopMember[];
};

export const getMe = async () => {
  const res = await api.get<ApiResponse<MeResponse>>("/users/me");

  if (!res.data.success) {
    throw new Error(
      res.data.error?.message || res.data.message || "사용자 정보를 불러오지 못했습니다."
    );
  }

  return res.data.data;
};
