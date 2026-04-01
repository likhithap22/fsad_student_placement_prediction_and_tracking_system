import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Tips() {
  const location = useLocation();
  const navigate = useNavigate();
  const { student, result } = location.state || {};

  if (!student || !result) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>No data found!</h2>
        <button onClick={() => navigate("/add-student")}>Go Back</button>
      </div>
    );
  }

  // Generate tips based on scores
  const tips = [];
  if (Number(student.contest) < 50) tips.push("Participate in more coding contests.");
  if (Number(student.aptitude) < 50) tips.push("Practice aptitude questions daily.");
  if (Number(student.rank) > 100) tips.push("Improve your contest ranking.");
  if (result.chance < 50) tips.push("Work on projects and internships to strengthen resume.");

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "auto", color: "#fff" }}>
      <h2>Placement Tips for {student.roll}</h2>
      <ul>
        {tips.length > 0 ? (
          tips.map((tip, idx) => <li key={idx}>{tip}</li>)
        ) : (
          <p>Great job! Keep up the performance!</p>
        )}
      </ul>
      <button onClick={() => navigate("/add-student")} style={{ marginTop: "20px" }}>
        Back
      </button>
    </div>
  );
}

export default Tips;