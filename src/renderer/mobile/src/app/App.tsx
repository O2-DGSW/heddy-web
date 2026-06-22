import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { setupAuthInterceptor } from "@/entities/auth/model/setupAuthInterceptor";

setupAuthInterceptor();

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;