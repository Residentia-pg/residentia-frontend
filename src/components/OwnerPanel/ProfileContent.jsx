import React, { useEffect, useState } from "react";
import API from "../../api";
import styles from "./Owner.module.css";

const ProfileContent = () => {
  const [owner, setOwner] = useState({
    name: "",
    email: "",
    phone: "",
    city: ""
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await API.get("/api/owner/profile");
      setOwner(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load profile");
    }
  };

  const updateProfile = async () => {
    try {
      await API.put("/api/owner/profile", owner);
      alert("Profile updated");
    } catch {
      alert("Update failed");
    }
  };

  return (
    <div>
      <h2 className={styles.sectionTitle}>Profile Settings</h2>

      <input
        className="form-control mb-2"
        value={owner.name}
        onChange={(e) => setOwner({ ...owner, name: e.target.value })}
        placeholder="Name"
      />

      <input
        className="form-control mb-2"
        value={owner.email}
        onChange={(e) => setOwner({ ...owner, email: e.target.value })}
        placeholder="Email"
      />

      <input
        className="form-control mb-2"
        value={owner.phone}
        onChange={(e) => setOwner({ ...owner, phone: e.target.value })}
        placeholder="Phone"
      />

      <input
        className="form-control mb-2"
        value={owner.city}
        onChange={(e) => setOwner({ ...owner, city: e.target.value })}
        placeholder="City"
      />

      <button className="btn btn-primary" onClick={updateProfile}>
        Update Profile
      </button>
    </div>
  );
};

export default ProfileContent;
