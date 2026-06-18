import { api } from "@/shared/api";
import { getAccessToken } from "@/entities/auth/model/token";

export const setupInterceptor = () => {
  api.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};
