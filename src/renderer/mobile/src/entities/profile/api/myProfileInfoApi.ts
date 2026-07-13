import { api } from "@/shared/api";
import type { ApiResponse } from "@heddy/api";
import type { MyProfileInfoResponse } from "@/entities/profile/model/MyProfileInfo.types.ts";

export const myProfileInfoApi = {
  getMyProfileInfo: async () => {
    const result = await api.get<ApiResponse<MyProfileInfoResponse>>(`/users/me`);
    return result.data.data;
  },

  updateProfile: async (data: { profile_image_url?: string; push_enabled?: boolean }) => {
    const result = await api.patch<ApiResponse<unknown>>(`/users/me`, data);
    return result.data;
  },

  updatePhone: async (phoneNumber: string) => {
    const result = await api.patch<ApiResponse<unknown>>(`/users/me/phone`, { phoneNumber });
    return result.data;
  },

  updatePassword: async (currentPassword: string, newPassword: string) => {
    const result = await api.patch<ApiResponse<unknown>>(`/users/me/password`, {
      currentPassword,
      newPassword,
    });
    return result.data;
  },
};
