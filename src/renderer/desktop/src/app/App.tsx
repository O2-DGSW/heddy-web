import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppRoutes } from "./routes";
import { setupAuthInterceptor } from "@/entities/auth/model/setupAuthInterceptor";

setupAuthInterceptor();

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        limit={1}
        newestOnTop={false}
        theme="light"
        className="font-['Pretendard']"
        toastClassName="rounded-[10px] text-sm font-medium leading-[140%] shadow-[0_8px_24px_rgba(0,0,0,0.16)]"
        progressClassName="opacity-80"
      />
    </>
  );
};

export default App;
