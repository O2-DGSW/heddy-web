import { Route, Routes } from "react-router-dom";

import { font, lightTheme } from "@design-tokens";

import { CutsTabBar, ProcedureNoteList, PublicSettings, QrCode, QrReading } from "@/features/cuts";

export const ProcedureNotePage = () => {
  return (
    <div className="flex flex-col h-full">
      <h1
        className={`pb-2 text-center ${font.headline1.bold}`}
        style={{ color: lightTheme.label.neutral }}
      >
        시술기록
      </h1>
      <CutsTabBar />
      <div className="flex-1">
        <Routes>
          <Route index element={<ProcedureNoteList />} />
          <Route path="qr-code" element={<QrCode />} />
          <Route path="qr-reading" element={<QrReading />} />
          <Route path="public" element={<PublicSettings />} />
        </Routes>
      </div>
    </div>
  );
};