import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuthTokens } from "@/entities/auth/model/token";
import { logoutApi } from "@/entities/auth/api/authApi";

export const useDefaultSetting = () => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleNavigate = (alt: string) => {
    switch (alt) {
      case "bookmark":
        navigate("/profile/bookmarks/styles");
        break;
      case "portfolio":
        navigate("/profile/portfolio");
        break;
      case "setting":
        navigate("/profile/edit");
        break;
      case "alarm":
        navigate("/profile/alarm");
        break;
    }
  };

  const handleLogoutConfirm = () => setShowLogoutConfirm(true);
  const handleLogoutCancel = () => setShowLogoutConfirm(false);
  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch {
      // 서버 오류여도 로컬 토큰은 반드시 삭제
    }
    await clearAuthTokens();
    navigate("/login", { replace: true });
  };

  return {
    handleNavigate,
    handleLogoutConfirm,
    showLogoutConfirm,
    handleLogoutCancel,
    handleLogout,
  };
};
