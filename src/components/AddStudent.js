import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

// ✅ CHANGE THIS ONLY
const BASE_URL = "https://your-backend-url.onrender.com";

function AddStudent() {
  const [data, setData] = useState({
    roll: "",
    name: "",
    mentorpick: "",
    codechef: "",
    leetcode: "",
    aptitude: "",
    rank: "",
  });

  const [result, setResult] = useState(null);
  const [savedStudents, setSavedStudents] = useState([]);
  const navigate = useNavigate();

  // ✅ LOAD STUDENTS
  const loadStudents = async () => {
    try {
      const res = await fetch(`${BASE_URL}/students`);
      const data = await res.json();
      setSavedStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setSavedStudents([]);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // ✅ PREDICT
  const handlePredict = () => {
    const fields = [
      "roll","name","mentorpick","codechef",
      "leetcode","aptitude","rank",
    ];

    for (let f of fields) {
      if (data[f] === "" || data[f] === null) {
        alert("Fill all fields");
        return;
      }
    }

    const mp = parseFloat(data.mentorpick) || 0;
    const cc = parseFloat(data.codechef) || 0;
    const lc = parseFloat(data.leetcode) || 0;
    const apt = parseFloat(data.aptitude) || 0;
    const rank = parseFloat(data.rank) || 0;

    const avgScore = (mp + cc + lc + apt) / 4;

    let rankFactor;
    if (rank <= 50) rankFactor = 1.0;
    else if (rank <= 100) rankFactor = 0.9;
    else if (rank <= 200) rankFactor = 0.75;
    else if (rank <= 500) rankFactor = 0.5;
    else rankFactor = 0.3;

    let chance = avgScore * rankFactor;
    chance = Math.max(0, Math.min(100, chance));

    const companies = {
      TCS: chance > 20 ? chance + 5 : chance * 0.5,
      Infosys: chance,
      Wipro: chance > 30 ? chance - 10 : chance * 0.6,
      Amazon: chance > 50 ? chance - 25 : 0,
      Google: chance > 70 ? chance - 40 : 0,
    };

    setResult({ chance, companies, total: avgScore });
  };

  // ✅ SAVE
  const handleSave = async () => {
    if (!result) {
      alert("Predict first!");
      return;
    }

    const studentData = {
      name: data.name,
      roll: data.roll,
      aptitude: Number(data.aptitude),
      mentorpick: Number(data.mentorpick),
      codechef: Number(data.codechef),
      leetcode: Number(data.leetcode),
      studentRank: Number(data.rank),
      total: result.total,
      chance: result.chance,
    };

    try {
      const res = await fetch(`${BASE_URL}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (!res.ok) throw new Error("Save failed");

      alert("Saved successfully ✅");

      setData({
        roll: "",
        name: "",
        mentorpick: "",
        codechef: "",
        leetcode: "",
        aptitude: "",
        rank: "",
      });

      setResult(null);
      loadStudents();

    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving ❌");
    }
  };

  // ✅ DELETE
  const deleteStudent = async (id) => {
    try {
      await fetch(`${BASE_URL}/students/${id}`, {
        method: "DELETE",
      });
      loadStudents();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleTips = () => {
    if (!result) {
      alert("Predict first!");
      return;
    }
    navigate("/tips", { state: { student: data, result } });
  };

  const chartData = result
    ? Object.entries(result.companies).map(([name, value]) => ({ name, value }))
    : [];

  const pieData = result
    ? [
        { name: "Placed", value: result.chance },
        { name: "Not Placed", value: 100 - result.chance },
      ]
    : [];

  const COLORS = ["#4CAF50", "#F44336"];

  const getClass = (value) => {
    if (value >= 70) return "table-high";
    if (value >= 40) return "table-medium";
    return "table-low";
  };

  return (
    <div className="container">
      <div className="left-panel">
        <h2>Placement Predictor</h2>

        <input name="roll" placeholder="Roll No" value={data.roll} onChange={handleChange} />
        <input name="name" placeholder="Name" value={data.name} onChange={handleChange} />

        <input name="mentorpick" type="number" placeholder="MentorPick" value={data.mentorpick} onChange={handleChange} />
        <input name="codechef" type="number" placeholder="CodeChef" value={data.codechef} onChange={handleChange} />
        <input name="leetcode" type="number" placeholder="LeetCode" value={data.leetcode} onChange={handleChange} />
        <input name="aptitude" type="number" placeholder="Aptitude" value={data.aptitude} onChange={handleChange} />
        <input name="rank" type="number" placeholder="Rank" value={data.rank} onChange={handleChange} />

        <div className="button-group">
          <button onClick={handlePredict} className="btn-predict">Predict</button>
          <button onClick={handleSave} className="btn-save">Save</button>
          <button onClick={handleTips} className="btn-save">Tips</button>
        </div>
      </div>

      <div className="right-panel">
        {result && (
          <>
            <h2>{result.chance.toFixed(1)}% Overall Chance</h2>

            <div className="charts">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2196F3" />
                </BarChart>
              </ResponsiveContainer>

              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" outerRadius={80}>
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        <h3>Students (From Backend)</h3>
        <table className="dark-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Roll</th>
              <th>Aptitude</th>
              <th>CodeChef</th>
              <th>LeetCode</th>
              <th>Chance</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {savedStudents.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.roll}</td>
                <td>{s.aptitude}</td>
                <td>{s.codechef}</td>
                <td>{s.leetcode}</td>
                <td className={getClass(s.chance)}>{s.chance}</td>
                <td>
                  <button onClick={() => deleteStudent(s.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddStudent;