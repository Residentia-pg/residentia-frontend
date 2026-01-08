import React from "react";
import styles from "./Owner.module.css";

const MyPropertiesContent = () => {
  const properties = [
    {
      id: 1,
      name: "Green Valley PG",
      location: "Sector 18, Noida",
      price: "₹12,000",
      rooms: 10,
      occupied: 7,
      status: "Active",
    },
    {
      id: 2,
      name: "Comfort Stay",
      location: "Koramangala, Bangalore",
      price: "₹15,000",
      rooms: 8,
      occupied: 6,
      status: "Active",
    },
    {
      id: 3,
      name: "Student Hub PG",
      location: "Kothrud, Pune",
      price: "₹8,500",
      rooms: 12,
      occupied: 11,
      status: "Active",
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className={styles.sectionTitle}>My Properties</h2>
      </div>

      <div className="row g-4">
        {properties.map((property) => (
          <div key={property.id} className="col-md-4">
            <div className={styles.propertyCard}>
              <div className={styles.propertyImage}>🏠</div>
              <div className={styles.propertyBody}>
                <h4 className={styles.propName}>{property.name}</h4>
                <p className={styles.propLocation}>📍 {property.location}</p>

                <div className="d-flex justify-content-between mb-3">
                  <div>
                    <span className={styles.smallLabel}>Price</span>
                    <p className={styles.propPrice}>{property.price}/month</p>
                  </div>
                  <div>
                    <span className={styles.smallLabel}>Occupancy</span>
                    <p className={styles.propPrice}>
                      {property.occupied}/{property.rooms}
                    </p>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button className="btn btn-outline-light btn-sm flex-grow-1">
                    Edit
                  </button>
                  <button className="btn btn-outline-danger btn-sm flex-grow-1">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPropertiesContent;
