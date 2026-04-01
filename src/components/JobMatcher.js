import React, { useState } from "react";

function JobMatcher() {
  const [student, setStudent] = useState({
    skills: "",
    cgpa: "",
    interest: "",
  });

  const [matches, setMatches] = useState([]);

  const jobs = [
    {
      role: "Software Engineer Intern",
      company: "Google",
      skills: ["DSA", "Java", "React"],
      cgpa: 8,
      interest: "development",
    },
    {
      role: "Web Developer",
      company: "Infosys",
      skills: ["HTML", "CSS", "JavaScript"],
      cgpa: 6,
      interest: "development",
    },
    {
      role: "Data Analyst",
      company: "Amazon",
      skills: ["Python", "SQL"],
      cgpa: 7,
      interest: "data",
    },
    {
      role: "Support Engineer",
      company: "TCS",
      skills: ["C", "Basics"],
      cgpa: 5,
      interest: "support",
    },
  ];

  const logos = {
    Google: "https://logo.clearbit.com/google.com",
    Infosys: "https://logo.clearbit.com/infosys.com",
    Amazon: "https://logo.clearbit.com/amazon.com",
    TCS: "https://logo.clearbit.com/tcs.com",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMatch = () => {
    const userSkills = student.skills.toLowerCase().split(",");

    const result = jobs.map((job) => {
      let score = 0;

      if (job.skills.some((s) => userSkills.includes(s.toLowerCase())))
        score += 40;

      if (Number(student.cgpa) >= job.cgpa) score += 30;

      if (student.interest.toLowerCase() === job.interest) score += 30;

      const eligible = score >= 60;

      return { ...job, score, eligible };
    });

    setMatches(result);
  };

  return (
    <div className="jm-page">
      <div className="jm-card">

        <h2>Job & Internship Matcher</h2>

        {/* INPUTS */}
        <input
          name="skills"
          value={student.skills}
          onChange={handleChange}
          placeholder="Skills (e.g. Java, React)"
        />

        <input
          name="cgpa"
          value={student.cgpa}
          onChange={handleChange}
          placeholder="CGPA"
        />

        <input
          name="interest"
          value={student.interest}
          onChange={handleChange}
          placeholder="Interest (development/data)"
        />

        <button onClick={handleMatch}>Find Matches</button>

        {/* RESULTS */}
        <div className="jm-results">
          {matches.map((job, i) => (
            <div
              key={i}
              className={`jm-job ${job.eligible ? "yes" : "no"}`}
            >
              <div className="jm-header">
                <img src={logos[job.company]} alt="" />
                <div>
                  <h4>{job.role}</h4>
                  <p>{job.company}</p>
                </div>
              </div>

              {/* PROGRESS BAR */}
              <div className="progress">
                <div
                  className="progress-fill"
                  style={{ width: `${job.score}%` }}
                ></div>
              </div>

              <p className="percent">{job.score}% Match</p>

              <p className="status">
                {job.eligible ? "✅ Eligible" : "❌ Not Eligible"}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default JobMatcher;