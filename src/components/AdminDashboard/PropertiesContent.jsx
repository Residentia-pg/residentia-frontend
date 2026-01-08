import React from "react";
import styles from "./AdminDashboard.module.css";

const PropertiesContent = () => {
  const properties = [
    {
      id: 1,
      name: "Green Valley PG",
      owner: "Anand Kulkarni",
      location: "Sector 18, Noida",
      price: 12000,
      status: "Active",
    },
    {
      id: 2,
      name: "Comfort Stay",
      owner: "Abhijeet Darade",
      location: "Koramangala, Bangalore",
      price: 15000,
      status: "Active",
    },
    {
      id: 3,
      name: "Student Hub PG",
      owner: "POJO",
      location: "Kothrud, Pune",
      price: 8500,
      status: "Pending",
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className={styles.sectionTitle}>Properties</h2>
        <button className={styles.primaryBtn}>Add Property</button>
      </div>

      <div className={styles.tableWrapper}>
        <div className="table-responsive">
          <table
            className="table table-dark table-hover"
            style={{ marginBottom: 0 }}
          >
            <thead>
              <tr className={styles.tableHeadRow}>
                <th className={styles.tableHead}>Property Name</th>
                <th className={styles.tableHead}>Owner</th>
                <th className={styles.tableHead}>Location</th>
                <th className={styles.tableHead}>Price</th>
                <th className={styles.tableHead}>Status</th>
                <th className={styles.tableHead}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id} className={styles.tableRow}>
                  <td className={styles.propName}>{property.name}</td>
                  <td className={styles.tableCell}>{property.owner}</td>
                  <td className={styles.tableCell}>{property.location}</td>
                  <td className={styles.tableCellPrice}>
                    ₹{property.price.toLocaleString()}
                  </td>
                  <td className={styles.tableCell}>
                    <span
                      className={`${styles.badge} ${
                        property.status === "Active"
                          ? styles.badgeGreen
                          : styles.badgeRed
                      }`}
                    >
                      {property.status}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <button className="btn btn-sm btn-outline-light me-2">
                      Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      Delete
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

export default PropertiesContent;
