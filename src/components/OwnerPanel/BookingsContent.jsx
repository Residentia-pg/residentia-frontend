import React, { useEffect, useState } from "react";
import styles from "./Owner.module.css";
import { useNavigate } from "react-router-dom";

const BookingsContent = () => {
  const bookings = [
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
  ];
  
  const navigate = useNavigate();

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
                      {booking.status}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <button className="btn btn-sm btn-outline-light me-2"
                    onClick={() =>
                        navigate(`/owner/client/${booking.id}`)
                    }
                    >
                      View
                    </button>
                    <button className="btn btn-sm btn-outline-success">
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
