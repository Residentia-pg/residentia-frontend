import React, { useEffect, useState } from "react";
import styles from "./Owner.module.css";
import API from "../../api";

const BookingsContent = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const res = await API.get("/api/owner/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const confirmBooking = async (id) => {
    try {
      await API.put(`/api/owner/bookings/${id}/confirm`);
      loadBookings(); // reload updated list
    } catch (err) {
      alert("Confirm failed");
    }
  };

  if (loading) return <p className="text-center">Loading bookings...</p>;

  return (
    <div>
      <h2 className={styles.sectionTitle}>All Bookings</h2>

      <div className={styles.tableCard}>
        <table className={`table table-dark ${styles.noMargin}`}>
          <thead>
            <tr>
              <th>Property</th>
              <th>Tenant</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.property?.name}</td>
                <td>{b.tenantName}</td>
                <td>₹{b.amount}</td>
                <td>
                  <span
                    className={
                      b.status === "CONFIRMED"
                        ? styles.confirmed
                        : styles.pending
                    }
                  >
                    {b.status}
                  </span>
                </td>
                <td>
                  {b.status === "PENDING" && (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => confirmBooking(b.id)}
                    >
                      Confirm
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default BookingsContent;
