import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { MailPage } from "./pages/MailPage";
import { ViewPage } from "./pages/ViewPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mail">
          <Route index element={<MailPage />} />
          <Route path=":id" element={<ViewPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
