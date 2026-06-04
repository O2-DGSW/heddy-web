import { Outlet, useLocation } from "react-router-dom";

import { Sidebar } from "@/widgets/sidebar";
import { TopBar } from "@/widgets/top-bar";

const DesktopLayout = () => {
  const { pathname } = useLocation();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <div className="h-screen overflow-hidden bg-[#FAFAFA]">
      <TopBar />
      <div className="flex h-[calc(100vh-4.25rem)] overflow-hidden">
        {!isAuthPage && <Sidebar />}
        <main className="min-w-0 flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export { DesktopLayout };
