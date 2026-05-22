import { Route, Routes } from "react-router-dom";

import { DesktopLayout } from "./layouts";
import { FeatureNamePage } from "@/pages/featureName";
import { LoginPage } from "@/pages/login";
import { SignupTermsPage } from "@/pages/signup";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DesktopLayout />}>
        <Route path="/" element={<FeatureNamePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupTermsPage />} />
      </Route>
    </Routes>
  );
};

export { AppRoutes };
