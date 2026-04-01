import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar
} from "recharts";

function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    leetcodeScore: 0,
    codeforcesScore: 0,
    codechefScore: 0,
    mentorpickScore: 0
  });

  const [stats, setStats] = useState({
    leetcode: 0,
    codeforces: 0,
    codechef: 0,
    mentorpick: 0
  });

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  // Load user profile
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userProfile"));
    if (savedUser) {
      setUser(savedUser);
      setForm({
        ...savedUser,
        leetcodeScore: Number(savedUser.leetcodeScore) || 0,
        codeforcesScore: Number(savedUser.codeforcesScore) || 0,
        codechefScore: Number(savedUser.codechefScore) || 0,
        mentorpickScore: Number(savedUser.mentorpickScore) || 0
      });
    }
  }, []);

  // Update stats when form changes
  useEffect(() => {
    setStats({
      leetcode: Number(form.leetcodeScore) || 0,
      codeforces: Number(form.codeforcesScore) || 0,
      codechef: Number(form.codechefScore) || 0,
      mentorpick: Number(form.mentorpickScore) || 0
    });
  }, [form]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    const updated = {
      ...form,
      leetcodeScore: Number(form.leetcodeScore) || 0,
      codeforcesScore: Number(form.codeforcesScore) || 0,
      codechefScore: Number(form.codechefScore) || 0,
      mentorpickScore: Number(form.mentorpickScore) || 0
    };
    localStorage.setItem("userProfile", JSON.stringify(updated));
    setUser(updated);
    setEditMode(false);
  };

  const handleCancel = () => {
    setForm(user);
    setEditMode(false);
  };

  if (!user) return <h2 style={{ color: "white" }}>No Profile Data Found</h2>;

  const chartData = [
    { name: "Mentorpick", score: stats.mentorpick },
    { name: "CodeChef", score: stats.codechef },
    { name: "Codeforces", score: stats.codeforces },
    { name: "LeetCode", score: stats.leetcode }
  ];

  const radarData = [
    { platform: "Mentorpick", value: stats.mentorpick },
    { platform: "CodeChef", value: stats.codechef },
    { platform: "Codeforces", value: stats.codeforces },
    { platform: "LeetCode", value: stats.leetcode }
  ];

  const pieData = [
    { name: "Mentorpick", value: stats.mentorpick },
    { name: "CodeChef", value: stats.codechef },
    { name: "Codeforces", value: stats.codeforces },
    { name: "LeetCode", value: stats.leetcode }
  ];

  const areaData = [
    { platform: "Mentorpick", score: stats.mentorpick },
    { platform: "CodeChef", score: stats.codechef },
    { platform: "Codeforces", score: stats.codeforces },
    { platform: "LeetCode", score: stats.leetcode }
  ];

  const radialData = [
    { name: "Mentorpick", value: stats.mentorpick, fill: "#8884d8" },
    { name: "CodeChef", value: stats.codechef, fill: "#82ca9d" },
    { name: "Codeforces", value: stats.codeforces, fill: "#ffc658" },
    { name: "LeetCode", value: stats.leetcode, fill: "#ff8042" }
  ];

  return (
    <div className="dashboard">
      {/* Topbar */}
      <div className="topbar">
        <h2>🚀 PT Tracker</h2>
        <div className="top-right">
          <span>Global Leaderboard</span>
          <div className="avatar-small">
            {(editMode ? form.username : user.username).charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Profile Section */}
        <div className="profile-card">
          <div className="avatar-big">
            {(editMode ? form.username : user.username).charAt(0).toUpperCase()}
          </div>

          {editMode ? (
            <>
              <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
              <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
              <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
              <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />

              <input name="leetcodeScore" placeholder="LeetCode Rating" value={form.leetcodeScore} onChange={handleChange} />
              <input name="codeforcesScore" placeholder="Codeforces Score" value={form.codeforcesScore} onChange={handleChange} />
              <input name="codechefScore" placeholder="CodeChef Rating" value={form.codechefScore} onChange={handleChange} />
              <input name="mentorpickScore" placeholder="Mentorpick Score" value={form.mentorpickScore} onChange={handleChange} />

              <div className="edit-buttons">
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h3>{user.name}</h3>
              <p>@{user.username}</p>
              <div className="info">
                <p>🎓 KL University</p>
                <p>📧 {user.email}</p>
                <p>📞 {user.phone}</p>
              </div>
              <button onClick={() => setEditMode(true)}>Edit</button>
            </>
          )}
        </div>

        {/* Stats & Charts */}
        <div className="right-section">
          {/* Stat Cards */}
          <div className="stats">
            {chartData.map((d, i) => (
              <div className="card" key={i} style={{ backgroundColor: COLORS[i], color: "#fff" }}>
                <h4>{d.name}</h4>
                <p>{d.score}</p>
              </div>
            ))}
          </div>

          {/* Bar Chart */}
          <h3 className="section-title">Bar Chart</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#ffdd59" />
              <YAxis stroke="#ffdd59" />
              <Tooltip />
              <Bar dataKey="score" fill="#8884d8" barSize={30} />
            </BarChart>
          </ResponsiveContainer>

          {/* Radar Chart */}
          <h3 className="section-title">Radar Chart</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#fff" />
              <PolarAngleAxis dataKey="platform" stroke="#ffdd59" />
              <PolarRadiusAxis stroke="#ffdd59" />
              <Radar name="Score" dataKey="value" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>

          {/* Pie Chart */}
          <h3 className="section-title">Pie Chart</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          {/* Area Chart */}
          <h3 className="section-title">Area Chart</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={areaData}>
              <XAxis dataKey="platform" stroke="#ffdd59" />
              <YAxis stroke="#ffdd59" />
              <Tooltip />
              <Area type="monotone" dataKey="score" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.4} />
            </AreaChart>
          </ResponsiveContainer>

          {/* Radial Progress */}
          <h3 className="section-title">Radial Progress</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" data={radialData} startAngle={180} endAngle={0}>
              <RadialBar minAngle={15} background clockWise dataKey="value" />
              <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Profile;