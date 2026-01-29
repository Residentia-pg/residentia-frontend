import React, { useState } from "react";
import { toast } from "react-toastify";
import "./OwnerRegister.css";
import { useNavigate } from "react-router-dom";
import { registerOwner } from "../../../api/ownerApi";

const OwnerRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    managementCompany: "",
    address: "",
    aadharOrPan: "",
    identityDocUrl: "",
    bankAccount: "",
    ifsc: "",
    password: "",
    confirmPassword: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { name, email, mobile, managementCompany, address, password, confirmPassword, city, state, pincode } = form;

    if (!email || !password || !mobile || !name || !managementCompany || !address || !confirmPassword || !city || !state || !pincode) {
      toast.error("Required fields missing");
      return;
    }

    if (mobile.length < 10) {
      toast.error("Enter valid mobile number");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords mismatch");
      return;
    }

    setLoading(true);
    try {
      const registrationData = {
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        managementCompany: form.managementCompany,
        address: form.address,
        aadharOrPan: form.aadharOrPan,
        identityDocUrl: form.identityDocUrl,
        bankAccount: form.bankAccount,
        ifsc: form.ifsc,
        password: form.password,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
      };

      await registerOwner(registrationData);
      toast.success("PG-Owner registered successfully! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="owner-register-page">
      <div className="register-card">
        <button className="btn btn-link p-0 mb-3"
          style={{ textDecoration: "none", fontWeight: 500 }}
          onClick={() => navigate("/")}
        >
          ← Back
        </button>
        <h3 className="text-center mb-4">🏠Register, Join Residentia family!!</h3>

        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              name="name"
              placeholder="Full Name"
              className="form-control"
              onChange={handleChange}
              value={form.name}
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="form-control"
              onChange={handleChange}
              value={form.email}
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              name="mobile"
              placeholder="Mobile Number"
              className="form-control"
              onChange={handleChange}
              value={form.mobile}
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              name="managementCompany"
              placeholder="Management / Business Name"
              className="form-control"
              onChange={handleChange}
              value={form.managementCompany}
            />
          </div>

          <div className="col-12 mb-3">
            <textarea
              name="address"
              placeholder="Address"
              className="form-control"
              rows="2"
              onChange={handleChange}
              value={form.address}
            />
          </div>

          <div className="col-md-4 mb-3">
            <input
              name="city"
              placeholder="City"
              className="form-control"
              onChange={handleChange}
              value={form.city}
            />
          </div>

          <div className="col-md-4 mb-3">
            <input
              name="state"
              placeholder="State"
              className="form-control"
              onChange={handleChange}
              value={form.state}
            />
          </div>

          <div className="col-md-4 mb-3">
            <input
              name="pincode"
              placeholder="Pincode"
              className="form-control"
              onChange={handleChange}
              value={form.pincode}
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              name="aadharOrPan"
              placeholder="Aadhaar / PAN Number"
              className="form-control"
              onChange={handleChange}
              value={form.aadharOrPan}
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              name="identityDocUrl"
              placeholder="Identity Document URL"
              className="form-control"
              onChange={handleChange}
              value={form.identityDocUrl}
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              name="bankAccount"
              placeholder="Bank Account Number"
              className="form-control"
              onChange={handleChange}
              value={form.bankAccount}
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              name="ifsc"
              placeholder="IFSC Code"
              className="form-control"
              onChange={handleChange}
              value={form.ifsc}
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="form-control"
              onChange={handleChange}
              value={form.password}
            />
          </div>

          <div className="col-md-6 mb-4">
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              onChange={handleChange}
              value={form.confirmPassword}
            />
          </div>
        </div>
        <button className="btn btn-primary w-100" onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "Register as Owner"}
        </button>
      </div>
    </div>
  );
};

export default OwnerRegister;
