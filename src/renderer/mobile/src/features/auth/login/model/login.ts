import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginApi } from "@/entities/auth/api/authApi";
import { setAccessToken } from "@/entities/auth/model/token";

export const useLoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const { accessToken } = await loginApi({ loginId: id, password });
      await setAccessToken(accessToken);
      navigate("/");
    } catch (err) {
      console.error("로그인 실패:", err);
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return { id, setId, password, setPassword, error, isLoading, handleLogin };
};
