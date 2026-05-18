import { useNavigate } from "react-router-dom";

export const useDefaultSetting = () => {
  const navigate = useNavigate();

  // navigate
  const handleGoToBookmark = () => {
    navigate("/profile/bookmarks/styles");
  };

  const handleGoToEditInfo = () => {
    navigate("/profile/edit");
  };

  const handleGoToManagePortfolio = () => {
    navigate("/profile/portfolio");
  };

  const handleGoToAlarm = () => {
    navigate("/profile/alarm");
  };

  // navigation
  const handleNavigation = [
    handleGoToBookmark,
    handleGoToManagePortfolio,
    handleGoToEditInfo,
    handleGoToAlarm,
  ];

  return {
    handleNavigation,
  };
};
