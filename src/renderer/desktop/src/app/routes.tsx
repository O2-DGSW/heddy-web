import { Route, Routes } from "react-router-dom";

import { DesktopLayout } from "./layouts";
import { ProtectedRoute, PublicOnlyRoute } from "./routeGuards";
import { LoginPage } from "@/pages/auth/login";
import { SignupTermsPage } from "@/pages/auth/signup";
import { CustomerPage } from "@/pages/customer";
import { EmployeePage } from "@/pages/employee";
import { HomePage } from "@/pages/home";
import { ProcedurePage } from "@/pages/procedure";
import { ReservationPage } from "@/pages/reservation";
import { SchedulePage } from "@/pages/schedule";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DesktopLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/procedure" element={<ProcedurePage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
        </Route>

        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupTermsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export { AppRoutes };
