import { Route, Routes } from "react-router-dom";

import { DesktopLayout } from "./layouts";
import { CustomerPage } from "@/pages/customer";
import { EmployeePage } from "@/pages/employee";
import { HomePage } from "@/pages/home";
import { ProcedurePage } from "@/pages/procedure";
import { ReservationPage } from "@/pages/reservation";
import { SchedulePage } from "@/pages/schedule";
import { LoginPage } from "@/pages/auth/login";
import { SignupTermsPage } from "@/pages/auth/signup";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DesktopLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/procedure" element={<ProcedurePage />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupTermsPage />} />
      </Route>
    </Routes>
  );
};

export { AppRoutes };
