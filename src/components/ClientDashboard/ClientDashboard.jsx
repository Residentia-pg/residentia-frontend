import React, { useState, useEffect } from "react";
import ProfileContent from "./ProfileContent";
import SearchSection from "./SearchSection";
import Listings from "./Listings";
import MyBookings from "./MyBookings";
import styles from "./ClientDashboard.module.css";
import { getAuthUser, logout } from "../../utils/frontAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [pgListings, setPgListings] = useState([]);
  const [userName, setUserName] = useState("Client");

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [foodIncluded, setFoodIncluded] = useState(true);

  useEffect(() => {
    const auth = getAuthUser();
    if (auth?.user?.name) setUserName(auth.user.name);
    else if (auth?.name) setUserName(auth.name);
  }, []);

  useEffect(() => {
    fetch("http://localhost:8888/api/client/properties")
      .then(res => res.json())
      .then(setPgListings)
      .catch(() => toast.error("Failed to load properties"));
  }, []);

  return (
    <div className={styles.appWrapper}>
      {/* HEADER */}
      <header className={styles.headerNav}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <span className={styles.logoEmoji}>🏠</span>
            <h1 className={styles.appTitle}>PG Finder</h1>
          </div>

          <div className={styles.headerRight}>
            <span className={styles.welcomeText}>
              Welcome, <strong>{userName}</strong>
            </span>
            <button
              className={styles.logoutBtn}
              onClick={() => {
                logout();
                toast.info("Logged out");
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* TABS */}
      <div className={styles.tabsWrapper}>
        <button
          className={`${styles.tabItem} ${activeTab === "dashboard" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          Explore
        </button>
        <button
          className={`${styles.tabItem} ${activeTab === "mybookings" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("mybookings")}
        >
          My Bookings
        </button>
        <button
          className={`${styles.tabItem} ${activeTab === "profile" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
      </div>

      {/* CONTENT */}
      <main className={styles.mainContent}>
        {activeTab === "dashboard" && (
          <>
            <SearchSection
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedBudget={selectedBudget}
              setSelectedBudget={setSelectedBudget}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              foodIncluded={foodIncluded}
              setFoodIncluded={setFoodIncluded}
            />

            <h2 className={styles.sectionTitle}>Available PGs</h2>

            <Listings
              pgListings={pgListings}
              filter={{ selectedCity, selectedBudget, selectedType, foodIncluded }}
            />
          </>
        )}

        {activeTab === "mybookings" && <MyBookings />}
        {activeTab === "profile" && <ProfileContent />}
      </main>
    </div>
  );
};

export default ClientDashboard;
