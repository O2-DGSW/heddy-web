import { api } from "@/shared/api";
import { getAccessToken } from "@/entities/auth/model/token";

let isInitialized = false;

const PUBLIC_AUTH_PATHS = [
  "/auth/login",
  "/auth/signup/owner",
  "/auth/sms/send",
  "/auth/sms/verify",
];

const getRequestPath = (url?: string) => {
  if (!url) return "";

  try {
    return new URL(url, api.defaults.baseURL || "http://localhost").pathname;
  } catch {
    return url.split("?")[0] ?? "";
  }
};

export const setupAuthInterceptor = () => {
  if (isInitialized) return;
  isInitialized = true;

  api.interceptors.request.use(config => {
    if (PUBLIC_AUTH_PATHS.includes(getRequestPath(config.url))) return config;

    const token = getAccessToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};
