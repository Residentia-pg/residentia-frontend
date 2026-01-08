import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Landing/Home";
import ClientDashboard from "./components/ClientDashboard/ClientDashboard";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import Owner from "./components/OwnerPanel/Owner";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/owner-dashboard" element={<Owner />} />
      </Routes>
    </div>
  );
}

export default App;
