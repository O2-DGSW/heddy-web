import { api } from "@/shared/api";
import { getAccessToken } from "@/entities/auth/model/token";

export const setupAuthInterceptor = () => {
  api.interceptors.request.use(async (config) => {
    if (config.url?.includes("/auth/login")) return config;

    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};
