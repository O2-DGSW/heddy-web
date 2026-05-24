// 만들어 놓은 기능들을 종합하여 라우팅 및 페이지 구성을 하는 파일입니다

import { Route, Routes } from "react-router-dom";

import { CutsLayout, ProcedureNoteList, PublicSettings, QrCode, QrReading } from "@/features/cuts";

export const ProcedureNotePage = () => {
  return (
    <CutsLayout>
      <Routes>
        <Route index element={<ProcedureNoteList />} />
        <Route path="qr-code" element={<QrCode />} />
        <Route path="qr-reading" element={<QrReading />} />
        <Route path="public" element={<PublicSettings />} />
      </Routes>
    </CutsLayout>
  );
};