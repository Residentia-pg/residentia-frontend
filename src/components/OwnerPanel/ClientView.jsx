
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Owner.module.css";
import API from "../../api/api";

const ClientView = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await API.get(`/api/owner/bookings/${bookingId}`);
        setBooking(res.data);
      } catch {
        setBooking(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  if (loading) return <div>Loading...</div>;
  if (!booking) return <div>Booking not found.</div>;

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
            <Detail label="Name" value={booking.tenantName} />
            <Detail label="Email" value={booking.tenantEmail} />
            <Detail label="Mobile" value={booking.tenantPhone} />
            <Detail label="PG Name" value={booking.propertyName || booking.property?.propertyName} />
            <Detail label="Sharing Type" value={booking.sharingType || booking.property?.sharingType} />
            <Detail label="Check-in Date" value={booking.checkInDate} />
            <Detail label="Status" value={booking.status} />
            {/* Add more fields as needed */}
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
