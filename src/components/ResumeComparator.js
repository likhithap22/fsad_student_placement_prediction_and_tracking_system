import React, { useState, useRef } from "react";

const ResumeComparator = () => {
  const [resumeText, setResumeText] = useState("");
  const [comparisonResult, setComparisonResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "text/plain") {
      alert("Only TXT files are supported right now.");
      return;
    }
    const text = await file.text();
    setResumeText(text);
  };

  const handleAnalyze = () => {
    const text = resumeText.toLowerCase();
    if (!text.trim()) {
      alert("Resume is empty! Paste text or upload a TXT file.");
      return;
    }

    const hasBTech = text.includes("b.tech") || text.includes("btech");
    const skillsKeywords = ["java", "c", "c++", "python", "sql", "html", "css", "javascript", "react", "node"];
    const hasSkills = skillsKeywords.some((skill) => text.includes(skill));
    const projectsKeywords = ["project", "system", "app", "website", "portfolio"];
    const hasProjects = projectsKeywords.some((kw) => text.includes(kw));
    const internshipsKeywords = ["internship", "intern"];
    const hasInternships = internshipsKeywords.some((kw) => text.includes(kw));
    const achievementsKeywords = ["hackathon", "competition", "award", "certification"];
    const hasAchievements = achievementsKeywords.some((kw) => text.includes(kw));

    setComparisonResult({
      education: {
        your: hasBTech ? "B.Tech CSE, CGPA 8.2" : "Not specified",
        topCompanies: "B.Tech CSE or related, CGPA ≥ 8",
        status: hasBTech ? "✅" : "⚠️",
        suggestion: hasBTech ? "Good" : "Include your degree and CGPA",
      },
      skills: {
        your: hasSkills ? "Skills detected" : "Not specified",
        topCompanies: "Java, Python, DS/Algo, Web Dev",
        status: hasSkills ? "✅" : "⚠️",
        suggestion: hasSkills ? "Good" : "Add key programming languages and DS/Algo skills",
      },
      projects: {
        your: hasProjects ? "Projects listed" : "Not specified",
        topCompanies: "Projects demonstrating real-world problem-solving",
        status: hasProjects ? "✅" : "⚠️",
        suggestion: hasProjects ? "Good" : "Add measurable, real-world projects",
      },
      internships: {
        your: hasInternships ? "Yes" : "None",
        topCompanies: "Internship experience preferred",
        status: hasInternships ? "✅" : "⚠️",
        suggestion: hasInternships ? "Good" : "Include internship experience if available",
      },
      achievements: {
        your: hasAchievements ? "Achievements listed" : "None",
        topCompanies: "National/international competitions, hackathons, awards",
        status: hasAchievements ? "✅" : "⚠️",
        suggestion: hasAchievements ? "Good" : "Participate in competitions/certifications to strengthen profile",
      },
      verdict: "Partially Eligible",
    });
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial", backgroundColor: "#1e1e2f", color: "white", minHeight: "100vh" }}>
      <h1>Resume Comparator</h1>

      <div
        onClick={() => fileInputRef.current.click()}
        style={{
          border: "2px dashed #4caf50",
          borderRadius: 8,
          padding: 20,
          textAlign: "center",
          marginBottom: 15,
          cursor: "pointer",
        }}
      >
        Click here to select a TXT file
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".txt"
          style={{ display: "none" }}
        />
      </div>

      <textarea
        placeholder="Or paste your resume text here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        rows={12}
        style={{
          width: "100%",
          padding: 15,
          fontSize: 16,
          marginBottom: 10,
          resize: "vertical",
          backgroundColor: "#2e2e3f",
          color: "#fff",
          borderRadius: 5,
          border: "1px solid #555",
        }}
      ></textarea>

      <button
        onClick={handleAnalyze}
        style={{
          marginTop: 10,
          padding: "10px 25px",
          fontSize: 16,
          cursor: "pointer",
          backgroundColor: "#4caf50",
          color: "#fff",
          border: "none",
          borderRadius: 5,
        }}
      >
        Analyze Resume
      </button>

      {comparisonResult && (
        <div style={{ marginTop: 25 }}>
          <h2>Comparison Result</h2>
          <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", color: "#000", backgroundColor: "#fff" }}>
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <th>Criteria</th>
                <th>Your Resume</th>
                <th>Top Company Expectation</th>
                <th>Status</th>
                <th>Suggestion</th>
              </tr>
            </thead>
            <tbody>
              {["education", "skills", "projects", "internships", "achievements"].map((key) => (
                <tr key={key}>
                  <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                  <td>{comparisonResult[key].your}</td>
                  <td>{comparisonResult[key].topCompanies}</td>
                  <td>{comparisonResult[key].status}</td>
                  <td>{comparisonResult[key].suggestion}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 style={{ marginTop: 15 }}>Overall Verdict: {comparisonResult.verdict}</h3>
        </div>
      )}
    </div>
  );
};

export default ResumeComparator;