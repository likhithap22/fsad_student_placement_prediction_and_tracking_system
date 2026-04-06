import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const features = [
  { title: "Leaderboards", desc: "Track rankings globally and by batch." },
  { title: "Multi-Platform", desc: "LeetCode, Codeforces, mentorpick, CodeChef support." },
  { title: "Contest Tracking", desc: "Monitor contest performance easily." },
  { title: "Problem Stats", desc: "Track solved problems and accuracy." },
  { title: "Analytics", desc: "Visualize your growth over time." },
];

const platforms = ["LeetCode", "Codeforces", "CodeChef", "mentorpick"];

function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [openProfile, setOpenProfile] = useState(false);
  const [openTheme, setOpenTheme] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    if (!user) {
      navigate("/register");
      return;
    }
    setUsername(user.username || localStorage.getItem("username") || "User");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userProfile");
    window.location.href = "/";
  };

  return (
    <div className="home-container">

      {/* NAVBAR */}
      <div className="navbar">
        <div className="profile-section">
          <div
            className="profile-icon"
            onClick={() => setOpenProfile(!openProfile)}
          >
            {username.charAt(0).toUpperCase()}
          </div>

          {openProfile && (
            <div className="profile-dropdown">
              <h4>{username}</h4>
              <hr />

              <p onClick={() => { setOpenProfile(false); navigate("/profile"); }}>
                Profile
              </p>
              <p onClick={() => { setOpenProfile(false); navigate("/jobs"); }}>
                Job Matcher 🧠
              </p>
              <p onClick={() => { setOpenProfile(false); navigate("/add"); }}>
                Placement Predictor 📊
              </p>
              <p onClick={() => { setOpenProfile(false); navigate("/chat"); }}>
                Chat Assistant 🤖
              </p>
              <p onClick={() => { setOpenProfile(false); navigate("/resume"); }}>
                Resume Comparator 📄
              </p>
              <p onClick={() => { setOpenProfile(false); navigate("/feature"); }}>
                Issue / Feature Request 📝
              </p>
              <p onClick={() => setOpenTheme(!openTheme)}>
                Theme 🎨
              </p>

              {openTheme && (
                <div className="theme-dropdown">
                  <p onClick={() => (document.body.style.background = "white")}>Light</p>
                  <p onClick={() => (document.body.style.background = "#1e1e1e")}>Dark</p>
                  <p onClick={() => (document.body.style.background = "#6a0dad")}>Purple</p>
                  <p onClick={() => (document.body.style.background = "#0f172a")}>Blue Dark</p>
                </div>
              )}

              <hr />
              <p
                className="logout"
                onClick={() => {
                  setOpenProfile(false);
                  handleLogout();
                }}
              >
                Log out
              </p>
            </div>
          )}
        </div>
      </div>

      {/* HERO */}
      <div className="hero">
        <h1>
          Track Your <br />
          <span>Competitive Progress</span>
        </h1>

        <p>
          A powerful dashboard to monitor your coding journey and improve faster.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => navigate("/add")}>
            📊 Placement Predictor
          </button>
          <button className="btn-secondary" onClick={() => navigate("/jobs")}>
            🧠 Job Matcher
          </button>
          <button className="btn-chat" onClick={() => navigate("/chat")}>
            🤖 Chat Assistant
          </button>
          <button className="btn-resume" onClick={() => navigate("/resume")}>
            📄 Resume Comparator
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div className="features">
        <h2>Powerful Features</h2>
        <div className="feature-grid">
          {features.map((f, i) => (
            <div key={i} className="card">
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PLATFORMS */}
      <div className="platforms">
        <h2>Supported Platforms</h2>
        <div className="platform-list">
          {platforms.map((p, i) => (
            <div key={i} className="platform">{p}</div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;