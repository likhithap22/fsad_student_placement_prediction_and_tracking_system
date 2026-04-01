import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/registration.css";

function Registration() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setForm((prev) => ({ ...prev, username: savedUsername }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.username || !form.email || !form.phone) {
      alert("Please fill all fields");
      return;
    }

    localStorage.setItem("userProfile", JSON.stringify(form));
    localStorage.setItem("isLoggedIn", "true");

    navigate("/home");
  };

  return (
    <div className="reg-container">
      <div className="reg-card">

        <h2>Create Your Profile 🚀</h2>
        <p className="subtitle">Start your placement journey</p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder=" "
              value={form.name}
              onChange={handleChange}
            />
            <label>Full Name</label>
          </div>

          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder=" "
              value={form.username}
              onChange={handleChange}
            />
            <label>Username</label>
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder=" "
              value={form.email}
              onChange={handleChange}
            />
            <label>Email</label>
          </div>

          <div className="input-group">
            <input
              type="text"
              name="phone"
              placeholder=" "
              value={form.phone}
              onChange={handleChange}
            />
            <label>Phone Number</label>
          </div>

          <button type="submit" className="reg-btn">
            Complete Registration
          </button>

        </form>
      </div>
    </div>
  );
}

export default Registration;