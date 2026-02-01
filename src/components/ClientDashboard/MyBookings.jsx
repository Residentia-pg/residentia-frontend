import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { toast } from "react-toastify";
import styles from "./ClientDashboard.module.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [reviewingId, setReviewingId] = useState(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/client/bookings");
      console.log("✅ Bookings loaded:", res.data); // Debug log
      setBookings(res.data);
    } catch (err) {
      console.error("❌ Error loading bookings:", err);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (bookingId) => {
    if (!reviewText.trim()) {
      toast.error("Review cannot be empty");
      return;
    }

    try {
      await API.post(`/api/reviews/${bookingId}`, {
        review: reviewText,
      });
      toast.success("Review submitted!");
      setReviewingId(null);
      setReviewText("");
      loadBookings();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to submit review"
      );
    }
  };

  // ✅ Format LocalDateTime from backend
  const formatDate = (dateTimeString) => {
    if (!dateTimeString) return "N/A";
    
    try {
      // Backend sends: "2024-01-15T14:30:00" or "2024-01-15T14:30:00.123"
      const date = new Date(dateTimeString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.warn("Invalid date:", dateTimeString);
        return "Invalid Date";
      }
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (err) {
      console.error("Date formatting error:", err);
      return dateTimeString; // Return as-is if formatting fails
    }
  };

  // ✅ Format date with time
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "N/A";
    
    try {
      const date = new Date(dateTimeString);
      
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }
      
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (err) {
      console.error("DateTime formatting error:", err);
      return dateTimeString;
    }
  };

  if (loading) return <div className={styles.loading}>Loading bookings...</div>;

  return (
    <div>
      <h2 className={styles.sectionTitle}>My Bookings</h2>

      {bookings.length === 0 ? (
        <p className={styles.emptyText}>No bookings yet.</p>
      ) : (
        <div className={styles.bookingGrid}>
          {bookings.map((booking) => (
            <div key={booking.bookingId} className={styles.bookingCard}>
              <div className={styles.bookingHeader}>
                <div>
                  <h4 className={styles.propertyName}>
                    {booking.propertyName || "Property"}
                  </h4>
                  
                  {/* ✅ Display dates properly */}
                  <div className={styles.bookingDatesContainer}>
                    {booking.checkInDate && (
                      <p className={styles.bookingDates}>
                        <strong>Check-in:</strong> {formatDate(booking.checkInDate)}
                      </p>
                    )}
                    
                    {booking.checkOutDate && (
                      <p className={styles.bookingDates}>
                        <strong>Check-out:</strong> {formatDate(booking.checkOutDate)}
                      </p>
                    )}
                    
                    {booking.bookingDate && (
                      <p className={styles.bookingDates} style={{ fontSize: '0.85em', color: '#666', marginTop: '4px' }}>
                        Booked: {formatDateTime(booking.bookingDate)}
                      </p>
                    )}
                  </div>

                  {/* ✅ Show amount if available */}
                  {booking.amount && (
                    <p className={styles.bookingAmount}>
                      Amount: ₹{booking.amount.toFixed(2)}
                    </p>
                  )}

                  {/* ✅ Show tenant info */}
                  {booking.tenantName && (
                    <p className={styles.tenantInfo} style={{ fontSize: '0.9em', marginTop: '4px' }}>
                      Guest: {booking.tenantName}
                    </p>
                  )}
                </div>

                <span
                  className={`${styles.statusBadge} ${
                    booking.status === "CONFIRMED"
                      ? styles.statusGreen
                      : booking.status === "CANCELLED"
                      ? styles.statusRed
                      : styles.statusOrange
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              {/* ✅ Show notes if available */}
              {booking.notes && (
                <div className={styles.notesSection} style={{ 
                  marginTop: '10px', 
                  padding: '8px', 
                  background: '#f9f9f9', 
                  borderRadius: '4px',
                  fontSize: '0.9em'
                }}>
                  <strong>Notes:</strong> {booking.notes}
                </div>
              )}

              {booking.canReview && (
                <div className={styles.reviewSection}>
                  {reviewingId === booking.bookingId ? (
                    <>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Share your experience..."
                        className={styles.reviewTextarea}
                        rows={3}
                      />
                      <div className={styles.reviewActions}>
                        <button
                          className={styles.primaryBtn}
                          onClick={() => handleReview(booking.bookingId)}
                        >
                          Submit Review
                        </button>
                        <button
                          className={styles.secondaryBtn}
                          onClick={() => {
                            setReviewingId(null);
                            setReviewText("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      className={styles.linkBtn}
                      onClick={() => setReviewingId(booking.bookingId)}
                    >
                      Leave a review →
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;