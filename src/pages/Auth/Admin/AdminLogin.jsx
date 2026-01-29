import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { frontLogin } from "../../../utils/frontAuth";
import "../Owner/OwnerLogin.css"; // Reuse styles

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const result = await frontLogin(email, password, "ADMIN");
      console.log("Admin login result:", result);
      
      if (result.success) {
        toast.success("Admin login successful!");
        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 1000);
      } else {
        toast.error(result.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="owner-login-page">
      <div className="login-card">
        <button 
          className="btn btn-link p-0 mb-3"
          style={{ textDecoration: "none", fontWeight: 500 }}
          onClick={() => navigate("/")}
        >
          ← Back
        </button>

        <h3 className="text-center mb-4">🔐 Admin Login</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            className="btn btn-primary w-100 mb-3" 
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-muted" style={{ fontSize: "0.9rem" }}>
            📧 Default Email: admin@residentia.com<br/>
            🔑 Default Password: Admin@123
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
