import { api } from "@/shared/api";
import { getAccessToken } from "@/entities/auth/model/token";

let isInitialized = false;

export const setupAuthInterceptor = () => {
  if (isInitialized) return;
  isInitialized = true;

  api.interceptors.request.use(config => {
    if (config.url?.includes("/auth/login")) return config;

    const token = getAccessToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};
