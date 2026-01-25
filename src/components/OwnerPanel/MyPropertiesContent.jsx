import React, { useEffect, useState } from "react";
import styles from "./Owner.module.css";
import API from "../../api";
import { useNavigate } from "react-router-dom";

const MyPropertiesContent = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();   // 🔥 THIS WAS MISSING

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const res = await API.get("/api/owner/properties");
      setProperties(res.data);
    } catch (err) {
      console.error("Failed to load properties", err);
      alert("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id) => {
    if (!window.confirm("Delete this property?")) return;

    try {
      await API.delete(`/api/owner/properties/${id}`);

      // remove from UI instantly
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (loading) return <p className="text-center">Loading properties...</p>;

  return (
    <div>
      <h2 className={styles.sectionTitle}>My Properties</h2>

      {properties.length === 0 ? (
        <p className="text-center">No properties found</p>
      ) : (
        <div className="row g-4">
          {properties.map((p) => (
            <div key={p.id} className="col-md-4">
              <div className={styles.propertyCard}>
                <div className={styles.propertyImage}>🏠</div>

                <div className={styles.propertyBody}>
                  <h4 className={styles.propName}>{p.name}</h4>
                  <p className={styles.propLocation}>📍 {p.location}</p>

                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <span className={styles.smallLabel}>Price</span>
                      <p className={styles.propPrice}>₹{p.price}/month</p>
                    </div>
                    <div>
                      <span className={styles.smallLabel}>Rooms</span>
                      <p className={styles.propPrice}>{p.totalRooms}</p>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-light btn-sm flex-grow-1"
                      onClick={() => navigate(`/owner/property/${p.id}`)}
                    >
                      View
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm flex-grow-1"
                      onClick={() => deleteProperty(p.id)}
                    >
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPropertiesContent;
