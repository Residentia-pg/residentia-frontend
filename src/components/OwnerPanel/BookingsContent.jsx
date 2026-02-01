import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import { toast } from "react-toastify";
import styles from "./Owner.module.css";
import { getAuthUser } from "../../utils/frontAuth";

const BookingsContent = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const auth = getAuthUser();
    if (!auth || !auth.user || !auth.user.email) {
      toast.error("Owner session not found");
      return;
    }
    try {
      const res = await API.get(`/api/owners/bookings?email=${auth.user.email}`);
      setBookings(res.data);
    } catch {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, action) => {
    try {
      await API.put(`/api/owners/bookings/${id}/${action}`);
      toast.success(`Booking ${action}ed successfully`);
      loadBookings(); // refresh list
    } catch {
      toast.error(`${action.charAt(0).toUpperCase() + action.slice(1)} failed`);
    }
  };

  if (loading) return <p className="text-center">Loading bookings...</p>;

  return (
    <div>
      <h2 className={styles.sectionTitle}>Booking Requests</h2>
      <p className="text-muted small mb-4">View and manage booking requests for your properties.</p>

      <div className={styles.tableCard}>
        <table className={`table ${styles.noMargin}`}>
          <thead>
            <tr>
              <th className={styles.tableHead}>Property</th>
              <th className={styles.tableHead}>Tenant</th>
              <th className={styles.tableHead}>Phone</th>
              <th className={styles.tableHead}>Start Date</th>
              <th className={styles.tableHead}>Status</th>
              <th className={styles.tableHead}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-4">No booking requests found.</td></tr>
            ) : bookings.map((b) => (
              <tr key={b.id} className={styles.tr}>
                <td className={styles.td}>{b.pgId?.propertyName || b.pgId?.name || "Deleted PG"}</td>
                <td className={styles.td}>{b.user?.name || "Unknown"}</td>
                <td className={styles.td}>{b.user?.mobileNumber || "N/A"}</td>
                <td className={styles.td}>{b.startDate}</td>
                <td className={styles.td}>
                  <span
                    className={
                      b.status === "APPROVED" || b.status === "CONFIRMED"
                        ? styles.confirmed
                        : b.status === "REJECTED"
                          ? styles.rejected
                          : styles.pending
                    }
                  >
                    {b.status}
                  </span>
                </td>
                <td className={`${styles.td} d-flex gap-2`}>
                  <button
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => navigate(`/owner/client/${b.id}`)}
                  >
                    View
                  </button>

                  {b.status === "PENDING" && (
                    <>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => updateStatus(b.id, "approve")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => updateStatus(b.id, "reject")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
        {bookings.length > 0 && <div className="text-muted small p-2 text-end">Total Bookings: {bookings.length}</div>}
      </div>
    </div>
  );
};

export default BookingsContent;
