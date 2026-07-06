import { api } from "@/shared/api";
import { clearAccessToken, getAccessToken } from "@/entities/auth/model/token";

let isInitialized = false;

const PUBLIC_AUTH_PATHS = [
  "/auth/login",
  "/auth/signup/owner",
  "/auth/sms/send",
  "/auth/sms/verify",
];

const ABSOLUTE_URL_PATTERN = /^[a-z][a-z\d+\-.]*:\/\//i;

const getRequestPath = (url?: string) => {
  if (!url) return "";

  const normalizedUrl = url.trim();
  if (!normalizedUrl) return "";

  if (ABSOLUTE_URL_PATTERN.test(normalizedUrl)) {
    try {
      return new URL(normalizedUrl).pathname;
    } catch {
      return "";
    }
  }

  const [pathWithoutQuery] = normalizedUrl.split(/[?#]/);
  if (!pathWithoutQuery) return "";

  return pathWithoutQuery.startsWith("/") ? pathWithoutQuery : `/${pathWithoutQuery}`;
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

  api.interceptors.response.use(
    response => response,
    error => {
      if (error?.response?.status === 401) {
        clearAccessToken();
      }

      return Promise.reject(error);
    }
  );
};
