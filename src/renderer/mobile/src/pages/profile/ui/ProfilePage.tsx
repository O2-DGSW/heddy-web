import { lightTheme } from "@design-tokens";

import { Route, Routes } from "react-router-dom";

// default
import { DefaultProfile } from "@/features/profile/ui/default/DefaultProfile.tsx";
import { DefaultSetting } from "@/features/profile/ui/default/DefaultSetting.tsx";

// 회원 정보 수정
import { EditSetting } from "@/features/profile/ui/edit/EditSetting.tsx";
import { EditProfile } from "@/features/profile/ui/edit/EditProfile.tsx";

export const ProfilePage = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div id="wrapper" className="flex flex-col h-full">
            <div className="h-[14rem]">
              <DefaultProfile />
            </div>
            <div className="flex-1" style={{ backgroundColor: lightTheme.fill.normal }}>
              <DefaultSetting />
            </div>
          </div>
        }
      />
      <Route path="/bookmarks/styles" element={<></>} />
      <Route
        path="/edit"
        element={
          <div id="wrapper" className="flex flex-col">
            <div className="h-[17rem]">
              <EditProfile />
            </div>
            <div className="h-[0.625rem]" style={{ backgroundColor: lightTheme.fill.normal }} />
            <div className="flex-1" style={{ backgroundColor: lightTheme.background.normal }}>
              <EditSetting />
            </div>
          </div>
        }
      />
      <Route path="/portfolio" element={<></>} />
      <Route path="/alarm" element={<></>} />
    </Routes>
  );
};
