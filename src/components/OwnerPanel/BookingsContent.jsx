import React from "react";
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
        <div className="table-responsive">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th className={styles.tableHead}>Property</th>
                <th className={styles.tableHead}>Tenant</th>
                <th className={styles.tableHead}>Phone</th>
                <th className={styles.tableHead}>Amount</th>
                <th className={styles.tableHead}>Date</th>
                <th className={styles.tableHead}>Status</th>
                <th className={styles.tableHead}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className={styles.td}>{booking.property}</td>
                  <td className={styles.td}>{booking.tenant}</td>
                  <td className={styles.tdAlt}>{booking.phone}</td>
                  <td className={styles.tdPrice}>{booking.amount}</td>
                  <td className={styles.tdAlt}>{booking.date}</td>
                  <td className={styles.td}>
                    <span
                      className={`${styles.statusBadge} ${
                        booking.status === "Confirmed"
                          ? styles.confirmed
                          : styles.pending
                      }`}
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
