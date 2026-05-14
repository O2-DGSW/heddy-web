import { MainPage } from "@/pages/main";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<></>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
