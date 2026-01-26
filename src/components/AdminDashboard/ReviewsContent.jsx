import React from "react";
import styles from "./AdminDashboard.module.css";

const ReviewsContent = () => {
  const reviews = [
    {
      id: 1,
      user: "Nathnarayan",
      property: "Green Valley PG",
      rating: 4.5,
      comment: "Great place to stay!",
      date: "Mar 10, 2024",
    },
    {
      id: 2,
      user: "POJO",
      property: "Comfort Stay",
      rating: 5.0,
      comment: "Excellent service and facilities",
      date: "Mar 12, 2024",
    },
    {
      id: 3,
      user: "Mayur Pande",
      property: "Student Hub PG",
      rating: 3.5,
      comment: "Good for students",
      date: "Mar 14, 2024",
    },
  ];

  return (
    <div>
      <h2 className={styles.sectionTitle}>Reviews</h2>

      <div className={styles.activityContainer}>
        {reviews.map((review) => (
          <div key={review.id} className={styles.activityItem}>
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h5 className={styles.activityTitle}>{review.user}</h5>
                <p className={styles.propertyLabel}>{review.property}</p>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className={styles.star}>⭐</span>
                <span className={styles.ratingValue}>{review.rating}</span>
              </div>
            </div>
            <p className={styles.activityDesc}>{review.comment}</p>
            <div className="d-flex justify-content-between align-items-center">
              <span className={styles.activityTime}>{review.date}</span>
              <div>
                <button className="btn btn-sm btn-outline-light me-2">
                  Approve
                </button>
                <button className="btn btn-sm btn-outline-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsContent;
