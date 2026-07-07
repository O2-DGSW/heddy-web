import { api } from "@/shared/api";
import { clearAccessToken, getAccessToken } from "@/entities/auth/model/token";
import { markErrorToastHandled, showErrorToast } from "@/lib/toast";

let isInitialized = false;

const PUBLIC_AUTH_PATHS = [
  "/auth/login",
  "/auth/signup/owner",
  "/auth/sms/send",
  "/auth/sms/verify",
];
const PUBLIC_PAGE_PATHS = ["/login", "/signup"];
const AUTH_EXPIRED_TOAST_ID = "desktop-auth-expired-toast";

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

const getResponseErrorMessage = (value: unknown) => {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const response = value as { error?: { message?: unknown } | null; message?: unknown };
  if (typeof response.error?.message === "string") {
    return response.error.message;
  }
  if (typeof response.message === "string") {
    return response.message;
  }

  return null;
};

const getStatusErrorMessage = (status?: number) => {
  if (status === 401) {
    return "로그인이 만료되었습니다. 다시 로그인해주세요.";
  }
  if (status === 403) {
    return "접근 권한이 없습니다.";
  }
  if (status === 404) {
    return "요청한 데이터를 찾을 수 없습니다.";
  }
  if (status && status >= 500) {
    return "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }

  return "요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.";
};

const getCurrentPath = () => {
  if (typeof window === "undefined") {
    return "/";
  }

  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
};

const isPublicPagePath = (path: string) => {
  const pathname = path.split(/[?#]/)[0] || "/";

  return PUBLIC_PAGE_PATHS.includes(pathname);
};

const redirectToLogin = () => {
  if (typeof window === "undefined") {
    return;
  }

  const currentPath = getCurrentPath();

  if (isPublicPagePath(currentPath)) {
    return;
  }

  const redirectQuery = currentPath === "/" ? "" : `?redirect=${encodeURIComponent(currentPath)}`;

  window.location.replace(`/login${redirectQuery}`);
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
      const status = error?.response?.status as number | undefined;
      const requestPath = getRequestPath(error?.config?.url);
      const isPublicAuthRequest = PUBLIC_AUTH_PATHS.includes(requestPath);
      const serverMessage = getResponseErrorMessage(error?.response?.data);
      const message = serverMessage || getStatusErrorMessage(status);

      if (!error?.response) {
        showErrorToast("서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.");
        markErrorToastHandled(error);
      } else if (!isPublicAuthRequest) {
        showErrorToast(message, {
          toastId: status === 401 ? AUTH_EXPIRED_TOAST_ID : undefined,
        });
        markErrorToastHandled(error);
      }

      if (status === 401 && !isPublicAuthRequest) {
        if (getAccessToken()) {
          clearAccessToken();
          redirectToLogin();
        }
      }

      return Promise.reject(error);
    }
  );
};
