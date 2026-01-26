import React, { useState } from "react";
import styles from "./Owner.module.css";
import { useNavigate } from "react-router-dom";

const BookingsContent = () => {
  // Using state so that the 'Confirm' action can actually update the UI
  const [bookings, setBookings] = useState([
    {
      id: 1,
      property: "Green Valley PG",
      tenant: "Anand Kulkarni",
      phone: "+91 9876543210",
      amount: "₹12,000",
      date: "Mar 15, 2024",
      status: "Confirmed",
    },
    {
      id: 2,
      property: "Comfort Stay",
      tenant: "Abhijeet Darade",
      phone: "+91 9876543211",
      amount: "₹15,000",
      date: "Mar 20, 2024",
      status: "Pending",
    },
    {
      id: 3,
      property: "Student Hub PG",
      tenant: "POJO",
      phone: "+91 9876543212",
      amount: "₹8,500",
      date: "Mar 25, 2024",
      status: "Confirmed",
    },
  ]);

  const navigate = useNavigate();

  // Function to handle the confirmation logic
  const confirmBooking = (id) => {
    setBookings((prevBookings) =>
      prevBookings.map((b) =>
        b.id === id ? { ...b, status: "Confirmed" } : b
      )
    );
    console.log(`Booking ${id} confirmed!`);
  };

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
                {/* Fixed: Accessing b.property directly based on your array */}
                <td>{b.property}</td>
                <td>{b.tenant}</td>
                <td>{b.amount}</td>
                <td>
                  <span
                    className={
                      b.status === "Confirmed"
                        ? styles.confirmed
                        : styles.pending
                    }
                  >
                    {b.status}
                  </span>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-outline-light me-2"
                      onClick={() => navigate(`/owner/client/${b.id}`)}
                    >
                      View
                    </button>

                    {/* Only show Confirm button if status is Pending */}
                    {b.status === "Pending" && (
                      <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() => confirmBooking(b.id)}
                      >
                        Confirm
                      </button>
                    )}
                  </div>
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