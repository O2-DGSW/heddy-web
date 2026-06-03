import { Outlet, useLocation } from "react-router-dom";

import { Sidebar } from "@/widgets/sidebar";
import { TopBar } from "@/widgets/top-bar";

const DesktopLayout = () => {
  const { pathname } = useLocation();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <TopBar />
      <div className="flex min-h-[calc(100vh-68px)]">
        {!isAuthPage && <Sidebar />}
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export { DesktopLayout };
