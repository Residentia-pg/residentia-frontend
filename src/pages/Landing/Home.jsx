import React, { useState } from "react";
import "./Home.css";
import { frontLogin } from "../../utils/frontAuth";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

export default function Home() {
  const [findEmail, setFindEmail] = useState("");
  const [findPassword, setFindPassword] = useState("");
  const [listEmail, setListEmail] = useState("");
  const [listPassword, setListPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="home-page">
      <nav className="navbar navbar-dark home-navbar sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <span className="brand-icon">🏠</span>
            <span className="brand-text">
              PG <span className="brand-highlight">Finder</span>
            </span>
          </a>
          <div className="d-none d-md-flex gap-4 align-items-center">
            <a href="#" className="nav-link-custom">
              About
            </a>
            <a href="#" className="nav-link-custom">
              Contact
            </a>
            <a href="#" className="nav-link-custom">
              Help
            </a>
            <button className="btn btn-sm nav-cta-btn">Login / Sign Up</button>
          </div>
        </div>
      </nav>


      <div className="container home-container">

        <div className="text-center text-white mb-4">
          <div className="hero-pill">
            <span className="hero-pill-dot"></span>
            Live in comfort. Book in minutes.
          </div>

          <h1 className="hero-title">
            Find your next{" "}
            <span className="hero-highlight">home away from home</span>.
          </h1>
          <p className="hero-subtitle">
            Discover verified PGs in your city, connect with trusted owners, and
            move into a space that feels just right—for you and your lifestyle.
          </p>

          <div className="hero-badges">
            <span className="hero-badge">✅ Verified Listings</span>
            <span className="hero-badge">🧹 Clean & Safe</span>
            <span className="hero-badge">📍 City-Based Search</span>
          </div>
        </div>

 
        <div className="row g-4 cards-row">

          <div className="col-lg-4 col-md-6">
            <div className="card h-100 pg-card">
              <div className="text-center mb-4">
                <div className="card-icon-wrapper card-icon-blue">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 className="card-title">Find Your PG</h3>
                <p className="card-subtitle">
                  Log in to explore curated PGs and shortlist your favorites.
                </p>
              </div>

              <div>
                <div className="mb-3">
                  <label className="form-label input-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control pg-input"
                    placeholder="e.g. anand.kulkarni@gmail.com"
                    value={findEmail}
                    onChange={(e) => setFindEmail(e.target.value)}
                  />
                  <small className="input-helper">
                    Use the email you signed up with.
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label input-label">Password</label>
                  <input
                    type="password"
                    className="form-control pg-input"
                    placeholder="Enter your password"
                    value={findPassword}
                    onChange={(e) => setFindPassword(e.target.value)}
                  />
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-link forgot-password-btn"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>

                <button 
                  className="btn w-100 mb-2 pg-btn-primary"
                  onClick={()=>{
                    const res = frontLogin(findEmail,findPassword,"CLIENT");
                    if(res.success) 
                    {
                      toast.success("Client Login Successful");
                      navigate("/client");
                    }
                    else {
                      toast.error(res.message);
                    }
                  }}
                >
                  Login & Continue
                </button>
                <button 
                  className="btn w-100 pg-btn-outline"
                  onClick={()=>navigate("/register-client")}
                >
                  Create a new account
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="card h-100 pg-card">
              <div className="text-center mb-4">
                <div className="card-icon-wrapper card-icon-purple">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <h3 className="card-title">List Your PG</h3>
                <p className="card-subtitle">
                  Reach verified tenants and manage bookings in one place.
                </p>
              </div>

              <div>
                <div className="mb-3">
                  <label className="form-label input-label">Owner email</label>
                  <input
                    type="email"
                    className="form-control pg-input"
                    placeholder="e.g. owner.pgspace@gmail.com"
                    value={listEmail}
                    onChange={(e) => setListEmail(e.target.value)}
                  />
                  <small className="input-helper">
                    This will be used for all PG-related communication.
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label input-label">Password</label>
                  <input
                    type="password"
                    className="form-control pg-input"
                    placeholder="Create a strong password"
                    value={listPassword}
                    onChange={(e) => setListPassword(e.target.value)}
                  />
                  <small className="input-helper">
                    Minimum 8 characters with a number & symbol.
                  </small>
                </div>

                <button 
                  className="btn w-100 mb-2 pg-btn-primary"
                  onClick={()=>{
                    const res = frontLogin(listEmail,listPassword,"OWNER");
                    if(res.success)
                    {
                      toast.success("Admin Login Successful");
                      navigate("/owner-dashboard");
                    }
                    else{
                      toast.error(res.message);
                    } 
                  }}
                  >
                  Login as Owner
                </button>
                <button 
                  className="btn w-100 pg-btn-outline"
                  onClick={()=>navigate("/register-owner")}
                  >
                  Register your PG
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <div className="card h-100 pg-card">
              <div className="text-center mb-4">
                <div className="card-icon-wrapper card-icon-neutral">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 1v6m0 6v6m-9-9h6m6 0h6"></path>
                  </svg>
                </div>
                <h3 className="card-title">Admin Panel</h3>
                <p className="card-subtitle">
                  Monitor platform health, users, and PG listings.
                </p>
              </div>

              <div>
                <div className="mb-3">
                  <label className="form-label input-label">Admin email</label>
                  <input
                    type="email"
                    className="form-control pg-input"
                    placeholder="admin@pgfinder.com"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label input-label">Password</label>
                  <input
                    type="password"
                    className="form-control pg-input"
                    placeholder="Admin password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                  />
                </div>

                <button 
                  className="btn w-100 pg-btn-primary"
                  onClick={()=>{
                    const res = frontLogin(adminEmail,adminPassword,"ADMIN");
                    if(res.success)
                    {
                      toast.success("Owner Login Successful");
                      navigate("/admin-dashboard");
                    }
                    else{
                      toast.error(res.message);
                    } 
                  }}
                  >
                  Admin Login
                </button>
                <p className="admin-note">
                  For security reasons, admin access is restricted. Contact the
                  platform owner to request admin permissions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
