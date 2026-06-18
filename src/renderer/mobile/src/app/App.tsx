import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { setupInterceptor } from "@/private/shared/api/interceptor";

setupInterceptor();

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;