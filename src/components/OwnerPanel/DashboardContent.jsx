import React from "react";
import styles from "./Owner.module.css";
import { stats, recentBookings } from "./ownerData";

const DashboardContent = () => {
  return (
    <div>
      <h2 className={styles.sectionTitle}>Dashboard Overview</h2>

      <div className="row g-4 mb-5">
        {stats.map((stat, i) => (
          <div key={i} className="col-md-3">
            <div className={styles.statCard}>
              <h3 className={styles.statValue} style={{ color: stat.color }}>
                {stat.value}
              </h3>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className={styles.subTitle}>Recent Bookings</h3>

      <div className={styles.tableCard}>
        <div className="table-responsive">
          <table className={`table table-dark ${styles.noMargin}`}>
            <thead>
              <tr>
                <th className={styles.th}>Property</th>
                <th className={styles.th}>Tenant</th>
                <th className={styles.th}>Amount</th>
                <th className={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking, idx) => (
                <tr key={idx} className={styles.tr}>
                  <td className={styles.td}>{booking.property}</td>
                  <td className={styles.td}>{booking.tenant}</td>
                  <td className={styles.td}>{booking.amount}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
