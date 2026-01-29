import React, { useState } from "react";
import styles from "./AdminDashboard.module.css";

import DashboardContent from "./DashboardContent";
import UsersContent from "./UserContent";
import OwnersContent from "./OwnerContents";
import PropertiesContent from "./PropertiesContent";
import BookingsContent from "./BookingsContent";
import ReviewsContent from "./ReviewsContent";
import RequestsContent from "./RequestsContent";
import { logout } from "../../utils/frontAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "users", icon: "👥", label: "Users" },
    { id: "owners", icon: "🏢", label: "PG Owners" },
    { id: "properties", icon: "🏠", label: "Properties" },
    { id: "bookings", icon: "📅", label: "Bookings" },
    { id: "reviews", icon: "⭐", label: "Reviews" },
    { id: "requests", icon: "📋", label: "Requests" },
  ];

  return (
    <div className={styles.appWrapper}>
      <nav className={styles.headerNav}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <span className={styles.logoEmoji}>🏠</span>
            <h1 className={styles.appTitle}>PG Finder - Admin Panel</h1>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className={styles.welcomeText}>
              Welcome, <span className={styles.adminName}>Admin</span>
            </span>
            <button
              className={`btn btn-sm border-danger text-danger ${styles.logoutBtn}`}
              onClick={() => {
                logout();
                toast.info("Logged out successfully");
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="d-flex" style={{ height: "calc(100vh - 73px)", overflow: "hidden" }}>
        <aside className={styles.sidebar}>
          {menuItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`${styles.menuItem} ${active ? styles.menuItemActive : ""}`}
              >
                <span className={styles.menuIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            );
          })}
        </aside>

        <main className={styles.mainContent}>
          {activeTab === "dashboard" && <DashboardContent />}
          {activeTab === "users" && <UsersContent />}
          {activeTab === "owners" && <OwnersContent />}
          {activeTab === "properties" && <PropertiesContent />}
          {activeTab === "bookings" && <BookingsContent />}
          {activeTab === "reviews" && <ReviewsContent />}
          {activeTab === "requests" && <RequestsContent />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
