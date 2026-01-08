import React from "react";

const PGCard = ({ pg }) => {
  return (
    <div
      className="pg-card"
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 8,
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        cursor: "pointer",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          backgroundColor: "#f3f4f6",
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 64,
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        {pg.image}
      </div>

      <div style={{ padding: 20 }}>
        <h4
          style={{
            fontSize: 18,
            fontWeight: 600,
            marginBottom: 6,
            color: "#1f2937",
          }}
        >
          {pg.name}
        </h4>
        <p
          style={{
            color: "#6b7280",
            fontSize: 14,
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span>📍</span> {pg.location}
        </p>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#059669",
              }}
            >
              ₹{pg.price.toLocaleString()}
            </span>
            <span
              style={{
                fontSize: 13,
                color: "#6b7280",
                marginLeft: 4,
              }}
            >
              /month
            </span>
          </div>
          <div>
            <span
              style={{
                backgroundColor: "#f3f4f6",
                padding: "6px 12px",
                borderRadius: 4,
                fontSize: 12,
                color: "#374151",
                fontWeight: 500,
                border: "1px solid #e5e7eb",
              }}
            >
              {pg.sharing}
            </span>
          </div>
        </div>

        <div className="d-flex gap-2 mb-3 flex-wrap">
          {pg.amenities.map((amenity, i) => (
            <span
              key={i}
              style={{
                backgroundColor: "#eff6ff",
                color: "#1e40af",
                padding: "4px 10px",
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {amenity}
            </span>
          ))}
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn flex-grow-1"
            style={{
              backgroundColor: "transparent",
              border: "1px solid #d1d5db",
              color: "#374151",
              padding: "10px 16px",
              borderRadius: 6,
              fontWeight: 500,
              fontSize: 14,
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f3f4f6";
              e.currentTarget.style.borderColor = "#9ca3af";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "#d1d5db";
            }}
          >
            View Details
          </button>
          <button
            className="btn flex-grow-1"
            style={{
              backgroundColor: "#3b82f6",
              border: "none",
              color: "#ffffff",
              padding: "10px 16px",
              borderRadius: 6,
              fontWeight: 600,
              fontSize: 14,
              transition: "background-color 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2563eb";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#3b82f6";
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PGCard;
