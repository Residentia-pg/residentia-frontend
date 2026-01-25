import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Owner.module.css";

const ClientView = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const client = {
    name: "Anand Kulkarni",
    email: "anand.k@gmail.com",
    mobile: "+91 9876543210",
    gender: "Male",
    dob: "10 Jan 1999",
    occupation: "Software Engineer",
    address: "phase 2, pune",
    pgName: "Green Valley PG",
    sharingType: "2-Sharing",
    bookingPeriod: "Mar 2024 – Aug 2024",
    status: "Pending",
  };

  return (
    <div className={styles.appWrapper}>
      <nav className={styles.headerNav}>
        <div className="d-flex justify-content-between align-items-center">
          <h2 className={styles.appTitle}>👤 Client Details</h2>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>
      </nav>


      <div className="container py-4">
        <div className={styles.formCard}>
          <h4 className="mb-4">Booking ID: #{bookingId}</h4>

          <div className="row g-3">
            <Detail label="Name" value={client.name} />
            <Detail label="Email" value={client.email} />
            <Detail label="Mobile" value={client.mobile} />
            <Detail label="Gender" value={client.gender} />
            <Detail label="Date of Birth" value={client.dob} />
            <Detail label="Occupation" value={client.occupation} />
            <Detail label="Address" value={client.address} />
            <Detail label="PG Name" value={client.pgName} />
            <Detail label="Sharing Type" value={client.sharingType} />
            <Detail label="Booking Period" value={client.bookingPeriod} />
            <Detail label="Status" value={client.status} />
          </div>

          <div className="d-flex gap-3 mt-4">
            <button className="btn btn-success flex-grow-1">
              Approve Request
            </button>
            <button className="btn btn-outline-danger flex-grow-1">
              Reject Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="col-md-6">
    <div style={{ fontSize: 13, color: "#6b7280" }}>{label}</div>
    <div style={{ fontSize: 15, fontWeight: 500 }}>{value}</div>
  </div>
);

export default ClientView;
