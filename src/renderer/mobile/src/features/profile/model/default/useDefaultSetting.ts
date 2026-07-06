import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuthTokens } from "@/entities/auth/model/token";
import { logoutApi } from "@/entities/auth/api/authApi";

export const useDefaultSetting = () => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleGoToBookmark = () => navigate("/profile/bookmarks/styles");
  const handleGoToEditInfo = () => navigate("/profile/edit");
  const handleGoToManagePortfolio = () => navigate("/profile/portfolio");
  const handleGoToAlarm = () => navigate("/profile/alarm");

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

  const handleNavigation = [
    handleGoToBookmark,
    handleGoToManagePortfolio,
    handleGoToEditInfo,
    handleGoToAlarm,
    handleLogoutConfirm,
  ];

  return {
    handleNavigation,
    showLogoutConfirm,
    handleLogoutCancel,
    handleLogout,
  };
};
