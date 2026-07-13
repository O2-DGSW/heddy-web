import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { loginApi } from "@/entities/auth/api/authApi";
import { setAccessToken } from "@/entities/auth/model/token";
import { showErrorToast } from "@/lib/toast";

const getSafeRedirectPath = (value: string | null) => {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }

  if (value.startsWith("/login") || value.startsWith("/signup")) {
    return "/";
  }

  return value;
};

export const useLoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    if (!id.trim() || !password.trim()) {
      showErrorToast("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const { accessToken } = await loginApi({ loginId: id, password });
      const redirectPath = getSafeRedirectPath(
        new URLSearchParams(location.search).get("redirect")
      );

      setAccessToken(accessToken);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      if (err instanceof Error) {
        showErrorToast(err.message);
      } else {
        showErrorToast("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { id, setId, password, setPassword, isLoading, handleLogin };
};
