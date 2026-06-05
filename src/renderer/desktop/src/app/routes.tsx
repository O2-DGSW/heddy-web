import { Route, Routes } from "react-router-dom";

import { DesktopLayout } from "./layouts";
import { LoginPage } from "@/pages/auth/login";
import { CustomerPage } from "@/pages/customer";
import { ReservationPage } from "@/pages/reservation";
import { SignupTermsPage } from "@/pages/auth/signup";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DesktopLayout />}>
        <Route path="/" element={<ReservationPage />} />
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupTermsPage />} />
      </Route>
    </Routes>
  );
};

export { AppRoutes };
