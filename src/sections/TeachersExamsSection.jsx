// src/sections/TeacherExamsSection.jsx

import { useEffect, useState } from "react";
import ExamTable from "../components/ExamTable";
import { getExamsByTeacherService, removeExamByIdService } from "../services/examService";

const TeacherExamsSection = ({ token, teacherId }) => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");

  const fetchExams = async () => {
    try {
      setMessage("");
      const result = await getExamsByTeacherService(teacherId, token);
      setExams(result);
    } catch (err){
        console.error("Erro ao buscar provas:", err); 
      setMessage("Erro ao buscar provas.");
    }
  };

  useEffect(() => {
    fetchExams();
    // eslint-disable-next-line
  }, []);

  const handleRemove = async (id) => {
    if (!window.confirm("Deseja remover esta prova?")) return;
    setLoading(id);
    setMessage("");
    try {
      await removeExamByIdService(id, token);
      setExams((prev) => prev.filter((exam) => exam.id !== id));
      setMessage("Prova removida com sucesso!");
    } catch {
      setMessage("Erro ao remover prova.");
    } finally {
      setLoading("");
    }
  };

  return (
    <section>
      <h2>Minhas Provas</h2>
      {message && (
        <p style={{ color: message.startsWith("Erro") ? "#cb2222" : "#19837c" }}>
          {message}
        </p>
      )}
      <ExamTable exams={exams} onRemove={handleRemove} loading={loading} />
    </section>
  );
};

export default TeacherExamsSection;
