import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const bookingId = params.get("bookingId");

  const handleFakePayment = () => {
    toast.success("Payment completed (placeholder)");
    // In a real flow you'd notify backend and redirect to booking confirmation
    navigate("/client");
  };

  return (
    <div style={{ padding: 24 }}>
      <h3>Payment</h3>
      <p>Booking ID: {bookingId}</p>
      <p>This is a placeholder payment page. Integrate your gateway here.</p>
      <button className="btn btn-success" onClick={handleFakePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;
