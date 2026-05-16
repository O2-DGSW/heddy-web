import { lightTheme } from "@design-tokens";

import { FieldOfTopProfile } from "@/features/profile/ui/default/FieldOfTopProfile.tsx";
import { FieldOfSetting } from "@/features/profile/ui/default/FieldOfSetting.tsx";
import { Route, Routes } from "react-router-dom";

export const ProfilePage = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div id="wrapper" className="flex flex-col min-h-dvh">
            <div className="h-[14rem]">
              <FieldOfTopProfile />
            </div>
            <div className="flex-1" style={{ backgroundColor: lightTheme.fill.normal }}>
              <FieldOfSetting />
            </div>
          </div>
        }
      />
      <Route path="/bookmarks/styles" element={<></>} />
      <Route
        path="/edit"
        element={
          <div id="wrapper" className="flex flex-col min-h-dvh">
            <div className="h-[14rem]">
              <FieldOfTopProfile />
            </div>
            <div className="flex-1" style={{ backgroundColor: lightTheme.fill.normal }}>
              <FieldOfSetting />
            </div>
          </div>
        }
      />
      <Route path="/portfolio" element={<></>} />
      <Route path="/alarm" element={<></>} />
    </Routes>
  );
};
