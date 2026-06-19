import { api } from "@/shared/api";
import { refreshTokenApi } from "@/entities/auth/api/authApi";
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  setAuthTokens,
} from "@/entities/auth/model/token";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshTokenRequest: ReturnType<typeof refreshTokenApi> | null = null;
let requestInterceptorId: number | null = null;
let responseInterceptorId: number | null = null;

const redirectToLogin = () => {
  if (typeof window !== "undefined" && window.location.pathname !== "/login") {
    window.location.replace("/login");
  }
};

const isAuthRequestUrl = (url?: string) => url?.includes("/auth/") ?? false;

export const setupInterceptor = () => {
  if (requestInterceptorId != null) {
    api.interceptors.request.eject(requestInterceptorId);
  }

  if (responseInterceptorId != null) {
    api.interceptors.response.eject(responseInterceptorId);
  }

  requestInterceptorId = api.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    if (token && !isAuthRequestUrl(config.url)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  responseInterceptorId = api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryableRequestConfig | undefined;
      const isUnauthorized = error.response?.status === 401;
      const isAuthRequest = isAuthRequestUrl(originalRequest?.url);

      if (!originalRequest || !isUnauthorized || originalRequest._retry || isAuthRequest) {
        return Promise.reject(error);
      }

      const refreshToken = await getRefreshToken();
      if (!refreshToken) {
        await clearAuthTokens();
        redirectToLogin();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        refreshTokenRequest ??= refreshTokenApi(refreshToken);
        const tokens = await refreshTokenRequest;
        await setAuthTokens(tokens);

        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        await clearAuthTokens();
        redirectToLogin();
        return Promise.reject(refreshError);
      } finally {
        refreshTokenRequest = null;
      }
    }
  );
};
