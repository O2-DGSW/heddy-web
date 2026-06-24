import { api } from "@/shared/api";
import type { ApiResponse } from "@heddy/api";
import type { MyProfileInfoResponse } from "@/entities/profile/model/MyProfileInfo.types.ts";

export const myProfileInfoApi = {
  getMyProfileInfo: async () => {
    const result = await api.get<ApiResponse<MyProfileInfoResponse>>(`/users/me`);
    return result.data.data;
  },
};
