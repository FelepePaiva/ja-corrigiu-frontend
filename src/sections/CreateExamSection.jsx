import { useState } from "react";
import ExamForm from "../components/CreateExamForm";
// (Você pode criar/usar ExamsTable depois, se quiser listar provas)
import { createExamService } from "../services/examService";

const CreateExamSection = ({ token, classes, teacherId }) => {
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    questions_count: "",
    answer_key: "",
    bimester: "",
    teacherId: teacherId || "",
    classId: "",
  });

  const toggleForm = () => {
    setShowForm((prev) => !prev);
    setMessage("");
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const answerArray = form.answer_key
        .split(",")
        .map((s) => s.trim().toUpperCase());

      await createExamService(
        {
          ...form,
          classId: Number(form.classId),
          bimester: Number(form.bimester),
          questions_count: Number(form.questions_count),
          answer_key: answerArray,
        },
        token
      );
      setMessage("Prova cadastrada com sucesso!");
      setForm({
        title: "",
        questions_count: "",
        answer_key: "",
        bimester: "",
        teacherId: teacherId || "",
        classId: "",
      });
    } catch (err) {
      setMessage(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Erro ao cadastrar prova."
      );
    }
  };

  return (
    <section>
      <div style={{ margin: "20px 0" }}>
        <button onClick={toggleForm}>
          {showForm ? "Fechar Cadastro de Prova" : "Cadastrar Nova Prova"}
        </button>
      </div>
      {showForm && (
        <ExamForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          classes={classes}
          message={message}
          teachers={[{ id: teacherId, name: "" }]} // adapte se quiser mais de um
        />
      )}
      {/* 
        // Se quiser, adicione uma tabela de provas depois:
        // {<ExamsTable />}
      */}
    </section>
  );
};

export default CreateExamSection;
