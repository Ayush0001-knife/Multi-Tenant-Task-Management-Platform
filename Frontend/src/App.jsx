import React from "react";
import { Routes, Route } from "react-router-dom";
import StartPage from "./Components1/StartPage";
import FirstPage from "./Components1/FirstPage";
import OrgLogin from "./Components1/OrgLogin";
import OrgRegister from "./Components1/OrgRegister";
import IndiLogin from "./Components1/IndiLogin";
import IndiRegister from "./Components1/IndiRegister";
import AdminHomePage from "./Components2/AdminHomePage";
import ManagerHomePage from "./Components2/ManagerHomePage";
import EmployeeHomePage from "./Components2/EmployeeHomePage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/first-page" element={<FirstPage />} />
        <Route path="/org-login" element={<OrgLogin />} />
        <Route path="/org-register" element={<OrgRegister />} />
        <Route path="/indi-login" element={<IndiLogin />} />
        <Route path="/indi-register" element={<IndiRegister />} />
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/indi-manager" element={<ManagerHomePage />} />
        <Route path="/indi-employee" element={<EmployeeHomePage />} />
      </Routes>
    </div>
  );
};

export default App;
