// DO NOT MODIFY THIS CODE

import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { MailPage } from './pages/MailPage/MailPage';
import { ViewPage } from './pages/ViewPage';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mail" element={<MailPage />}>
          <Route path=":id" element={<ViewPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
