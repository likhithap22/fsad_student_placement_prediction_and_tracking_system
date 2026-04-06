import axios from "axios";

// ✅ FIXED PORT (must match Spring Boot)
const API = axios.create({
  baseURL: "http://localhost:9081",
  headers: {
    "Content-Type": "application/json",
  },
});

// ================= STUDENT APIs =================

// Add student (auto fetch + prediction)
export const addStudent = (data) => API.post("/students", data);

// Get all students
export const getStudents = () => API.get("/students");

// Delete student
export const deleteStudent = (id) => API.delete(`/students/${id}`);

// Refresh scores manually
export const refreshStudent = (id) =>
  API.put(`/students/refresh/${id}`);

// Get single student
export const getStudentById = (id) =>
  API.get(`/students/${id}`);


// ================= ML API =================

// ✅ FIXED ML URL (use 127.0.0.1 to avoid CORS issues sometimes)
export const predictML = (data) =>
  axios.post("http://127.0.0.1:5000/predict", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export default API;