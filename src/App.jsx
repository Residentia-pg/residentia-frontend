import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Landing/Home.jsx";
import ClientRegister from "./pages/Auth/Client/ClientRegister.jsx";
import ClientDashboard from "./components/ClientDashboard/ClientDashboard.jsx";
import OwnerRegister from "./pages/Auth/Owner/OwnerRegister.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/client" element={<ClientDashboard />} />
      <Route path="/register-client" element={<ClientRegister />} />
      <Route path="/register-owner" element={<OwnerRegister />} />
    </Routes>
  );
}

export default App;
