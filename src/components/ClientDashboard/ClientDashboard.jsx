import React, { useState, useEffect } from "react";
import axios from "axios";

const ClientDashboard = () => {
  const [pgs, setPgs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/pgs/all")
      .then(res => setPgs(res.data))
      .catch(err => console.error("Data Fetch Error:", err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center text-white mb-4">Available PGs</h2>
      <div className="row">
        {pgs.map((pg) => (
          <div className="col-md-4 mb-4" key={pg.id}>
            <div className="card shadow p-3">
              <h4>{pg.propertyName}</h4>
              <p className="text-muted">📍 {pg.city}</p>
              <h5 className="text-success">Rent: ₹{pg.rentAmount}</h5>
              <button className="btn btn-primary w-100">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientDashboard;