import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api";
import styles from "./Owner.module.css";

const ViewProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    API.get(`/api/owner/properties/${id}`)
      .then(res => setProperty(res.data))
      .catch(() => alert("Property not found"));
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <div className={styles.formCard}>
      <h2>{property.name}</h2>
      <p>📍 {property.location}</p>
      <p>₹ {property.price} / month</p>
      <p>Rooms: {property.totalRooms}</p>
      <p>{property.description}</p>

      <button className="btn btn-light" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default ViewProperty;
