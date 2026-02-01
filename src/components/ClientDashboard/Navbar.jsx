import React from "react";
import styles from "./ClientDashboard.module.css";

const Navbar = ({ activeView, setActiveView, user, onLogout, wishlistCount }) => {
    return (
        <nav className={styles.headerNav}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-4">
                    <div
                        className="d-flex align-items-center"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setActiveView("home")}
                    >
                        <span className={styles.logoEmoji}>🏠</span>
                        <h1 className={styles.brandTitle}>PG Finder</h1>
                    </div>

                    <div className="d-none d-md-flex align-items-center gap-2 ms-4">
                        <button
                            className={`${styles.navLink} ${activeView === "home" ? styles.navLinkActive : ""}`}
                            onClick={() => setActiveView("home")}
                        >
                            Home
                        </button>
                        <button
                            className={`${styles.navLink} ${activeView === "wishlist" ? styles.navLinkActive : ""}`}
                            onClick={() => setActiveView("wishlist")}
                            style={{ position: 'relative' }}
                        >
                            Wishlist
                            {wishlistCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '10px' }}>
                                    {wishlistCount}
                                </span>
                            )}
                        </button>
                        <button
                            className={`${styles.navLink} ${activeView === "bookings" ? styles.navLinkActive : ""}`}
                            onClick={() => setActiveView("bookings")}
                        >
                            My Bookings
                        </button>
                        <button
                            className={`${styles.navLink} ${activeView === "profile" ? styles.navLinkActive : ""}`}
                            onClick={() => setActiveView("profile")}
                        >
                            My Profile
                        </button>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                    <div className="d-none d-sm-block text-end">
                        <div className={styles.welcomeText}>Welcome,</div>
                        <div className={styles.userName}>{user.name}</div>
                    </div>
                    <button
                        className={`btn btn-outline-danger btn-sm ${styles.logoutBtn}`}
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
