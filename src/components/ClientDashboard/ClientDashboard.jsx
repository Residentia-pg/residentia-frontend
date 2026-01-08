import React, { useState } from "react";
import styles from "./ClientDashboard.module.css";

import SearchSection from "./SearchSection";
import Listings from "./Listings";
import { pgListings as initialPgListings } from "./pgData";

const ClientDashboard = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [foodIncluded, setFoodIncluded] = useState(false);

  const [pgListings] = useState(initialPgListings);

  return (
    <div className={styles.appWrapper}>
      {/* Header */}
      <nav className={styles.headerNav}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <span className={styles.logoEmoji}>🏠</span>
            <h1 className={styles.brandTitle}>PG Finder</h1>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className={styles.welcomeText}>
              Welcome, <span className={styles.userName}>Sonam Chaurasiya</span>
            </span>
            <button className="btn btn-outline-light btn-sm">Logout</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className={`container py-5 ${styles.container}`}>
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

        <section>
          <h3 className={styles.sectionHeading}>Available PGs</h3>
          <Listings
            pgListings={pgListings}
            filter={{
              selectedCity,
              selectedBudget,
              selectedType,
              foodIncluded,
            }}
          />
        </section>
      </div>
    </div>
  );
};

export default ClientDashboard;
