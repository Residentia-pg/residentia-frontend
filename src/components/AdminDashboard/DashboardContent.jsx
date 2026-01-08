import React from "react";
import styles from "./AdminDashboard.module.css";

const DashboardContent = ({ stats, activities }) => {
  return (
    <div>
      <h2 className={styles.sectionTitle}>Platform Overview</h2>

      <div className="row g-4 mb-5">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-3">
            <div className={styles.statCard}>
              <h3 style={{ color: stat.color }} className={styles.statValue}>
                {stat.value}
              </h3>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className={styles.subTitle}>Recent Activities</h3>
      <div className={styles.activityContainer}>
        {activities.map((activity, index) => (
          <div key={index} className={styles.activityItem}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5 className={styles.activityTitle}>{activity.title}</h5>
                <p className={styles.activityDesc}>{activity.description}</p>
              </div>
              <span className={styles.activityTime}>{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardContent;
