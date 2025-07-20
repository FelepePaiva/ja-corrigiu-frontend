import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";

// Seções refatoradas
import CreateTeacherSection from "../sections/CreateTeacherSection";
import CreateStudentSection from "../sections/CreateStudentSection";
import ExamSection from "../sections/ViewExamSection";

import { getAllClassesService } from "../services/classService";
import { getAllDisciplinesService } from "../services/disciplineService";

const Container = styled.div`
  padding: 40px;
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
`;

const Info = styled.p`
  font-size: 16px;
  margin-bottom: 8px;
`;

const AdminDashboard = () => {
  const { user, token } = useAuth();

  // Dados compartilhados entre seções
  const [disciplines, setDisciplines] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getAllDisciplinesService()
      .then(setDisciplines)
      .catch(() => console.error("Erro ao carregar disciplinas"));

    getAllClassesService()
      .then(setClasses)
      .catch(() => console.error("Erro ao carregar classes"));
  }, []);

  return (
    <Container>
      <Title>Admin Dashboard</Title>
      <Info>
        <strong>Nome:</strong> {user?.name}
      </Info>
      <Info>
        <strong>Email:</strong> {user?.email}
      </Info>
      <Info>
        <strong>Role:</strong> {user?.role}
      </Info>

      <hr style={{ margin: "20px 0" }} />

      <CreateTeacherSection token={token} disciplines={disciplines} />

      <hr style={{ margin: "30px 0" }} />

      <CreateStudentSection token={token} classes={classes} />

      <hr style={{ margin: "30px 0" }} />

      <ExamSection token={token} /> {/* 👈 nova seção somente leitura para admin */}
    </Container>
  );
};

export default AdminDashboard;
