import { Routes, Route, Navigate } from "react-router-dom";
import { MobileLayout } from "./layouts";
import { MainPage } from "@/pages/main";
import { LoginPage } from "@/pages/auth/login";
import { SignupPage } from "@/pages/auth/signup";
import { ProfilePage } from "@/pages/profile";
import { FindPage } from "@/pages/auth/find";
import { ProcedureNotePage } from "@/pages/cuts";
import { ReservationPage } from "@/pages/reservation";
import { ShopPage } from "@/pages/shop";
import { AddProcedureNotePage } from "@/pages/cuts";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MobileLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile/*" element={<ProfilePage />} />
        <Route path="/find/:type" element={<FindPage />} />
        <Route path="/cuts/add" element={<AddProcedureNotePage />} />
        <Route path="/cuts/*" element={<ProcedureNotePage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/shop/*" element={<ShopPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  );
};
