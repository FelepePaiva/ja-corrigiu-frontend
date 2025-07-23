import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import CreateTeacherSection from "../sections/CreateTeacherSection";
import CreateStudentSection from "../sections/CreateStudentSection";
import ExamSection from "../sections/ViewExamSection";


const AdminRoutes = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar /> {/* Menu lateral permanente */}
      <div style={{ flexGrow: 1, padding: "32px" }}>
        <Routes>
          <Route path="professores" element={<CreateTeacherSection />} />
          <Route path="alunos" element={<CreateStudentSection />} />
          <Route path="exames" element={<ExamSection />} />
          <Route path="" element={<Navigate to="professores" />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminRoutes;
