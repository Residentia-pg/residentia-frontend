import React,{useState} from"react";
import{toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import "./ClientRegister.css";

const ClientRegister=()=>{
    const[form,setForm]  =useState({
        name:"",
        email:"",
        mobile:"",
        dob:"",
        gender:"",
        occupation:"",
        address:"",
        password:"",
        confirmPassword:"",
    });

    const navigate = useNavigate();

    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value});
    };

    const handleRegister = () =>{
        const{name,email,mobile,dob,gender,occupation,address,password,confirmPassword} = form;

        if(!name || !email || !mobile || !dob ||!gender ||!occupation ||!address || !password ||!confirmPassword){
            toast.error("All fields are required");
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

        if(password != confirmPassword)
        {
            toast.error("password mismatch");
            return;
        }

        toast.success("Client registered Successfully!!!");
        navigate("/");
    };

    return(
        <div className="register-page">
            <div className="register-card">
                <h3 className="text-center mb-4">🏠Register, Join Residentia family!!</h3>

                <input
                    name="name"
                    placeholder="Full Name"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    name="mobile"
                    placeholder="Mobile Number"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    name="dob"
                    type="date"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <select
                    name="gender"
                    className="form-control mb-3"
                    onChange={handleChange}
                >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                </select>

                <input
                    name="occupation"
                    placeholder="Occupation"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <textarea
                    name="address"
                    placeholder="Address"
                    className="form-control mb-3"
                    rows="3"
                    onChange={handleChange}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control mb-4"
                    onChange={handleChange}
                />
                <button className="btn btn-primary w-100" onClick={handleRegister}>
                    Register as Client
                </button>
        </div>
    </div>
    );
};

export default ClientRegister;