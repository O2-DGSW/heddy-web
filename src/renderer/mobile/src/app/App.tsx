import { useEffect } from "react";
import { HashRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { restoreAuthSession } from "@/entities/auth/model/session";
import { setupInterceptor } from "@/private/shared/api/interceptor";

setupInterceptor();

const shouldRestoreAuthSession = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const path = window.location.hash.replace(/^#/, "") || "/";
  return (
    !["/login", "/signup"].includes(path) &&
    !path.startsWith("/find/")
  );
};

const App = () => {
  useEffect(() => {
    if (!shouldRestoreAuthSession()) {
      return;
    }

    void restoreAuthSession();
  }, []);

  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
};

export default App;
