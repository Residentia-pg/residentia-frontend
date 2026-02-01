import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { toast } from "react-toastify";
import styles from "./Owner.module.css";

const ProfileContent = () => {
  const [owner, setOwner] = useState({
    id: "",
    name: "",
    email: "",
    mobileNumber: "",
    businessName: "",
    address: "",
    alternateContact: "",
    verificationStatus: "",
    isActive: false,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/owners/profile");
      setOwner(res.data);
    } catch (err) {
      toast.error(
        "Failed to load profile: " +
        (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      await API.put("/api/owners/profile", owner);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(
        "Update failed: " +
        (err.response?.data?.message || err.message)
      );
    }
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <h2 className={styles.sectionTitle}>Profile Settings</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>Full Name</label>
        <input
          className="form-control"
          value={owner.name || ""}
          onChange={(e) =>
            setOwner({ ...owner, name: e.target.value })
          }
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Email</label>
        <input
          className="form-control"
          value={owner.email || ""}
          disabled
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Mobile Number</label>
        <input
          className="form-control"
          value={owner.mobileNumber || ""}
          onChange={(e) =>
            setOwner({ ...owner, mobileNumber: e.target.value })
          }
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Business Name</label>
        <input
          className="form-control"
          value={owner.businessName || ""}
          onChange={(e) =>
            setOwner({ ...owner, businessName: e.target.value })
          }
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Address</label>
        <input
          className="form-control"
          value={owner.address || ""}
          onChange={(e) =>
            setOwner({ ...owner, address: e.target.value })
          }
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Alternate Contact</label>
        <input
          className="form-control"
          value={owner.alternateContact || ""}
          onChange={(e) =>
            setOwner({ ...owner, alternateContact: e.target.value })
          }
        />
      </div>

      <button className="btn btn-primary" onClick={updateProfile}>
        Update Profile
      </button>
    </div>
  );
};

export default ProfileContent;
