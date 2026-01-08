import React from "react";
import PGCard from "./PGCard";

const Listings = ({ pgListings, filter }) => {
  const { selectedCity, selectedBudget, selectedType, foodIncluded } = filter;

  const filtered = pgListings.filter((pg) => {
    if (selectedCity && !pg.location.toLowerCase().includes(selectedCity))
      return false;

    if (selectedType) {
      if (!pg.sharing.includes(`${selectedType}-sharing`)) return false;
    }

    if (foodIncluded && !pg.amenities.includes("Food")) return false;

    if (selectedBudget) {
      const amt = pg.price;
      if (selectedBudget === "5000-10000" && !(amt >= 5000 && amt <= 10000))
        return false;
      if (selectedBudget === "10000-15000" && !(amt > 10000 && amt <= 15000))
        return false;
      if (selectedBudget === "15000-20000" && !(amt > 15000 && amt <= 20000))
        return false;
      if (selectedBudget === "20000+" && !(amt > 20000)) return false;
    }

    return true;
  });

  return (
    <div className="row g-4">
      {filtered.length === 0 ? (
        <div className="col-12">
          <div style={{ color: "#a0aec0" }}>
            No PGs found matching your filters.
          </div>
        </div>
      ) : (
        filtered.map((pg) => (
          <div key={pg.id} className="col-md-4">
            <PGCard pg={pg} />
          </div>
        ))
      )}
    </div>
  );
};

export default Listings;
