import React, { useEffect, useState } from "react";
import API from "../services/api";

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    API.get("/students").then((res) => setStudents(res.data));
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2>Student List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Marks</th>
              <th>Skills</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.marks}</td>
                <td>{s.skills}</td>
                <td>{s.status || "Not Placed"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;