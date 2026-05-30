// 만들어 놓은 기능들을 종합하여 라우팅 및 페이지 구성을 하는 파일입니다

import { Route, Routes } from "react-router-dom";

import { ShopLayout, ShopInfo, ReservationList } from "@/features/shop";

export const ShopPage = () => {
  return (
    <ShopLayout>
      <Routes>
        <Route index element={<ShopInfo />} />
        <Route path="reservation" element={<ReservationList />} />
        <Route path="schedule" element={null} />
      </Routes>
    </ShopLayout>
  );
};