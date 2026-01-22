import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Landing/Home";
import ClientDashboard from "./components/ClientDashboard/ClientDashboard";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import Owner from "./components/OwnerPanel/Owner";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/client" 
          element={
            <ProtectedRoute role="CLIENT">
          <ClientDashboard />
          </ProtectedRoute>
          }
        />

        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute role="ADMIN">
            <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/owner-dashboard" 
          element={
            <ProtectedRoute role="OWNER">
            <Owner />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
