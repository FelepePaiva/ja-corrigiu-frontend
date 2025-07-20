// src/sections/CreateTeacherSection.jsx

import { useState } from "react";
import TeacherForm from "../components/CreateTeacherForm";
import TeachersTable from "../components/TeachersTable";
import { createTeacherService } from "../services/teacherService";
import Button from "../components/Button";
import styled from "styled-components";

const ButtonGroup = styled.div`
  margin: 20px 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const CreateTeacherSection = ({ token, disciplines }) => {
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(false); // 👈 Começa como false!
  const [message, setMessage] = useState("");

  const [teacherForm, setTeacherForm] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
    disciplineId: "",
  });

  const toggleForm = () => {
    setShowForm((prev) => !prev);
    setMessage("");
  };

  const toggleTable = () => {
    setShowTable((prev) => !prev);
  };

  const handleChange = (e) => {
    setTeacherForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await createTeacherService(
        {
          ...teacherForm,
          disciplineId: Number(teacherForm.disciplineId),
        },
        token
      );
      setMessage("Professor cadastrado com sucesso!");
      setTeacherForm({
        name: "",
        email: "",
        cpf: "",
        password: "",
        disciplineId: "",
      });
    } catch (err) {
      setMessage(`Erro: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <section>
      <div style={{ margin: "20px 0", display: "flex", gap: "10px" }}>
        <Button onClick={toggleForm}>
          {showForm ? "Fechar Cadastro de Professor" : "Cadastrar Novo Professor"}
        </Button>

        <Button onClick={toggleTable}>
          {showTable ? "Ocultar Lista de Professores" : "Exibir Todos os Professores"}
        </Button>
      </div>

      {showForm && (
        <TeacherForm
          form={teacherForm}
          onChange={handleChange}
          onSubmit={handleSubmit}
          disciplines={disciplines}
          message={message}
        />
      )}

      {/* A tabela só aparece quando o botão for clicado */}
      {showTable && <TeachersTable />}
    </section>
  );
};

export default CreateTeacherSection;
