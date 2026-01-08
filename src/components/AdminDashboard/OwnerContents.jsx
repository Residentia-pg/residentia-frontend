import React from "react";
import styles from "./AdminDashboard.module.css";

const OwnersContent = () => {
  const owners = [
    {
      id: 1,
      name: "Anand Kulkarni",
      email: "anand@gmail.com",
      properties: 3,
      verified: true,
      joined: "Dec 15, 2023",
    },
    {
      id: 2,
      name: "Abhijeet Darade",
      email: "abhi@gmail.com",
      properties: 5,
      verified: true,
      joined: "Jan 10, 2024",
    },
    {
      id: 3,
      name: "POJO",
      email: "pojo@gmail.com",
      properties: 2,
      verified: false,
      joined: "Feb 05, 2024",
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className={styles.sectionTitle}>PG Owners</h2>
        <button className={styles.primaryBtn}>Add Owner</button>
      </div>

      <div className={styles.tableWrapper}>
        <div className="table-responsive">
          <table
            className="table table-dark table-hover"
            style={{ marginBottom: 0 }}
          >
            <thead>
              <tr className={styles.tableHeadRow}>
                <th className={styles.tableHead}>Name</th>
                <th className={styles.tableHead}>Email</th>
                <th className={styles.tableHead}>Properties</th>
                <th className={styles.tableHead}>Status</th>
                <th className={styles.tableHead}>Joined</th>
                <th className={styles.tableHead}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {owners.map((owner) => (
                <tr key={owner.id} className={styles.tableRow}>
                  <td className={styles.tableCellName}>{owner.name}</td>
                  <td className={styles.tableCell}>{owner.email}</td>
                  <td className={styles.tableCell}>{owner.properties}</td>
                  <td className={styles.tableCell}>
                    <span
                      className={`${styles.badge} ${
                        owner.verified ? styles.badgeGreen : styles.badgeRed
                      }`}
                    >
                      {owner.verified ? "Verified" : "Pending"}
                    </span>
                  </td>
                  <td className={styles.tableCell}>{owner.joined}</td>
                  <td className={styles.tableCell}>
                    <button className="btn btn-sm btn-outline-light me-2">
                      View
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      Remove
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

export default OwnersContent;
