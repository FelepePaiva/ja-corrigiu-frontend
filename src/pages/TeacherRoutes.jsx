// src/pages/TeacherRoutes.jsx

import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ExamSection from "../sections/ExamSection";
import TeacherClassesSection from "../sections/TeacherClassesSection";

const TeacherRoutes = ({ token, user }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar tipo="professor" />
      <div style={{ flexGrow: 1, padding: "32px" }}>
        <Routes>
          <Route
            path="provas"
            element={
              <ExamSection
                token={token}
                teacherId={user.id}
              />
            }
          />

          <Route
            path="turmas"
            element={<TeacherClassesSection teacherId={user.id} token={token} />}
          />

          <Route
            path=""
            element={
              <p>Bem-vindo(a)! Selecione uma opção do menu ao lado</p>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default TeacherRoutes;
