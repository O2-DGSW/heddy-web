import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { getAccessToken } from "@/entities/auth/model/token";
import { showErrorToast } from "@/lib/toast";

const LOGIN_REQUIRED_TOAST_ID = "desktop-login-required-toast";

const getSafeRedirectPath = (value: string | null) => {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }

  if (value.startsWith("/login") || value.startsWith("/signup")) {
    return "/";
  }

  return value;
};

const useIsAuthenticated = () => Boolean(getAccessToken());

export const ProtectedRoute = () => {
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      return;
    }
    showErrorToast("로그인이 필요한 페이지입니다.", {
      toastId: LOGIN_REQUIRED_TOAST_ID,
    });
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    const redirectPath = `${location.pathname}${location.search}${location.hash}`;
    return <Navigate to={`/login?redirect=${encodeURIComponent(redirectPath)}`} replace />;
  }

  return <Outlet />;
};

export const PublicOnlyRoute = () => {
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();
  const redirectPath = getSafeRedirectPath(new URLSearchParams(location.search).get("redirect"));

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
