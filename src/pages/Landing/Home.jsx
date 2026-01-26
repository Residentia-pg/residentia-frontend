import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  // State for form inputs (optional, can be expanded later)
  const [clientEmail, setClientEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleClientLogin = (e) => {
    e.preventDefault();
    console.log("Client Login:", clientEmail, clientPassword);
    // TODO: Implement actual login logic
    navigate("/client");
  };

  const handleOwnerLogin = (e) => {
    e.preventDefault();
    console.log("Owner Login:", ownerEmail, ownerPassword);
    // TODO: Implement actual login logic
    // navigate("/owner-dashboard"); // Example route
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    console.log("Admin Login:", adminEmail, adminPassword);
    // TODO: Implement actual login logic
    // navigate("/admin-dashboard"); // Example route
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="logo-icon">🏠</span>
          <span className="brand-name">PG Finder</span>
        </div>
        <div className="navbar-links">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#help">Help</a>
          <button className="login-signup-btn">Login / Sign Up</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <div className="cards-container">

          {/* Client Card */}
          <div className="login-card">
            <div className="card-icon">🏠</div>
            <h3>Find Your PG</h3>
            <p className="card-subtitle">Log in to explore curated PGs.</p>
            <form onSubmit={handleClientLogin}>
              <input
                type="email"
                placeholder="Email"
                className="form-input"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="form-input"
                value={clientPassword}
                onChange={(e) => setClientPassword(e.target.value)}
              />
              <button type="submit" className="login-btn client-btn">
                Login & Continue
              </button>
            </form>
            <button
              className="create-account-btn"
              onClick={() => navigate("/register-client")}
            >
              Create account
            </button>
          </div>

          {/* Owner Card */}
          <div className="login-card">
            <div className="card-icon">🔑</div>
            <h3>List Your PG</h3>
            <p className="card-subtitle">Reach verified tenants easily.</p>
            <form onSubmit={handleOwnerLogin}>
              <input
                type="email"
                placeholder="Owner Email"
                className="form-input"
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="form-input"
                value={ownerPassword}
                onChange={(e) => setOwnerPassword(e.target.value)}
              />
              <button type="submit" className="login-btn owner-btn">
                Login as Owner
              </button>
            </form>
            <button
              className="create-account-btn"
              onClick={() => navigate("/register-owner")}
            >
              Register PG
            </button>
          </div>

          {/* Admin Card */}
          <div className="login-card">
            <div className="card-icon">⚙️</div>
            <h3>Admin Panel</h3>
            <form onSubmit={handleAdminLogin}>
              <input
                type="email"
                placeholder="Admin Email"
                className="form-input"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="form-input"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
              <button type="submit" className="login-btn admin-btn">
                Admin Login
              </button>
            </form>
            <p className="restricted-access">Restricted access.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
