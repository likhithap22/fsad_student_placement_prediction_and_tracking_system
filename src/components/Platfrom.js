import React from "react";
import "../styles/style.css";

function Platforms() {
  return (
    <div className="platforms">

      <h1>Supported Platforms</h1>

      <p className="platform-subtitle">
        Track your progress across all major competitive programming platforms
      </p>

      <div className="platform-list">
        <div className="platform-card">MentorPick</div>
        <div className="platform-card">LeetCode</div>
        <div className="platform-card">Codeforces</div>
        <div className="platform-card">CodeChef</div>
      </div>

    </div>
  );
}

export default Platforms;