import React, { useState } from "react";
import { predictML } from "../services/api";
import PredictionResult from "./PredictionResult";
import "../styles/style.css";

function PredictPlacement() {
  const [input, setInput] = useState({
    easy: "",
    medium: "",
    hard: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Handle input
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // 🔥 FALLBACK LOGIC (VERY IMPORTANT)
  const localPrediction = (easy, medium, hard) => {
    const score = easy + medium * 2 + hard * 3;

    let chance = 50;
    let companies = "TCS, Infosys";

    if (score > 200) {
      chance = 90;
      companies = "Google, Amazon, Microsoft";
    } else if (score > 120) {
      chance = 70;
      companies = "Infosys, Wipro, TCS";
    }

    return { chance, companies };
  };

  // ✅ Predict
  const handlePredict = async () => {
    if (!input.easy || !input.medium || !input.hard) {
      alert("Enter all fields ❗");
      return;
    }

    setLoading(true);

    try {
      console.log("Sending to ML:", input);

      const res = await predictML({
        easy: Number(input.easy),
        medium: Number(input.medium),
        hard: Number(input.hard),
      });

      console.log("ML RESPONSE:", res.data);

      if (!res.data || res.data.chance === undefined) {
        throw new Error("Invalid ML response");
      }

      setResult({
        placementChance: res.data.chance,
        companyLevel:
          res.data.chance > 80
            ? "Top Tier"
            : res.data.chance > 60
            ? "Mid Tier"
            : "Mass Recruiter",
        predictedCompanies: res.data.companies,
      });

    } catch (err) {
      console.error("ML ERROR:", err);

      // 🔥 FALLBACK (IMPORTANT)
      const fallback = localPrediction(
        Number(input.easy),
        Number(input.medium),
        Number(input.hard)
      );

      alert("ML server not working → using local prediction ✅");

      setResult({
        placementChance: fallback.chance,
        companyLevel:
          fallback.chance > 80
            ? "Top Tier"
            : fallback.chance > 60
            ? "Mid Tier"
            : "Mass Recruiter",
        predictedCompanies: fallback.companies,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      {/* LEFT */}
      <div className="left-panel">
        <h2>ML Placement Predictor</h2>

        <input
          type="number"
          name="easy"
          placeholder="Easy Solved"
          value={input.easy}
          onChange={handleChange}
        />

        <input
          type="number"
          name="medium"
          placeholder="Medium Solved"
          value={input.medium}
          onChange={handleChange}
        />

        <input
          type="number"
          name="hard"
          placeholder="Hard Solved"
          value={input.hard}
          onChange={handleChange}
        />

        <button onClick={handlePredict} className="btn-predict">
          {loading ? "Predicting..." : "Predict Using ML"}
        </button>
      </div>

      {/* RIGHT */}
      <div className="right-panel">
        {result ? (
          <PredictionResult result={result} />
        ) : (
          <p style={{ textAlign: "center", marginTop: "50px" }}>
            Enter values and click Predict 🚀
          </p>
        )}
      </div>
    </div>
  );
}

export default PredictPlacement;