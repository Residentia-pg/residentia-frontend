import React from "react";
import PGCard from "./PGCard";

const Listings = ({ pgListings, filter, onViewDetails, onBookNow, wishlist, onToggleWishlist }) => {
  const { selectedCity, selectedBudget, selectedType, foodIncluded } = filter;

  const filtered = pgListings.filter((pg) => {
    // Filter out "junk" data (incomplete database records)
    // Filter out rows with no name (incomplete)
    // if (!pg.propertyName) return false; // excessively strict for debugging

    if (selectedCity && (!pg.location || !pg.location.toLowerCase().includes(selectedCity)))
      return false;

    if (selectedType) {
      if (!pg.sharingType || !pg.sharingType.includes(`${selectedType}-sharing`)) return false;
    }

    if (foodIncluded && (!pg.amenities || !pg.amenities.includes("Food"))) return false;

    if (selectedBudget) {
      const amt = pg.rentAmount;
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
      {pgListings.length === 0 ? (
        <div className="col-12 text-center py-5">
          <div style={{ color: "#6b7280", fontSize: "18px" }}>
            Owner has not registered any PGs.
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="col-12 text-center py-5">
          <div style={{ color: "#6b7280", fontSize: "16px" }}>
            No PGs found matching your search criteria.
          </div>
        </div>
      ) : (
        filtered.map((pg) => (
          <div key={pg.id} className="col-md-4">
            <PGCard
              pg={pg}
              onViewDetails={onViewDetails}
              onBookNow={onBookNow}
              isWishlisted={wishlist.includes(pg.id)}
              onToggleWishlist={onToggleWishlist}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Listings;
