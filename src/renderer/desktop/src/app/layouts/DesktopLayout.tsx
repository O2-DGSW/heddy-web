import { Outlet } from "react-router-dom";

import { TopBar } from "@/widgets/top-bar";

const DesktopLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export { DesktopLayout };
