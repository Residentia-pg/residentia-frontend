import React, { useState } from "react";
import styles from "./Owner.module.css";
import { createProperty } from "../../api/propertyApi";

const AddPropertyContent = () => {
  const [formData, setFormData] = useState({
    propertyName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    rentAmount: "",
    sharingType: "",
    maxCapacity: "",
    availableBeds: "",
    foodIncluded: false,
    description: "",
    status: "ACTIVE",
    imageUrl: "",
  });

  const [amenities, setAmenities] = useState({
    wifi: false,
    parking: false,
    gym: false,
    laundry: false,
    kitchen: false,
    ac: false,
    tv: false,
    hotWater: false,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const amenitiesArray = Object.keys(amenities)
      .filter((key) => amenities[key])
      .map((key) => {
        const amenityNames = {
          wifi: "WiFi",
          parking: "Parking",
          gym: "Gym",
          laundry: "Laundry",
          kitchen: "Kitchen",
          ac: "AC",
          tv: "TV",
          hotWater: "Hot Water",
        };
        return amenityNames[key];
      })
      .join(",");

    const data = {
      propertyName: formData.propertyName,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      rentAmount: Number(formData.rentAmount),
      sharingType: formData.sharingType,
      maxCapacity: Number(formData.maxCapacity),
      availableBeds: Number(formData.availableBeds),
      foodIncluded: formData.foodIncluded,
      description: formData.description,
      status: formData.status,
      amenities: amenitiesArray || null,
      imageUrl: formData.imageUrl || null,
    };

    try {
      await createProperty(data);
      alert("Property added successfully!");
      // Reset form
      setFormData({
        propertyName: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        rentAmount: "",
        sharingType: "",
        maxCapacity: "",
        availableBeds: "",
        foodIncluded: false,
        description: "",
        status: "ACTIVE",
        imageUrl: "",
      });
      setAmenities({
        wifi: false,
        parking: false,
        gym: false,
        laundry: false,
        kitchen: false,
        ac: false,
        tv: false,
        hotWater: false,
      });
    } catch (err) {
      alert("Failed to add property: " + (err.message || "Unknown error"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAmenityChange = (e) => {
    const { name, checked } = e.target;
    setAmenities({
      ...amenities,
      [name]: checked,
    });
  };

  return (
    <div>
      <h2 className={styles.sectionTitle}>Add New Property</h2>

      <div className={styles.formCard}>
        <form onSubmit={handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className={styles.label}>Property Name *</label>
              <input
                type="text"
                className="form-control"
                name="propertyName"
                value={formData.propertyName}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#d1d5db",
                  color: "#374151",
                  fontSize: 14,
                }}
                placeholder="Enter property name"
              />
            </div>

            <div className="col-md-6">
              <label className={styles.label}>Address *</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#d1d5db",
                  color: "#374151",
                  fontSize: 14,
                }}
                placeholder="Enter address"
              />
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-3">
              <label className={styles.label}>City *</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#d1d5db",
                  color: "#374151",
                  fontSize: 14,
                }}
                placeholder="Enter city"
              />
            </div>

            <div className="col-md-3">
              <label className={styles.label}>State *</label>
              <input
                type="text"
                className="form-control"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#d1d5db",
                  color: "#374151",
                  fontSize: 14,
                }}
                placeholder="Enter state"
              />
            </div>

            <div className="col-md-3">
              <label className={styles.label}>Pincode *</label>
              <input
                type="text"
                className="form-control"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#d1d5db",
                  color: "#374151",
                  fontSize: 14,
                }}
                placeholder="Enter pincode"
              />
            </div>

            <div className="col-md-3">
              <label className={styles.label}>Rent Amount *</label>
              <input
                type="number"
                className="form-control"
                name="rentAmount"
                value={formData.rentAmount}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#d1d5db",
                  color: "#374151",
                  fontSize: 14,
                }}
                placeholder="Enter rent"
              />
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label className={styles.label}>Sharing Type *</label>
              <select
                className="form-select"
                name="sharingType"
                value={formData.sharingType}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#d1d5db",
                  color: "#374151",
                  fontSize: 14,
                }}
              >
                <option value="">Select type</option>
                <option value="1-Sharing">1-Sharing</option>
                <option value="2-Sharing">2-Sharing</option>
                <option value="3-Sharing">3-Sharing</option>
                <option value="4-Sharing">4-Sharing</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className={styles.label}>Max Capacity *</label>
              <input
                type="number"
                className="form-control"
                name="maxCapacity"
                value={formData.maxCapacity}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#d1d5db",
                  color: "#374151",
                  fontSize: 14,
                }}
                placeholder="Enter max capacity"
              />
            </div>

            <div className="col-md-4">
              <label className={styles.label}>Available Beds *</label>
              <input
                type="number"
                className="form-control"
                name="availableBeds"
                value={formData.availableBeds}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#d1d5db",
                  color: "#374151",
                  fontSize: 14,
                }}
                placeholder="Enter available beds"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className={styles.label}>Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#d1d5db",
                color: "#374151",
                fontSize: 14,
              }}
              placeholder="Enter property description"
            />
          </div>

          <div className="mb-3">
            <label className={styles.label}>Image URL</label>
            <input
              type="url"
              className="form-control"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#d1d5db",
                color: "#374151",
                fontSize: 14,
              }}
              placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
            />
            {formData.imageUrl && (
              <div style={{ marginTop: "10px", textAlign: "center" }}>
                <img
                  src={formData.imageUrl}
                  alt="Property preview"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db"
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="foodIncluded"
                name="foodIncluded"
                checked={formData.foodIncluded}
                onChange={handleChange}
                style={{
                  borderColor: "#d1d5db",
                  width: 18,
                  height: 18,
                }}
              />
              <label className="form-check-label" htmlFor="foodIncluded" style={{
                color: "#374151",
                marginLeft: 8,
                fontSize: 14,
              }}>
                Food Included
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className={styles.label}>Amenities</label>
            <div className="row g-3">
              {[
                { key: "wifi", label: "WiFi" },
                { key: "parking", label: "Parking" },
                { key: "gym", label: "Gym" },
                { key: "laundry", label: "Laundry" },
                { key: "kitchen", label: "Kitchen" },
                { key: "ac", label: "AC" },
                { key: "tv", label: "TV" },
                { key: "hotWater", label: "Hot Water" },
              ].map((amenity) => (
                <div className="col-md-3" key={amenity.key}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={amenity.key}
                      name={amenity.key}
                      checked={amenities[amenity.key]}
                      onChange={handleAmenityChange}
                      style={{
                        borderColor: "#d1d5db",
                        width: 18,
                        height: 18,
                      }}
                    />
                    <label className="form-check-label" htmlFor={amenity.key} style={{
                      color: "#374151",
                      marginLeft: 8,
                      fontSize: 14,
                    }}>
                      {amenity.label}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn ${styles.primaryBtn}`}
          >
            {loading ? "Adding..." : "Add Property"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyContent;
