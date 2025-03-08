// DO NOT MODIFY THIS CODE

import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { MailPage } from "./pages/MailPage/MailPage";
import "./App.css";

// DO NOT MODIFY THIS CODE

/**
 * Workshop 2
 * 
 * Task: Link the view page.
 */


// 1. Import the view page by uncommenting below
// import { ViewPage } from "./pages/ViewPage";




function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mail" element={<MailPage />} />
        
        {/* 2. Uncomment the line below to make the route */}
        {/* <Route path="/mail/view" element={<ViewPage />} /> */}

      </Routes>
    </>
  );
}

export default App;
