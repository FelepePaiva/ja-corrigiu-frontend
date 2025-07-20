import { useState } from "react";
import StudentForm from "../components/CreateStudentForm";
import StudentsTable from "../components/StudentsTable";
import { createStudentService } from "../services/studentService";
import Button from "../components/Button"; // ✅ botão estilizado

const CreateStudentSection = ({ token, classes }) => {
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(false); // Agora começa fechado
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    cpf: "",
    registration_code: "",
    classId: "",
  });

  const toggleForm = () => {
    setShowForm((prev) => !prev);
    setMessage("");
  };

  const toggleTable = () => {
    setShowTable((prev) => !prev);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await createStudentService(
        {
          ...form,
          classId: Number(form.classId),
        },
        token
      );
      setMessage("Aluno cadastrado com sucesso!");
      setForm({
        name: "",
        email: "",
        cpf: "",
        registration_code: "",
        classId: "",
      });
    } catch (err) {
      setMessage(`Erro: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <section>
      <div style={{ margin: "20px 0", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <Button onClick={toggleForm}>
          {showForm ? "Fechar Cadastro de Aluno" : "Cadastrar Novo Aluno"}
        </Button>
        {/* Botão de exibir alunos na mesma linha */}
        <Button onClick={toggleTable}>
          {showTable ? "Ocultar Lista de Alunos" : "Exibir Todos os Alunos"}
        </Button>
      </div>

      {showForm && (
        <StudentForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          classes={classes}
          message={message}
        />
      )}

      {showTable && <StudentsTable />}
    </section>
  );
};

export default CreateStudentSection;
