// 만들어 놓은 기능들을 종합하여 라우팅 및 페이지 구성을 하는 파일입니다

import { Route, Routes } from "react-router-dom";

import { SalonLayout } from "@/features/salon";

export const SalonPage = () => {
  return (
    <SalonLayout>
      <Routes>
        <Route index element={null} />
        <Route path="reservation" element={null} />
        <Route path="schedule" element={null} />
      </Routes>
    </SalonLayout>
  );
};