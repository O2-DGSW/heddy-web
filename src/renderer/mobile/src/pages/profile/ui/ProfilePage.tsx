import { lightTheme } from "@design-tokens";

import { Route, Routes } from "react-router-dom";

// default
import { DefaultProfile } from "@/features/profile/ui/default/DefaultProfile.tsx";
import { DefaultSetting } from "@/features/profile/ui/default/DefaultSetting.tsx";

// 회원 정보 수정
import { EditSetting } from "@/features/profile/ui/edit/EditSetting.tsx";
import { EditProfile } from "@/features/profile/ui/edit/EditProfile.tsx";

// 알람 설정
import { AlarmTop } from "@/features/profile/ui/alarm/AlarmTop.tsx";
import { AlarmBottom } from "@/features/profile/ui/alarm/AlarmBottom.tsx";

// 저장 스타일
import { Bookmark } from "@/features/profile/ui/bookmark/Bookmark.tsx";

export const ProfilePage = () => {
  return (
    <Routes>
      {/* 기본 프로필 렌더 페이지*/}
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

      {/* 저장 스타일 */}
      <Route
        path="/bookmarks/styles"
        element={
          <div id="wrapper" className="flex flex-col h-screen max-h-[37.5rem] min-h-0">
            <Bookmark />
          </div>
        }
      />

      {/* 회원 정보 수정 페이지 */}
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

      {/* 포폴 페이지 */}
      <Route path="/portfolio" element={<></>} />

      {/* 알람 설정 페이지 */}
      <Route
        path="/alarm"
        element={
          <div id="wrapper" className="flex flex-col h-[37rem]">
            <div className="h-[17rem]">
              <AlarmTop />
            </div>

            <div
              className="h-1"
              style={{
                backgroundColor: lightTheme.line.alternative,
              }}
            />

            <div
              className="flex-1"
              style={{
                backgroundColor: lightTheme.background.normal,
              }}
            >
              <AlarmBottom />
            </div>
          </div>
        }
      />
    </Routes>
  );
};
