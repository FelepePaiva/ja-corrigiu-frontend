import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";

const Container = styled.div`
  padding: 40px;
  max-width: 800px;
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

const TeacherDashboard = () => {
  const { user } = useAuth();

  return (
    <Container>
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
    </Container>
  );
};

export default TeacherDashboard;
