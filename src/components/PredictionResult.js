import React from "react";

function PredictionResult({ result }) {
  // ✅ Prevent crash if result is null/undefined
  if (!result || Object.keys(result).length === 0) return null;

  // ✅ Safe values (avoid undefined issues)
  const chance = result.placementChance || 0;
  const level = result.companyLevel || "N/A";
  const companies = result.predictedCompanies || "N/A";

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <h3>Prediction Result</h3>

      {/* ✅ Data */}
      <p><strong>Placement Chance:</strong> {chance}%</p>
      <p><strong>Company Level:</strong> {level}</p>
      <p><strong>Top Companies:</strong> {companies}</p>

      {/* ✅ Progress Bar */}
      <div
        style={{
          width: "300px",
          margin: "20px auto",
          background: "#ddd",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
        }}
      >
        <div
          style={{
            width: `${chance}%`,
            background:
              chance > 70
                ? "#4CAF50"
                : chance > 40
                ? "#FF9800"
                : "#F44336",
            height: "20px",
            transition: "width 0.5s ease-in-out",
          }}
        ></div>
      </div>

      {/* ✅ Extra Insight */}
      <p style={{ fontSize: "14px", color: "#666" }}>
        {chance > 70
          ? "🔥 Strong chances for top companies!"
          : chance > 40
          ? "⚡ Moderate chances — keep improving!"
          : "📉 Low chances — focus on coding & aptitude."}
      </p>
    </div>
  );
}

export default PredictionResult;