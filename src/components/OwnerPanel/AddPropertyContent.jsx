import React, { useState } from "react";
import styles from "./Owner.module.css";
import API from "../../api";

const AddPropertyContent = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    rooms: "",
    sharing: "",
    description: "",
    amenities: {
      wifi: false,
      ac: false,
      food: false,
      laundry: false,
      parking: false,
    },
  });

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    name: formData.name,
    location: formData.location,
    price: Number(formData.price),
    totalRooms: Number(formData.rooms),
    sharingType: formData.sharing,
    description: formData.description,

    wifi: formData.amenities.wifi,
    ac: formData.amenities.ac,
    food: formData.amenities.food,
    laundry: formData.amenities.laundry,
    parking: formData.amenities.parking
  };

  try {
    await API.post("/api/owner/properties", data);
    alert("Property added successfully!");
  } catch (err) {
    alert("Failed to add property");
    console.error(err.response?.data || err.message);
  }
};

  return (
    <div>
      <h2 className={styles.sectionTitle}>Add New Property</h2>

      <div className={styles.formCard}>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className={styles.label}>Property Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
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
            <label className={styles.label}>Location</label>
            <input
              type="text"
              className="form-control"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#d1d5db",
                color: "#374151",
                fontSize: 14,
              }}
              placeholder="Enter location"
            />
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <label className={styles.label}>Price per Month</label>
            <input
              type="number"
              className="form-control"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#d1d5db",
                color: "#374151",
                fontSize: 14,
              }}
              placeholder="Enter price"
            />
          </div>

          <div className="col-md-4">
            <label className={styles.label}>Total Rooms</label>
            <input
              type="number"
              className="form-control"
              value={formData.rooms}
              onChange={(e) =>
                setFormData({ ...formData, rooms: e.target.value })
              }
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#d1d5db",
                color: "#374151",
                fontSize: 14,
              }}
              placeholder="Enter number of rooms"
            />
          </div>

          <div className="col-md-4">
            <label className={styles.label}>Sharing Type</label>
            <select
              className="form-select"
              value={formData.sharing}
              onChange={(e) =>
                setFormData({ ...formData, sharing: e.target.value })
              }
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#d1d5db",
                color: "#374151",
                fontSize: 14,
              }}
            >
              <option value="">Select type</option>
              <option value="1">1-sharing</option>
              <option value="2">2-sharing</option>
              <option value="3">3-sharing</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className={styles.label}>Description</label>
          <textarea
            className="form-control"
            rows="4"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#d1d5db",
              color: "#374151",
              fontSize: 14,
            }}
            placeholder="Enter property description"
          />
        </div>

        <div className="mb-4">
          <label className={styles.label}>Amenities</label>
          <div className="d-flex gap-3 flex-wrap">
            {Object.keys(formData.amenities).map((amenity) => (
              <div key={amenity} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={amenity}
                  checked={formData.amenities[amenity]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amenities: {
                        ...formData.amenities,
                        [amenity]: e.target.checked,
                      },
                    })
                  }
                  style={{
                    borderColor: "#d1d5db",
                    width: 18,
                    height: 18,
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={amenity}
                  style={{
                    color: "#374151",
                    marginLeft: 8,
                    fontSize: 14,
                  }}
                >
                  {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleSubmit} className={`btn ${styles.primaryBtn}`}>
          Add Property
        </button>
      </div>
    </div>
  );
};

export default AddPropertyContent;
