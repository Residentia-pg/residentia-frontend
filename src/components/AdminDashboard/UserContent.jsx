import React from "react";
import styles from "./AdminDashboard.module.css";

const UsersContent = () => {
  const users = [
    {
      id: 1,
      name: "Nathnarayan",
      email: "nathnarayan@gmail.com",
      status: "Active",
      joined: "Jan 15, 2024",
    },
    {
      id: 2,
      name: "POJO",
      email: "pojo@example.com",
      status: "Active",
      joined: "Feb 20, 2024",
    },
    {
      id: 3,
      name: "Mayur Pande",
      email: "mayur@example.com",
      status: "Inactive",
      joined: "Mar 10, 2024",
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className={styles.sectionTitle}>Users Management</h2>
        <button className={styles.primaryBtn}>Add User</button>
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
                <th className={styles.tableHead}>Status</th>
                <th className={styles.tableHead}>Joined</th>
                <th className={styles.tableHead}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className={styles.tableRow}>
                  <td className={styles.tableCellName}>{user.name}</td>
                  <td className={styles.tableCell}>{user.email}</td>
                  <td className={styles.tableCell}>
                    <span
                      className={`${styles.badge} ${
                        user.status === "Active"
                          ? styles.badgeGreen
                          : styles.badgeRed
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className={styles.tableCell}>{user.joined}</td>
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

export default UsersContent;
