import React, { useState } from "react";
import { toast } from "react-toastify";
import "./OwnerRegister.css";
import { useNavigate } from "react-router-dom";

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
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    const{name,email,mobile,managementCompany,address,aadharOrPan,identityDocUrl,bankAccount,ifsc,password,confirmPassword} = form;

    if (!email || !password || !mobile || ! name || !managementCompany||!address || !confirmPassword) {
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

    toast.success("PG-Owner registered successfully!");
    navigate("/");
    // console.log("ownerdata:", form);

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
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              name="mobile"
              placeholder="Mobile Number"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              name="managementCompany"
              placeholder="Management / Business Name"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-12 mb-3">
            <textarea
              name="address"
              placeholder="Address"
              className="form-control"
              rows="2"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              name="aadharOrPan"
              placeholder="Aadhaar / PAN Number"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              name="identityDocUrl"
              placeholder="Identity Document URL"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              name="bankAccount"
              placeholder="Bank Account Number"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              name="ifsc"
              placeholder="IFSC Code"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-4">
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="btn btn-primary w-100" onClick={handleRegister}>
          Register as Owner
        </button>
      </div>
    </div>
  );
};

export default OwnerRegister;
