import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalConfig";
import Home from './pages/Home'
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import RoleRoute from "./components/RoleRoute";
import Navbar from "./components/NavBar";
import { useAuth } from "./contexts/AuthContext";
import CreateStudent from "./pages/CreateStudent";

const App = () => {
  const {isAuthenticated} = useAuth();
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
      {isAuthenticated && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<RoleRoute allowedRoles={["admin"]}>
            <AdminDashboard />
            </RoleRoute>
          }
          />
          <Route
          path="/admin/create-student"
          element={
          <RoleRoute allowedRoles={["admin"]}>
          <CreateStudent />
          </RoleRoute>
    }
  />
          <Route path="/teacher" element={<RoleRoute allowedRoles={["teacher"]}>
            <TeacherDashboard />
            </RoleRoute>
          }
          />
          <Route path="/student" element={<RoleRoute allowedRoles={["student"]}>
            <StudentDashboard />
            </RoleRoute>
          }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
