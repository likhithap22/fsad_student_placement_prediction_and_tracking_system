import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (user.username && user.password) {
      localStorage.setItem("isLoggedIn", "true");

      // ✅ keep this (no change)
      localStorage.setItem("username", user.username);

      // ✅ ONLY CHANGE: go to register page
      navigate("/register");  // 🔥 changed from "/home"
    } else {
      alert("Enter username & password");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <h1>Placement Tracker</h1>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) =>
              setUser({ ...user, username: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;