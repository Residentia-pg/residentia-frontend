import React from "react";

const PGCard = ({ pg, onViewDetails, onBookNow, isWishlisted, onToggleWishlist }) => {
  return (
    <div
      className="pg-card"
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        height: "100%",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-12px)";
        e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.05)";
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = "scale(1)";
      }}
    >
      <div
        style={{
          backgroundColor: "#f9fafb",
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #e5e7eb",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {pg.imageUrl ? (
          <img
            src={pg.imageUrl}
            alt={pg.propertyName}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=400"; // Beautiful fallback house
            }}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#9ca3af' }}>
            <span style={{ fontSize: 48, marginBottom: 8 }}>🏠</span>
            <span style={{ fontSize: 12, fontWeight: 500 }}>No Image Available</span>
          </div>
        )}

        {/* Wishlist Heart Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist && onToggleWishlist(pg.id);
          }}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "white",
            border: "none",
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            cursor: "pointer",
            zIndex: 10,
            transition: "all 0.2s"
          }}
        >
          <span style={{ color: isWishlisted ? "#ef4444" : "#9ca3af", fontSize: 18 }}>
            {isWishlisted ? "❤️" : "🤍"}
          </span>
        </button>
      </div>

      <div style={{ padding: 24 }}>
        <h4
          style={{
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 6,
            color: "#111827",
            letterSpacing: "-0.025em"
          }}
        >
          {pg.propertyName || "Unnamed PG"}
        </h4>
        <p
          style={{
            color: "#6b7280",
            fontSize: 13,
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ color: '#ef4444' }}>📍</span> {pg.location || "Location not specified"}
        </p>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#10b981",
              }}
            >
              {pg.rentAmount > 0 ? `₹${pg.rentAmount.toLocaleString()}` : "Contact for Price"}
            </span>
            {pg.rentAmount > 0 && (
              <span
                style={{
                  fontSize: 12,
                  color: "#9ca3af",
                  marginLeft: 4,
                }}
              >
                /month
              </span>
            )}
          </div>
          <div>
            <span
              style={{
                backgroundColor: "#f3f4f6",
                padding: "4px 10px",
                borderRadius: 4,
                fontSize: 11,
                color: "#4b5563",
                fontWeight: 600,
                border: "1px solid #e5e7eb",
              }}
            >
              {pg.sharingType || "N/A"}
            </span>
          </div>
        </div>

        {/* Extra Details */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, background: '#e0e7ff', color: '#3730a3', padding: '4px 8px', borderRadius: 4, fontWeight: 600 }}>
            🛏️ {pg.availableBeds ?? "?"} Beds Left
          </span>
          <span style={{ fontSize: 11, background: pg.foodIncluded ? '#dcfce7' : '#fee2e2', color: pg.foodIncluded ? '#166534' : '#991b1b', padding: '4px 8px', borderRadius: 4, fontWeight: 600 }}>
            {pg.foodIncluded ? "🍱 Food Inc." : "❌ No Food"}
          </span>
        </div>
      </div>

      <div className="d-flex gap-2 mb-4 flex-wrap">
        {(pg.amenities ? pg.amenities.split(",") : []).map((amenity, i) => (
          <span
            key={i}
            style={{
              backgroundColor: "#eff6ff",
              color: "#2563eb",
              padding: "4px 10px",
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {amenity.trim()}
          </span>
        ))}
        {(!pg.amenities) && <span style={{ color: '#9ca3af', fontSize: 11, fontStyle: 'italic' }}>No amenities listed</span>}
      </div>

      <div className="d-flex gap-2">
        <button
          className="btn btn-sm flex-grow-1"
          onClick={() => onViewDetails && onViewDetails(pg)}
          style={{
            backgroundColor: "transparent",
            border: "1px solid #e2e8f0",
            color: "#334155",
            padding: "10px 12px",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 13,
            transition: "all 0.2s"
          }}
        >
          View Details
        </button>
        <button
          className="btn btn-sm flex-grow-1"
          onClick={() => onBookNow && onBookNow(pg)}
          style={{
            backgroundColor: "#2563eb",
            border: "none",
            color: "#ffffff",
            padding: "10px 12px",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 13,
            boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)",
            transition: "all 0.2s"
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default PGCard;
