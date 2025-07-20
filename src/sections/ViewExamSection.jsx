import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/Button";

// Se quiser criar um ExamsTable separado no futuro:
const ExamSection = ({ token }) => {
  const [exams, setExams] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [filterId, setFilterId] = useState("");

  const fetchExams = async () => {
    try {
      const url = filterId
        ? `http://localhost:3000/v1/exam/${filterId}`
        : "http://localhost:3000/v1/exam";

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const examsData = Array.isArray(response.data)
        ? response.data
        : [response.data];

      setExams(examsData);
    } catch (err) {
      console.error("Erro ao buscar provas:", err);
      setExams([]);
    }
  };

  useEffect(() => {
    if (showTable) fetchExams();
  }, [showTable]);

  return (
    <section>
      <div style={{ margin: "20px 0", display: "flex", gap: "10px" }}>
        <Button onClick={() => setShowTable((prev) => !prev)}>
          {showTable ? "Ocultar Lista de Provas" : "Exibir Todas as Provas"}
        </Button>
        {showTable && (
          <form
            style={{ display: "flex", gap: "10px" }}
            onSubmit={(e) => {
              e.preventDefault();
              fetchExams();
            }}
          >
            <input
              type="number"
              placeholder="Buscar por ID"
              value={filterId}
              onChange={(e) => setFilterId(e.target.value)}
            />
            <Button type="submit">Buscar</Button>
            <Button
              type="button"
              onClick={() => {
                setFilterId("");
                fetchExams();
              }}
            >
              Limpar
            </Button>
          </form>
        )}
      </div>

      {showTable && exams.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Bimestre</th>
              <th>ID Professor</th>
              <th>ID Turma</th>
              <th>Qtd. Questões</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.id}</td>
                <td>{exam.title}</td>
                <td>{exam.bimester}</td>
                <td>{exam.teacherId}</td>
                <td>{exam.classId}</td>
                <td>{exam.questions_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showTable && exams.length === 0 && <p>Nenhuma prova encontrada.</p>}
    </section>
  );
};

export default ExamSection;
