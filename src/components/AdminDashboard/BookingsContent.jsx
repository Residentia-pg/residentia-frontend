  import React from "react";
import styles from "./AdminDashboard.module.css";

const BookingsContent = () => {
  const bookings = [
    {
      id: 1,
      user: "Mayur pande",
      property: "Green Valley PG",
      date: "Mar 15, 2024",
      amount: 12000,
      status: "Confirmed",
    },
    {
      id: 2,
      user: "Harshal Patil",
      property: "Comfort Stay",
      date: "Mar 20, 2024",
      amount: 15000,
      status: "Pending",
    },
    {
      id: 3,
      user: "Pranav Kulkarni",
      property: "Student Hub PG",
      date: "Mar 25, 2024",
      amount: 8500,
      status: "Confirmed",
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className={styles.sectionTitle}>Bookings</h2>
      </div>

      <div className={styles.tableWrapper}>
        <div className="table-responsive">
          <table
            className="table table-dark table-hover"
            style={{ marginBottom: 0 }}
          >
            <thead>
              <tr className={styles.tableHeadRow}>
                <th className={styles.tableHead}>Booking ID</th>
                <th className={styles.tableHead}>User</th>
                <th className={styles.tableHead}>Property</th>
                <th className={styles.tableHead}>Date</th>
                <th className={styles.tableHead}>Amount</th>
                <th className={styles.tableHead}>Status</th>
                <th className={styles.tableHead}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>#{booking.id}</td>
                  <td className={styles.tableCell}>{booking.user}</td>
                  <td className={styles.tableCellAlt}>{booking.property}</td>
                  <td className={styles.tableCell}>{booking.date}</td>
                  <td className={styles.tableCellPrice}>
                    ₹{booking.amount.toLocaleString()}
                  </td>
                  <td className={styles.tableCell}>
                    <span
                      className={`${styles.badge} ${
                        booking.status === "Confirmed"
                          ? styles.badgeGreen
                          : styles.badgeRed
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <button className="btn btn-sm btn-outline-light me-2">
                      View
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingsContent;
