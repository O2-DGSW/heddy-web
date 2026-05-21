import { Route, Routes } from "react-router-dom";

import { DesktopLayout } from "./layouts";
import { FeatureNamePage } from "@/pages/featureName";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DesktopLayout />}>
        <Route path="/" element={<FeatureNamePage />} />
      </Route>
    </Routes>
  );
};

export { AppRoutes };
