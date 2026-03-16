import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { MailPage } from "./pages/MailPage";
import { ViewPage } from "./pages/ViewPage";
import { MailPageGrid } from "./pages/MailPageGridView"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mail" element={<MailPage />} />
        <Route path="/view" element={<ViewPage />} />
        <Route path="/mailgrid" element={<MailPageGrid/>} />
      </Routes>
    </>
  );
}

export default App;
