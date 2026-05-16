import { MainPage } from "@/pages/main";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ProfilePage } from "@/pages/profile";
import { BottomBar } from "@/widgets/bottom-bar";

const Layout = () => {
  const location = useLocation();

  const hideBottomBar = location.pathname === "/login";

  return (
    <div className="App pt-safe pb-safe px-safe">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<></>} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>

      {!hideBottomBar && <BottomBar />}
    </div>
  );
};

const App = () => {
  return (
    <div className="mt-[2rem] mb-[2rem] size-full">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
};

export default App;
