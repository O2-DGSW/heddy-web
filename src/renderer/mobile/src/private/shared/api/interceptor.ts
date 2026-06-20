import { api } from "@/shared/api";
import { isRefreshTokenRejectedError, refreshAuthTokens } from "@/entities/auth/model/session";
import { clearAuthTokens, getAccessToken } from "@/entities/auth/model/token";
import { AxiosHeaders, type AxiosError, type InternalAxiosRequestConfig } from "axios";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let requestInterceptorId: number | null = null;
let responseInterceptorId: number | null = null;

const redirectToLogin = () => {
  if (typeof window !== "undefined" && window.location.pathname !== "/login") {
    window.location.replace("/login");
  }
};

const REFRESH_TOKEN_PATH = "/auth/token/refresh";

const PUBLIC_AUTH_PATHS = [
  "/auth/login",
  "/auth/signup",
  "/auth/signup/owner",
  "/auth/social/signup",
  "/auth/social/signup/owner",
  "/auth/sms/send",
  "/auth/sms/verify",
  "/auth/password/reset",
];

const getRequestPath = (url?: string) => {
  if (!url) {
    return "";
  }

  try {
    return new URL(url, api.defaults.baseURL).pathname;
  } catch {
    return url.split("?")[0] ?? "";
  }
};

const isPublicAuthRequestUrl = (url?: string) => PUBLIC_AUTH_PATHS.includes(getRequestPath(url));

const isRefreshTokenRequestUrl = (url?: string) => getRequestPath(url) === REFRESH_TOKEN_PATH;

const setAuthorizationHeader = (config: InternalAxiosRequestConfig, token: string) => {
  const headers = AxiosHeaders.from(config.headers);
  headers.set("Authorization", `Bearer ${token}`);
  config.headers = headers;
};

export const setupInterceptor = () => {
  if (requestInterceptorId != null) {
    api.interceptors.request.eject(requestInterceptorId);
  }

  if (responseInterceptorId != null) {
    api.interceptors.response.eject(responseInterceptorId);
  }

  requestInterceptorId = api.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    if (token && !isPublicAuthRequestUrl(config.url) && !isRefreshTokenRequestUrl(config.url)) {
      setAuthorizationHeader(config, token);
    }
    return config;
  });

  responseInterceptorId = api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryableRequestConfig | undefined;
      const isUnauthorized = error.response?.status === 401;
      const isPublicAuthRequest = isPublicAuthRequestUrl(originalRequest?.url);
      const isRefreshTokenRequest = isRefreshTokenRequestUrl(originalRequest?.url);

      if (
        !originalRequest ||
        !isUnauthorized ||
        originalRequest._retry ||
        isPublicAuthRequest ||
        isRefreshTokenRequest
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const tokens = await refreshAuthTokens();
        if (!tokens) {
          await clearAuthTokens();
          redirectToLogin();
          return Promise.reject(error);
        }

        setAuthorizationHeader(originalRequest, tokens.accessToken);
        return api(originalRequest);
      } catch (refreshError) {
        if (isRefreshTokenRejectedError(refreshError)) {
          redirectToLogin();
        }
        return Promise.reject(refreshError);
      }
    }
  );
};
