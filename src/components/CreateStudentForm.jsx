import styled from "styled-components";

const Container = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px #ccc;
  max-width: 500px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #34495e;
  }
`;

const Message = styled.p`
  text-align: center;
  color: ${(props) => (props.$error ? "red" : "green")};
`;

const StudentForm = ({ form, onChange, onSubmit, classes, message }) => {
  return (
    <Container>
      <Title>Cadastrar Novo Aluno</Title>
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={onChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          required
        />
        <Input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={form.cpf}
          onChange={onChange}
          required
        />
        <Input
          type="text"
          name="registration_code"
          placeholder="Código de matrícula"
          value={form.registration_code}
          onChange={onChange}
          required
        />
        <Select
          name="classId"
          value={form.classId}
          onChange={onChange}
          required
        >
          <option value="">Selecione uma classe</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.code}
            </option>
          ))}
        </Select>

        <Button type="submit">Cadastrar</Button>

        {message && <Message $error={message.startsWith("Erro")}>{message}</Message>}
      </form>
    </Container>
  );
};

export default StudentForm;
