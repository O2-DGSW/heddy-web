import { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { MobileLayout } from "./layouts";
import { restoreAuthSession } from "@/entities/auth/model/session";
import { MainPage } from "@/pages/main";
import { LoginPage } from "@/pages/auth/login";
import { SignupPage } from "@/pages/auth/signup";
import { ProfilePage } from "@/pages/profile";
import { FindPage } from "@/pages/auth/find";
import { ProcedureNotePage } from "@/pages/cuts";
import { ReservationPage } from "@/pages/reservation";
import { ShopPage } from "@/pages/shop";
import { AddProcedureNotePage, CustomerSearchPage } from "@/pages/cuts";

type AuthStatus = "checking" | "authenticated" | "unauthenticated";

const RequireAuth = () => {
  const location = useLocation();
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");

  useEffect(() => {
    let isMounted = true;
    setAuthStatus("checking");

    void restoreAuthSession().then((isAuthenticated) => {
      if (!isMounted) {
        return;
      }

      setAuthStatus(isAuthenticated ? "authenticated" : "unauthenticated");
    });

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  if (authStatus === "checking") {
    return null;
  }

  if (authStatus === "unauthenticated") {
    return <Navigate replace to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MobileLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/find/:type" element={<FindPage />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile/*" element={<ProfilePage />} />
          <Route path="/cuts/add" element={<AddProcedureNotePage />} />
          <Route path="/cuts/customer-search" element={<CustomerSearchPage />} />
          <Route path="/cuts/*" element={<ProcedureNotePage />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/shop/*" element={<ShopPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Route>
    </Routes>
  );
};
