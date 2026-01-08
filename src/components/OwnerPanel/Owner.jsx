import React, { useState } from "react";
import styles from "./Owner.module.css";

import DashboardContent from "./DashboardContent";
import MyPropertiesContent from "./MyPropertiesContent";
import AddPropertyContent from "./AddPropertyContent";
import BookingsContent from "./BookingsContent";
import ProfileContent from "./ProfileContent";

const Owner = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    "Dashboard",
    "My Properties",
    "Add Property",
    "Bookings",
    "Profile",
  ];

  const normalize = (tab) => tab.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={styles.appWrapper}>
      <nav className={styles.headerNav}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <span className={styles.logoEmoji}>🏠</span>
            <h1 className={styles.appTitle}>PG Finder - Owner Panel</h1>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className={styles.welcomeText}>
              Welcome, <span className={styles.ownerName}>Aditya Sable</span>
            </span>
            <button className="btn btn-outline-light btn-sm">Logout</button>
          </div>
        </div>
      </nav>

      <div className={styles.tabsWrapper}>
        <div className="d-flex gap-4">
          {tabs.map((tab) => {
            const id = normalize(tab);
            const isActive = activeTab === id;
            return (
              <div
                key={id}
                onClick={() => setActiveTab(id)}
                className={`${styles.tabItem} ${
                  isActive ? styles.tabActive : ""
                }`}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.classList.add(styles.tabHover);
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    e.currentTarget.classList.remove(styles.tabHover);
                }}
              >
                {tab}
              </div>
            );
          })}
        </div>
      </div>


      <div className={styles.mainContent}>
        {activeTab === "dashboard" && <DashboardContent />}
        {activeTab === "my-properties" && <MyPropertiesContent />}
        {activeTab === "add-property" && <AddPropertyContent />}
        {activeTab === "bookings" && <BookingsContent />}
        {activeTab === "profile" && <ProfileContent />}
      </div>
    </div>
  );
};

export default Owner;
