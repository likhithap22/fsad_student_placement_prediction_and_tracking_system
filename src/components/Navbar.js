import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const profileImage = localStorage.getItem("profileImage");

  return (
    <div style={styles.navbar}>
      
      {/* Left Side */}
      <h2 style={styles.logo}>Placement System</h2>

      {/* Right Side */}
      <div style={styles.right}>
        
        {/* Profile Icon */}
        <img
          src={profileImage || "https://via.placeholder.com/40"}
          alt="profile"
          style={styles.profile}
          onClick={() => navigate("/profile")}
        />

        {/* Logout */}
        <button style={styles.logout} onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
}

/* 🎨 Styles */
const styles = {
  navbar: {
    background: "rgba(0,0,0,0.8)",
    color: "white",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  logo: {
    margin: 0,
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  profile: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    objectFit: "cover",
    cursor: "pointer",
    border: "2px solid #00dbde",
  },
  logout: {
    padding: "8px 15px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
};

export default Navbar;