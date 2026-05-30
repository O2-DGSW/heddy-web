// 만들어 놓은 기능들을 종합하여 라우팅 및 페이지 구성을 하는 파일입니다

import { Route, Routes } from "react-router-dom";

import { CutsLayout, ProcedureNoteList, PublicSettings, QrReading, QrCode } from "@/features/cuts";

export const ProcedureNotePage = () => {
  return (
    <CutsLayout>
      <Routes>
        <Route index element={<ProcedureNoteList />} />
        <Route path="qr-reading" element={<QrReading />} />
        <Route path="qr-code/:description" element={<QrCode />} />
        <Route path="public" element={<PublicSettings />} />
      </Routes>
    </CutsLayout>
  );
};
