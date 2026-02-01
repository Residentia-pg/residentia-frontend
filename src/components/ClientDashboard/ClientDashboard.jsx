import React, { useState, useEffect } from "react";
import styles from "./ClientDashboard.module.css";

import SearchSection from "./SearchSection";
import Listings from "./Listings";
import Navbar from "./Navbar";
import API from "../../api/api";
import { logout, getAuthUser } from "../../utils/frontAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ClientDashboard = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [foodIncluded, setFoodIncluded] = useState(false);

  const [pgListings, setPgListings] = useState([]);
  const [user, setUser] = useState({ name: "User" });
  const [selectedPg, setSelectedPg] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({ name: "", email: "", phone: "" });
  const [isBooking, setIsBooking] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [wishlist, setWishlist] = useState([]); // Array of PG IDs
  const [activeView, setActiveView] = useState("home"); // "home", "wishlist", "bookings"
  const [myBookings, setMyBookings] = useState([]);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editProfileData, setEditProfileData] = useState({ name: "", mobileNumber: "", password: "" });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  useEffect(() => {
    // 1. Get Auth User
    const authData = getAuthUser();
    if (authData && authData.user) {
      setUser(authData.user);
    } else {
      // Fallback or redirect if needed
    }

    // 2. Fetch PGs
    const fetchPGs = async () => {
      try {
        const res = await API.get("/api/pgs");
        setPgListings(res.data);
      } catch (error) {
        console.error("Error fetching PGs:", error);
        toast.error("Failed to load PGs");
      }
    };
    fetchPGs();

    // 3. Fetch Wishlist if user is logged in
    const fetchWishlist = async () => {
      if (authData && authData.user && authData.user.id) {
        try {
          const res = await API.get(`/api/wishlist/user/${authData.user.id}`);
          setWishlist(res.data);
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      }
    };
    fetchWishlist();

    if (authData && authData.user) {
      setBookingData({
        name: authData.user.name || "",
        email: authData.user.email || "",
        phone: authData.user.mobileNumber || authData.user.phone || ""
      });
    }
  }, []);

  // 4. Fetch full user profile when activeView is "profile"
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (activeView === "profile") {
        const authData = getAuthUser();
        if (authData && authData.user && authData.user.id) {
          try {
            const res = await API.get(`/api/clients/${authData.user.id}`);
            setUser(res.data);
          } catch (error) {
            console.error("Error fetching full profile:", error);
          }
        }
      }
    };
    fetchUserProfile();
  }, [activeView]);

  const fetchMyBookings = async () => {
    const auth = getAuthUser();
    if (auth && auth.user && auth.user.id) {
      try {
        const res = await API.get(`/api/pgs/user/${auth.user.id}/bookings`);
        setMyBookings(res.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }
  };

  useEffect(() => {
    if (activeView === "bookings") {
      fetchMyBookings();
    }
  }, [activeView]);

  const onToggleWishlist = async (pgId) => {
    const authData = getAuthUser();
    if (!authData || !authData.user) {
      toast.warn("Please login to use wishlist");
      return;
    }

    try {
      const res = await API.post("/api/wishlist/toggle", {
        userId: authData.user.id,
        pgId: pgId
      });

      if (res.data.status === "added") {
        setWishlist([...wishlist, pgId]);
        toast.success("Added to wishlist ❤️");
      } else {
        setWishlist(wishlist.filter(id => id !== pgId));
        toast.info("Removed from wishlist 🤍");
      }
    } catch (error) {
      toast.error("Wishlist update failed");
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsSavingProfile(true);
      const authData = getAuthUser();
      if (!authData || !authData.user || !authData.user.id) {
        toast.error("Please login again");
        return;
      }

      const updatePayload = {
        name: editProfileData.name,
        mobileNumber: editProfileData.mobileNumber
      };

      // Only include password if it's provided
      if (editProfileData.password && editProfileData.password.trim()) {
        updatePayload.passwordHash = editProfileData.password;
      }

      const res = await API.put(`/api/clients/${authData.user.id}`, updatePayload);

      // Update local user state
      setUser(prev => ({
        ...prev,
        name: res.data.name,
        mobileNumber: res.data.mobileNumber
      }));

      // Update local storage
      const updatedAuth = {
        ...authData,
        user: {
          ...authData.user,
          name: res.data.name,
          mobileNumber: res.data.mobileNumber
        }
      };
      localStorage.setItem("pg_auth", JSON.stringify(updatedAuth));

      toast.success("Profile updated successfully! 🎉");
      setShowEditProfileModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleBookNow = async (paymentId) => {
    try {
      setIsBooking(true);
      const payload = {
        clientName: bookingData.name,
        clientEmail: bookingData.email,
        clientPhone: bookingData.phone,
        paymentId: paymentId || null
      };
      await API.post(`/api/pgs/${selectedPg.id}/book`, payload);
      toast.success("Booking request submitted! Waiting for owner approval.");
      setShowBookingModal(false);
    } catch (error) {
      toast.error("Booking failed. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  const initRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!bookingData.name || !bookingData.phone) {
      toast.error("Please fill in all details");
      return;
    }
    if (!agreedToTerms) {
      toast.error("Please agree to terms and conditions");
      return;
    }

    const resScript = await initRazorpay();
    if (!resScript) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      setIsBooking(true);
      // Create order on backend (token amount ₹1,000 = 100000 paise)
      const orderRes = await API.post("/api/payment/create-order", { amount: 100000 });
      let order = orderRes.data;

      // Fallback in case backend returns string instead of object
      if (typeof order === 'string') {
        try {
          order = JSON.parse(order);
        } catch (e) {
          throw new Error("Invalid order response from server");
        }
      }

      if (!order.id) {
        throw new Error(order.error || "Failed to create order");
      }

      console.log("Order created:", order);

      const options = {
        key: "rzp_test_66fI2L3m4p5q6r", // Test key
        amount: order.amount,
        currency: order.currency,
        name: "Residentia PG",
        description: `Token for ${selectedPg.name}`,
        order_id: order.id,
        handler: async (response) => {
          // On Success
          handleBookNow(response.razorpay_payment_id);
        },
        prefill: {
          name: bookingData.name,
          email: bookingData.email,
          contact: bookingData.phone
        },
        theme: {
          color: "#2563eb"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error("Payment initiation failed.");
    } finally {
      setIsBooking(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className={styles.appWrapper}>
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        user={user}
        onLogout={() => {
          logout();
          toast.info("Logged out successfully");
          navigate("/");
        }}
        wishlistCount={wishlist.length}
      />

      {/* Main Content */}
      <div className={`container py-5 ${styles.container}`}>
        {activeView === "home" && (
          <>
            <SearchSection
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedBudget={selectedBudget}
              setSelectedBudget={setSelectedBudget}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              foodIncluded={foodIncluded}
              setFoodIncluded={setFoodIncluded}
            />

            <section>
              <h3 className={styles.sectionHeading}>Available PGs</h3>
              <Listings
                pgListings={pgListings}
                filter={{
                  selectedCity,
                  selectedBudget,
                  selectedType,
                  foodIncluded,
                }}
                wishlist={wishlist}
                onToggleWishlist={onToggleWishlist}
                onViewDetails={(pg) => {
                  setSelectedPg(pg);
                  setShowDetailModal(true);
                }}
                onBookNow={(pg) => {
                  setSelectedPg(pg);
                  setBookingData({
                    name: user.name || "",
                    email: user.email || "",
                    phone: user.mobileNumber || ""
                  });
                  setShowBookingModal(true);
                }}
              />
            </section>
          </>
        )}

        {activeView === "wishlist" && (
          <section>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className={styles.sectionHeading}>My Wishlist ❤️</h3>
              <button className="btn btn-outline-secondary btn-sm" onClick={() => setActiveView("home")}>Back to Search</button>
            </div>
            {wishlist.length === 0 ? (
              <div className="text-center py-5 bg-white rounded-4 shadow-sm">
                <div style={{ fontSize: '48px' }}>🤍</div>
                <p className="text-muted mt-3">Your wishlist is empty.</p>
                <button className="btn btn-primary mt-2" onClick={() => setActiveView("home")}>Browse PGs</button>
              </div>
            ) : (
              <Listings
                pgListings={pgListings.filter(pg => wishlist.includes(pg.id))}
                filter={{}}
                wishlist={wishlist}
                onToggleWishlist={onToggleWishlist}
                onViewDetails={(pg) => {
                  setSelectedPg(pg);
                  setShowDetailModal(true);
                }}
                onBookNow={(pg) => {
                  setSelectedPg(pg);
                  setShowBookingModal(true);
                }}
              />
            )}
          </section>
        )}

        {activeView === "bookings" && (
          <section>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className={styles.sectionHeading}>My Bookings 📑</h3>
              <button className="btn btn-outline-secondary btn-sm" onClick={() => setActiveView("home")}>Back to Search</button>
            </div>
            {myBookings.length === 0 ? (
              <div className="text-center py-5 bg-white rounded-4 shadow-sm">
                <div style={{ fontSize: '48px' }}>📭</div>
                <p className="text-muted mt-3">You haven't made any booking requests yet.</p>
                <button className="btn btn-primary mt-2" onClick={() => setActiveView("home")}>Find a PG</button>
              </div>
            ) : (
              <div className="row g-4">
                {myBookings.map(booking => (
                  <div key={booking.id} className="col-12">
                    <div className="bg-white p-4 rounded-4 shadow-sm border d-flex gap-4 align-items-center">
                      <img
                        src={booking.pgId?.imageUrl || "https://via.placeholder.com/120"}
                        alt=""
                        style={{ width: 120, height: 120, borderRadius: 12, objectFit: 'cover' }}
                      />
                      <div className="flex-grow-1">
                        <h5 className="mb-1">{booking.pgId?.propertyName}</h5>
                        <p className="text-muted small mb-3">{booking.pgId?.location}</p>
                        <div className="d-flex gap-4">
                          <div>
                            <div className="text-muted small">Request Date</div>
                            <div className="fw-bold">{new Date(booking.createdAt).toLocaleDateString()}</div>
                          </div>
                          <div>
                            <div className="text-muted small">Monthly Rent</div>
                            <div className="fw-bold">₹{booking.pgId?.rentAmount}</div>
                          </div>
                          <div>
                            <div className="text-muted small">Status</div>
                            <span className={`badge ${booking.status === 'APPROVED' || booking.status === 'CONFIRMED' ? 'bg-success' :
                              booking.status === 'REJECTED' ? 'bg-danger' : 'bg-warning text-dark'
                              }`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => {
                          setSelectedPg(booking.pgId);
                          setShowDetailModal(true);
                        }}
                      >
                        View PG
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeView === "profile" && (
          <section className="animate-fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className={styles.sectionHeading}>My Profile 👤</h3>
              <button className="btn btn-outline-secondary btn-sm" onClick={() => setActiveView("home")}>Back to Home</button>
            </div>

            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="bg-white p-5 rounded-4 shadow-sm border text-center">
                  <div className="mb-4 d-inline-block position-relative">
                    <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center mx-auto" style={{ width: 100, height: 100 }}>
                      <span style={{ fontSize: 40 }}>{user.name?.charAt(0) || "U"}</span>
                    </div>
                  </div>

                  <h2 className="mb-1 fw-bold">{user.name}</h2>
                  <p className="text-muted mb-4">{user.email}</p>

                  <div className="text-start border-top pt-4">
                    <div className="row g-4">
                      <div className="col-sm-6">
                        <div className="p-3 bg-light rounded-3 h-100">
                          <div className="text-muted small mb-1">Mobile Number</div>
                          <div className="fw-bold">{user.mobileNumber || "Not provided"}</div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="p-3 bg-light rounded-3 h-100">
                          <div className="text-muted small mb-1">Account Status</div>
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-success">Active</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="p-3 bg-light rounded-3 h-100">
                          <div className="text-muted small mb-1">Member Since</div>
                          <div className="fw-bold">{user.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "Recently Joined"}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <button className="btn btn-primary px-4 py-2 fw-bold" onClick={() => {
                      setEditProfileData({
                        name: user.name || "",
                        mobileNumber: user.mobileNumber || "",
                        password: ""
                      });
                      setShowEditProfileModal(true);
                    }}>
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Property Detail Modal */}
      {showDetailModal && selectedPg && (
        <div className={styles.modalOverlay} onClick={() => setShowDetailModal(false)}>
          <div className={styles.modalContent} style={{ maxWidth: '900px' }} onClick={e => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className={styles.modalTitle}>{selectedPg.propertyName || "PG Details"}</h2>
              <button className="btn-close" onClick={() => setShowDetailModal(false)}></button>
            </div>
            <div className="row g-4">
              <div className="col-md-5">
                <img src={selectedPg.imageUrl || "https://via.placeholder.com/400x300"} alt="" className="img-fluid rounded shadow-sm mb-3" />

                {/* Google Maps Embed Tool */}
                <div style={{ height: '250px', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedPg.address || selectedPg.propertyName + " " + selectedPg.location)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  ></iframe>
                </div>
              </div>
              <div className="col-md-7">
                <div className="d-flex gap-3 mb-4">
                  {selectedPg.rentAmount > 0 && (
                    <div className="p-3 rounded-3" style={{ background: '#f8fafc', border: '1px solid #f1f5f9', flex: 1 }}>
                      <p className="text-muted small mb-1">Monthly Rent</p>
                      <h4 className="mb-0 text-primary">₹{selectedPg.rentAmount.toLocaleString()}</h4>
                    </div>
                  )}
                  {selectedPg.sharingType && (
                    <div className="p-3 rounded-3" style={{ background: '#f8fafc', border: '1px solid #f1f5f9', flex: 1 }}>
                      <p className="text-muted small mb-1">Sharing Type</p>
                      <h4 className="mb-0 text-secondary">{selectedPg.sharingType}</h4>
                    </div>
                  )}
                </div>

                <div className="detail-info">
                  {(selectedPg.location || selectedPg.city) && (
                    <p className="mb-3"><strong>📍 Location:</strong> {selectedPg.city || selectedPg.location}</p>
                  )}
                  {selectedPg.address && (
                    <p className="mb-3"><strong>🏠 Full Address:</strong> {selectedPg.address}</p>
                  )}
                  {selectedPg.amenities && (
                    <div className="mb-3">
                      <strong>✨ Amenities:</strong>
                      <div className="d-flex gap-2 mt-2 flex-wrap">
                        {selectedPg.amenities.split(',').map((a, i) => (
                          <span key={i} className="badge bg-light text-dark border">{a.trim()}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {(selectedPg.availableBeds !== undefined && selectedPg.availableBeds !== null) && (
                    <p className="mb-3"><strong>🛏️ Available Beds:</strong> {selectedPg.availableBeds}</p>
                  )}
                  {(selectedPg.foodIncluded !== undefined && selectedPg.foodIncluded !== null) && (
                    <p className="mb-3"><strong>🍱 Food Included:</strong> {selectedPg.foodIncluded ? "Yes (3 meals/day)" : "No"}</p>
                  )}
                  {selectedPg.description && (
                    <div className="mt-4">
                      <strong>📝 Description:</strong>
                      <p className="text-muted mt-2">{selectedPg.description}</p>
                    </div>
                  )}
                </div>

                <div className="d-flex gap-2 mt-4 pt-3 border-top">
                  <button className="btn btn-outline-secondary flex-grow-1" onClick={() => onToggleWishlist(selectedPg.id)}>
                    {wishlist.includes(selectedPg.id) ? "❤️ Saved" : "🤍 Save to Wishlist"}
                  </button>
                  <button className="btn btn-primary flex-grow-1 py-2 fw-bold" onClick={() => {
                    setShowDetailModal(false);
                    setBookingData({
                      name: user.name || "",
                      email: user.email || "",
                      phone: user.mobileNumber || ""
                    });
                    setShowBookingModal(true);
                  }}>Confirm Booking Request</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Confirmation Modal */}
      {showBookingModal && selectedPg && (
        <div className={styles.modalOverlay} onClick={() => setShowBookingModal(false)}>
          <div className={styles.modalContent} style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className={styles.modalTitle}>Confirm Booking</h3>
              <button className="btn-close" onClick={() => setShowBookingModal(false)}></button>
            </div>

            <div className={styles.bookingSummary}>
              <div className="d-flex gap-3 mb-3">
                <img src={selectedPg.imageUrl || "https://via.placeholder.com/80"} alt="" style={{ width: 80, height: 80, borderRadius: 8, objectFit: 'cover' }} />
                <div>
                  <h5 className="mb-1">{selectedPg.propertyName}</h5>
                  <p className="text-muted small mb-0">{selectedPg.location}</p>
                </div>
              </div>
              <div className="d-flex justify-content-between py-2 border-top">
                <span>Monthly Rent</span>
                <span className="fw-bold">₹{selectedPg.rentAmount}</span>
              </div>
              <div className="d-flex justify-content-between py-2 border-top" style={{ color: '#059669' }}>
                <span>Token Amount (to pay now)</span>
                <span className="fw-bold">₹1,000</span>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={bookingData.name}
                onChange={e => setBookingData({ ...bookingData, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold">Phone Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter mobile number"
                value={bookingData.phone}
                onChange={e => setBookingData({ ...bookingData, phone: e.target.value })}
              />
            </div>

            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="termsCheck"
                checked={agreedToTerms}
                onChange={e => setAgreedToTerms(e.target.checked)}
              />
              <label className="form-check-label small text-muted" htmlFor="termsCheck">
                I agree to the terms and conditions and understand the token amount is non-refundable.
              </label>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary flex-grow-1"
                onClick={() => setShowBookingModal(false)}
                disabled={isBooking}
              >Cancel</button>
              <button
                className="btn btn-success flex-grow-1"
                onClick={() => handleBookNow("DEMO_PAYMENT_" + Date.now())}
                disabled={isBooking}
              >
                {isBooking ? (
                  <span className="spinner-border spinner-border-sm me-2"></span>
                ) : null}
                {isBooking ? "Processing..." : "✓ Confirm (Demo)"}
              </button>
              <button
                className="btn btn-primary flex-grow-1"
                onClick={handlePayment}
                disabled={isBooking}
              >
                {isBooking ? (
                  <span className="spinner-border spinner-border-sm me-2"></span>
                ) : null}
                {isBooking ? "Processing..." : "Pay ₹1,000 & Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className={styles.modalOverlay} onClick={() => setShowEditProfileModal(false)}>
          <div className={styles.modalContent} style={{ maxWidth: '450px' }} onClick={e => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className={styles.modalTitle}>Edit Profile</h3>
              <button className="btn-close" onClick={() => setShowEditProfileModal(false)}></button>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={editProfileData.name}
                onChange={e => setEditProfileData({ ...editProfileData, name: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">Mobile Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter mobile number"
                value={editProfileData.mobileNumber}
                onChange={e => setEditProfileData({ ...editProfileData, mobileNumber: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="form-label small fw-bold">New Password (leave blank to keep current)</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter new password"
                value={editProfileData.password}
                onChange={e => setEditProfileData({ ...editProfileData, password: e.target.value })}
              />
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary flex-grow-1"
                onClick={() => setShowEditProfileModal(false)}
                disabled={isSavingProfile}
              >Cancel</button>
              <button
                className="btn btn-primary flex-grow-1"
                onClick={handleSaveProfile}
                disabled={isSavingProfile || !editProfileData.name.trim()}
              >
                {isSavingProfile ? (
                  <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</>
                ) : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
