import React, { useState } from "react";
import styles from "./Owner.module.css";

const ProfileContent = () => {
  const [profile, setProfile] = useState({
    name: "Aditya Sabale",
    email: "Adii@gmail.com",
    phone: "+91 9876543210",
    city: "Mumbai",
  });

  return (
    <div>
      <h2 className={styles.sectionTitle}>Profile Settings</h2>

      <div className={styles.formCard}>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className={styles.label}>Full Name</label>
            <input
              className="form-control"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#d1d5db",
                color: "#374151",
                fontSize: 14,
              }}
            />
          </div>

          <div className="col-md-6">
            <label className={styles.label}>Email</label>
            <input
              className="form-control"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#d1d5db",
                color: "#374151",
                fontSize: 14,
              }}
            />
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className={styles.label}>Phone Number</label>
            <input
              className="form-control"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#d1d5db",
                color: "#374151",
                fontSize: 14,
              }}
            />
          </div>

          <div className="col-md-6">
            <label className={styles.label}>City</label>
            <input
              className="form-control"
              value={profile.city}
              onChange={(e) => setProfile({ ...profile, city: e.target.value })}
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#d1d5db",
                color: "#374151",
                fontSize: 14,
              }}
            />
          </div>
        </div>

        <button
          onClick={() => alert("Profile updated successfully!")}
          className={`btn ${styles.primaryBtn}`}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileContent;
