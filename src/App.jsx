import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Landing/Home";
import ClientDashboard from "./components/ClientDashboard/ClientDashboard";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import Owner from "./components/OwnerPanel/Owner";
import ProtectedRoute from "./routes/ProtectedRoute";
import ClientRegister from "./pages/Auth/Client/ClientRegister";
import OwnerRegister from "./pages/Auth/Owner/OwnerRegister";
import ClientView from "./components/OwnerPanel/ClientView";

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register-client" element={<ClientRegister/>}/>
        <Route path="/register-owner" element={<OwnerRegister/>}/>

        {/* Protected Routes */}
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
        <Route
          path="/owner/client/:bookingId"
          element={
            <ProtectedRoute role="OWNER">
              <ClientView />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
