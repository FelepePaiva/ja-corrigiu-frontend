import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const Container = styled.div`
  max-width: 400px;
  margin: 80px auto;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color:rgb(225, 230, 235);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #34495e;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
`;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // pega o login do contexto

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/v1/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      login({ token, user }); // salva no contexto

      // redireciona baseado na role
      switch (user.role) {
        case "student":
          navigate("/student"); // crie essa rota depois
          break;
        case "teacher":
          navigate("/teacher"); // crie essa rota depois
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      setError("Credenciais inválidas ou erro na requisição.");
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      {error && <Error>{error}</Error>}
      <form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Entrar</Button>
      </form>
    </Container>
  );
};

export default Login;