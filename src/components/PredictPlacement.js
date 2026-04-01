import React from "react";

function PredictionResult({ result }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Prediction Result</h3>

      <p>Placement Chance: {result.chance}%</p>
      <p>Company Type: {result.company}</p>

      <div style={{ width: "300px", margin: "auto", background: "#ddd" }}>
        <div
          style={{
            width: `${result.chance}%`,
            background: "green",
            height: "20px"
          }}
        ></div>
      </div>
    </div>
  );
}

export default PredictionResult;