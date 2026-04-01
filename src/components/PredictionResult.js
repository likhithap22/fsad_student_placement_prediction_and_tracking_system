import React from "react";

function PredictionResult({ result }) {
  return (
    <div style={{ marginTop: "20px" }}>

      <h3>Prediction Result</h3>

      <p>Placement Chance: {result.chance}%</p>
      <p>Company Level: {result.company}</p>

      {/* Simple Bar */}
      <div style={{
        height: "20px",
        width: "100%",
        background: "#ddd",
        borderRadius: "10px"
      }}>
        <div style={{
          width: `${result.chance}%`,
          height: "100%",
          background: "green",
          borderRadius: "10px"
        }}></div>
      </div>

    </div>
  );
}

export default PredictionResult;