import { api } from "@/shared/api";

type ApiError = { code: string; message: string } | null;

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  error: ApiError;
};

export type DesignerResponse = {
  designer_id: number;
  name: string;
  profile_image_url?: string | null;
};

export type ShopDetailResponse = {
  shop_id: number;
  shop_name: string;
  address?: string | null;
  phone_number?: string | null;
  description?: string | null;
  open_hours?: string | null;
  tags?: string[];
  designers: DesignerResponse[];
  created_at?: string;
};

export type InviteDesignerResponse = {
  invite_token: string;
  expires_at: string;
};

export const getShopDetail = async (shopId: number) => {
  const res = await api.get<ApiResponse<ShopDetailResponse>>(`/shops/${shopId}`);

  if (!res.data.success) {
    throw new Error(
      res.data.error?.message || res.data.message || "매장 직원 정보를 불러오지 못했습니다."
    );
  }

  return res.data.data;
};

export const inviteDesigner = async (shopId: number, loginId: string) => {
  const res = await api.post<ApiResponse<InviteDesignerResponse>>(
    `/shops/${shopId}/designers/invite`,
    {
      login_id: loginId,
    }
  );

  if (!res.data.success) {
    throw new Error(res.data.error?.message || res.data.message || "직원 초대에 실패했습니다.");
  }

  return res.data.data;
};

export const removeDesigner = async (shopId: number, designerId: number) => {
  const res = await api.delete<ApiResponse<unknown>>(`/shops/${shopId}/designers/${designerId}`);

  if (!res.data.success) {
    throw new Error(res.data.error?.message || res.data.message || "직원을 삭제하지 못했습니다.");
  }

  return res.data.data;
};
