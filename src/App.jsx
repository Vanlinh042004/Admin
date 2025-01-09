// src/App.jsx
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Sidebar from "./components/common/Sidebar";
import ClassPage from "./pages/ClassPage";
import TutorPage from "./pages/TutorPage";
import ApprovePage from "./pages/ApprovePage";
import LoginPage from "./pages/LoginPage";
import ParentPage from "./pages/ParentPage";
import EditClass from "./components/class/EditClass";
import ClassDetails from "./components/approve/ClassDetails";
import Chat from "./pages/Chat";

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch (error) {
    console.error("Invalid token:", error.message);
    return null;
  }
}
function PrivateRoute({ children }) {
  const token = sessionStorage.getItem("token");
  let isAuthenticated = false;
  let decodedToken = null;
  if (token) {
    try {
      const decodedToken = parseJwt(token);
      const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây

      if (decodedToken.exp > currentTime) {
        isAuthenticated = true; // Token còn hiệu lực
      } else {
        // Token đã hết hạn
        sessionStorage.removeItem("token"); // Corrected to sessionStorage
      }
    } catch (error) {
      // Token không hợp lệ
      sessionStorage.removeItem("token"); // Corrected to sessionStorage
    }
  }
  console.log("Token:", token);
  console.log("Decoded Token:", decodedToken);
  console.log("Current time:", Date.now() / 1000);
  console.log("exp:", decodedToken?.exp);
  console.log("Is authenticated:", isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              {/* Sidebar và các route được bảo vệ */}
              <Sidebar />
              <Routes>
                <Route path="/class" element={<ClassPage />} />
                <Route path="/classes/edit/:id" element={<EditClass />} />
                <Route path="/tutor" element={<TutorPage />} />
                <Route path="/approve" element={<ApprovePage />} />
                <Route path="/parent" element={<ParentPage />} />
                <Route path="/approve/:id" element={<ClassDetails />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
