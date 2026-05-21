import { Route, Routes } from "react-router-dom";

import { FeatureNamePage } from "../pages/featureName";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FeatureNamePage />} />
    </Routes>
  );
};

export { AppRoutes };
