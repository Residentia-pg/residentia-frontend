import React from "react";
import styles from "./ClientDashboard.module.css";

const SearchSection = ({
  selectedCity,
  setSelectedCity,
  selectedBudget,
  setSelectedBudget,
  selectedType,
  setSelectedType,
  foodIncluded,
  setFoodIncluded,
}) => {
  return (
    <div className={styles.searchCard}>
      <h2 className={styles.searchTitle}>Find Your Perfect PG</h2>

      <div className="row g-3 align-items-end">
        <div className="col-md-3">
          <label className={styles.label}>Location</label>
          <select
            className="form-select"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#d1d5db",
              color: "#374151",
              fontSize: 14,
            }}
          >
            <option value="">Select City</option>
            <option value="noida">Noida</option>
            <option value="bangalore">Bangalore</option>
            <option value="pune">Pune</option>
            <option value="mumbai">Mumbai</option>
            <option value="delhi">Delhi</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className={styles.label}>Budget Range</label>
          <select
            className="form-select"
            value={selectedBudget}
            onChange={(e) => setSelectedBudget(e.target.value)}
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#d1d5db",
              color: "#374151",
              fontSize: 14,
            }}
          >
            <option value="">Select Budget</option>
            <option value="5000-10000">₹5,000 - ₹10,000</option>
            <option value="10000-15000">₹10,000 - ₹15,000</option>
            <option value="15000-20000">₹15,000 - ₹20,000</option>
            <option value="20000+">₹20,000+</option>
          </select>
        </div>

        <div className="col-md-2">
          <label className={styles.label}>Sharing Type</label>
          <select
            className="form-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#d1d5db",
              color: "#374151",
              fontSize: 14,
            }}
          >
            <option value="">Select Type</option>
            <option value="1">1-sharing</option>
            <option value="2">2-sharing</option>
            <option value="3">3-sharing</option>
            <option value="4">4-sharing</option>
          </select>
        </div>

        <div className="col-md-2">
          <div className="form-check" style={{ paddingTop: "12px" }}>
            <input
              className="form-check-input"
              type="checkbox"
              id="foodIncluded"
              checked={foodIncluded}
              onChange={(e) => setFoodIncluded(e.target.checked)}
              style={{
                width: 18,
                height: 18,
                borderColor: "#d1d5db",
                cursor: "pointer",
              }}
            />
            <label
              className="form-check-label"
              htmlFor="foodIncluded"
              style={{
                marginLeft: 8,
                color: "#374151",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Food Included
            </label>
          </div>
        </div>

        <div className="col-md-2">
          <button
            className="btn w-100"
            style={{
              backgroundColor: "#3b82f6",
              color: "#ffffff",
              fontWeight: 600,
              fontSize: 14,
              padding: "10px 16px",
              border: "none",
              transition: "background-color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2563eb";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#3b82f6";
            }}
          >
            Search PGs
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
