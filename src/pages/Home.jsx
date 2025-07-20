import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 36px;
  color: #2c3e50;
`;

const Description = styled.p`
  font-size: 18px;
  color: #555;
  max-width: 600px;
  text-align: center;
  margin-bottom: 40px;
`;

const LoginButton = styled.button`
  background-color: #2c3e50;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #34495e;
  }
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Já Corrigiu?</Title>
      <Description>
        Sistema para correção automatizada de provas. Professores podem cadastrar
        provas, alunos respondem com facilidade, e os resultados são analisados rapidamente.
      </Description>
      <LoginButton onClick={() => navigate("/login")}>
        Acessar Conta
      </LoginButton>
    </Container>
  );
};

export default Home;
