import { MainPage } from "@/pages/main";
import { LoginPage } from "@/pages/auth/login";
import { SignupPage } from "@/pages/auth/signup";
import { ProfilePage } from "@/pages/profile";
import { FindPage } from "@/pages/auth/find";
import { BottomBar } from "@/widgets/bottom-bar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  const hideBottomBar = ["/login", "/signup"].includes(location.pathname) || location.pathname.startsWith("/find/");

  return (
    <div className="App pt-safe pb-safe px-safe">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/find/:type" element={<FindPage />} />
      </Routes>

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