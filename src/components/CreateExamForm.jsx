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

// Demais estilos conforme seu padrão

const ExamForm = ({
  form,
  onChange,
  onSubmit,
  message,
  teachers,
  classes,
}) => (
  <Container>
    <Title>Cadastrar Nova Prova</Title>
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Título da prova"
        value={form.title}
        onChange={onChange}
        required
      />
      <input
        type="number"
        name="questions_count"
        placeholder="Qtd. de questões"
        value={form.questions_count}
        onChange={onChange}
        required
        min="1"
      />
      <input
        type="text"
        name="answer_key"
        placeholder='Gabarito (ex: A,B,C,D,E)'
        value={form.answer_key}
        onChange={onChange}
        required
      />
      <select
        name="bimester"
        value={form.bimester}
        onChange={onChange}
        required
      >
        <option value="">Selecione o bimestre</option>
        <option value="1">1º Bimestre</option>
        <option value="2">2º Bimestre</option>
        <option value="3">3º Bimestre</option>
        <option value="4">4º Bimestre</option>
      </select>
      <select
        name="teacherId"
        value={form.teacherId}
        onChange={onChange}
        required
      >
        <option value="">Selecione o professor</option>
        {teachers.map((t) => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>
      <select
        name="classId"
        value={form.classId}
        onChange={onChange}
        required
      >
        <option value="">Selecione a sala</option>
        {classes.map((cls) => (
          <option key={cls.id} value={cls.id}>{cls.code}</option>
        ))}
      </select>
      <button type="submit">Cadastrar</button>
      {message && <p>{message}</p>}
    </form>
  </Container>
);

export default ExamForm;
