import React, { useEffect, useState } from "react";
import styles from "./Owner.module.css";
import API from "../../api";

const DashboardContent = () => {
  const [stats, setStats] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const propertiesRes = await API.get("/api/owner/properties");
        const bookingsRes = await API.get("/api/owner/bookings");

        const bookings = bookingsRes.data;
        const confirmed = bookings.filter(b => b.status === "CONFIRMED");
        const revenue = confirmed.reduce((sum, b) => sum + b.amount, 0);

        setStats([
          { label: "Properties", value: propertiesRes.data.length, color: "#38bdf8" },
          { label: "Bookings", value: bookings.length, color: "#22c55e" },
          { label: "Confirmed", value: confirmed.length, color: "#facc15" },
          { label: "Revenue", value: "₹" + revenue, color: "#a78bfa" }
        ]);

        setRecentBookings(bookings.slice(0, 5));
      } catch (err) {
        console.error("Dashboard load failed", err);
      }
    };

    loadData();
  }, []);

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
                  <td className={styles.td}>{booking.property?.name}</td>
                  <td className={styles.td}>{booking.tenantName}</td>
                  <td className={styles.td}>{booking.amount}</td>
                  <td className={styles.td}>
                    <span
                      className={`${styles.statusBadge} ${
                        booking.status === "CONFIRMED"
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
