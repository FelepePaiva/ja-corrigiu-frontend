// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalConfig";
import Home from "./pages/Home";
import Login from "./pages/Login";

import AdminRoutes from "./pages/AdminRoutes";
import TeacherRoutes from "./pages/TeacherRoutes"; // ✅ novo
import StudentDashboard from "./pages/StudentDashboard";

import RoleRoute from "./components/RoleRoute";
import Navbar from "./components/NavBar";
import { useAuth } from "./contexts/AuthContext";

const App = () => {
  const { isAuthenticated, user, token } = useAuth();

  return (
    <>
      <GlobalStyle />
      {isAuthenticated && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin/*"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <AdminRoutes />
            </RoleRoute>
          }
        />

        <Route
          path="/teacher/*"
          element={
            <RoleRoute allowedRoles={["teacher"]}>
              <TeacherRoutes token={token} user={user} />
            </RoleRoute>
          }
        />

        <Route
          path="/student"
          element={
            <RoleRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </RoleRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
