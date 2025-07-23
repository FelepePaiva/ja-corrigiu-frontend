// src/pages/TeacherDashboard.jsx
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import CreateExamSection from "../sections/CreateExamSection";
import TeacherExamsSection from "../sections/TeachersExamsSection";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { getAllClassesService } from "../services/classService";

const MainContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
`;

const Info = styled.p`
  font-size: 16px;
  margin-bottom: 8px;
`;

const TeacherDashboard = () => {
  const { user, token } = useAuth();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getAllClassesService()
      .then(setClasses)
      .catch(() => console.error("Erro ao carregar turmas"));
  }, []);

  return (
    <MainContainer>
      <Sidebar tipo="professor" />

      <Content>
        <Title>Painel do Professor</Title>

        <Info><strong>Nome:</strong> {user?.name}</Info>
        <Info><strong>Email:</strong> {user?.email}</Info>
        <Info><strong>Role:</strong> {user?.role}</Info>

        <hr style={{ margin: "20px 0" }} />

        <p>A partir deste painel, o professor poderá:</p>
        <ul>
          <li>Cadastrar novas provas</li>
          <li>Ver turmas e alunos</li>
          <li>Acompanhar desempenho</li>
          <li>Corrigir provas (futuramente)</li>
        </ul>

        <hr style={{ margin: "40px 0" }} />

        <CreateExamSection
          token={token}
          classes={classes}
          teacherId={user?.id}
        />
        <TeacherExamsSection
         token={token}
         teacherId={user.id} />
      </Content>
    </MainContainer>
  );
};

export default TeacherDashboard;
