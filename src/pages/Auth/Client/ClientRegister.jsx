import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ClientRegister.css";

const ClientRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { name, email, mobile, password, confirmPassword } = form;

    if (!name || !email || !mobile || !password) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password mismatch");
      return;
    }

    try {
      const userData = {
        name,
        email,
        mobileNumber: mobile,
        passwordHash: password,
      };

      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        userData
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Client registered successfully!");
        navigate("/client");
      }
    } catch {
      toast.error("Registration Failed!");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="card-header">
          <button className="back-btn" onClick={() => navigate("/")}>
            ← Back
          </button>
          <h2>Create Account</h2>
          <p className="subtitle">Join us to find your perfect PG</p>
        </div>

        <div className="form-container">
          <div className="form-group">
            <label>Full Name</label>
            <input
              name="name"
              placeholder="e.g. John Doe"
              className="form-input"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="e.g. john@example.com"
              className="form-input"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Mobile Number</label>
            <input
              name="mobile"
              placeholder="e.g. 9876543210"
              className="form-input"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="form-input"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="form-input"
              onChange={handleChange}
            />
          </div>

          <button className="register-btn" onClick={handleRegister}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientRegister;
