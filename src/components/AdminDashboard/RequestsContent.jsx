import React from "react";
import styles from "./AdminDashboard.module.css";

const RequestsContent = () => {
  const requests = [
    {
      id: 1,
      user: "Snehal Jadhav",
      property: "Sunrise PG",
      type: "New Listing",
      date: "Mar 16, 2024",
      status: "Pending",
    },
    {
      id: 2,
      user: "Nilesh Pawar",
      property: "City Center PG",
      type: "Verification",
      date: "Mar 17, 2024",
      status: "Under Review",
    },
    {
      id: 3,
      user: "Vrushab K",
      property: "Downtown PG",
      type: "Update",
      date: "Mar 18, 2024",
      status: "Approved",
    },
  ];

  return (
    <div>
      <h2 className={styles.sectionTitle}>Requests</h2>

      <div className={styles.tableWrapper}>
        <div className="table-responsive">
          <table
            className="table table-dark table-hover"
            style={{ marginBottom: 0 }}
          >
            <thead>
              <tr className={styles.tableHeadRow}>
                <th className={styles.tableHead}>Request ID</th>
                <th className={styles.tableHead}>User</th>
                <th className={styles.tableHead}>Property</th>
                <th className={styles.tableHead}>Type</th>
                <th className={styles.tableHead}>Date</th>
                <th className={styles.tableHead}>Status</th>
                <th className={styles.tableHead}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>#{request.id}</td>
                  <td className={styles.tableCell}>{request.user}</td>
                  <td className={styles.tableCellAlt}>{request.property}</td>
                  <td className={styles.tableCell}>{request.type}</td>
                  <td className={styles.tableCell}>{request.date}</td>
                  <td className={styles.tableCell}>
                    <span
                      className={`${styles.badge} ${
                        request.status === "Approved"
                          ? styles.badgeGreen
                          : request.status === "Pending"
                          ? styles.badgeRed
                          : styles.badgeOrange
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <button className="btn btn-sm btn-outline-success me-2">
                      Approve
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      Reject
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

export default RequestsContent;
