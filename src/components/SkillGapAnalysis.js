import React, { useState } from "react";

function SkillGapAnalysis() {
  const [studentSkills, setStudentSkills] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [missingSkills, setMissingSkills] = useState([]);

  const handleAnalyze = async () => {
    // Example: call backend
    const res = await fetch("http://localhost:8080/skills/gap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentSkills: studentSkills.split(",").map(s => s.trim()),
        requiredSkills: requiredSkills.split(",").map(s => s.trim())
      }),
    });

    const data = await res.json();
    setMissingSkills(data.missingSkills);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Skill Gap Analysis</h2>
      <textarea
        placeholder="Enter your skills (comma separated)"
        value={studentSkills}
        onChange={(e) => setStudentSkills(e.target.value)}
        style={{ width: "300px", height: "80px" }}
      />
	  <br /><br />
	        <textarea
	          placeholder="Enter required skills (comma separated)"
	          value={requiredSkills}
	          onChange={(e) => setRequiredSkills(e.target.value)}
	          style={{ width: "300px", height: "80px" }}
	        />
	        <br /><br />
	        <button onClick={handleAnalyze}>Analyze Gap</button>

	        {missingSkills.length > 0 && (
	          <div style={{ marginTop: "20px" }}>
	            <h3>Missing Skills:</h3>
	            <ul>
	              {missingSkills.map((skill, i) => <li key={i}>{skill}</li>)}
	            </ul>
	          </div>
	        )}
	      </div>
	    );
	  }

	  export default SkillGapAnalysis;
