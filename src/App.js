import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import AddStudent from "./components/AddStudent";
import Tips from "./components/Tips";
import Profile from "./components/Profile";
import Registration from "./components/Registration";
import JobMatcher from "./components/JobMatcher";
import Chatbot from "./components/Chatbot";
import FeatureRequest from "./components/FeatureRequest"; // ✅ NEW

// 🔒 Protected Route
function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn === "true" ? children : <Navigate to="/" />;
}

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ LOGIN */}
        <Route
          path="/"
          element={
            isLoggedIn === "true"
              ? <Navigate to="/home" />
              : <Login />
          }
        />

        {/* ✅ HOME */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* ✅ PLACEMENT PREDICTOR */}
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddStudent />
            </PrivateRoute>
          }
        />

        {/* ✅ JOB MATCHER */}
        <Route
          path="/jobs"
          element={
            <PrivateRoute>
              <JobMatcher />
            </PrivateRoute>
          }
        />

        {/* ✅ CHATBOT */}
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chatbot />
            </PrivateRoute>
          }
        />

        {/* ✅ FEATURE REQUEST (NEW FIX) */}
        <Route
          path="/feature"
          element={
            <PrivateRoute>
              <FeatureRequest />
            </PrivateRoute>
          }
        />

        {/* ✅ TIPS */}
        <Route
          path="/tips"
          element={
            <PrivateRoute>
              <Tips />
            </PrivateRoute>
          }
        />

        {/* ✅ PROFILE */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* ✅ REGISTRATION */}
        <Route
          path="/register"
          element={
            <PrivateRoute>
              <Registration />
            </PrivateRoute>
          }
        />

        {/* ❌ INVALID ROUTE */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;