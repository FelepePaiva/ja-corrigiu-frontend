import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/Button";
import Select from "../components/Select";
import Input from "../components/Input"

const ExamSection = ({ token }) => {
  console.log("ViewExamSection montado!");

  const [exams, setExams] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);

  const [teachers, setTeachers] = useState([]);
  const [disciplines, setDisciplines] = useState([]);

  const [filters, setFilters] = useState({
    teacherId: "",
    disciplineId: "",
    classCode: "",
  });

  const fetchExamFilters = async () => {
    try {
      const [teachersRes, disciplinesRes] = await Promise.all([
        axios.get("http://localhost:3000/v1/teacher", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:3000/v1/disciplines", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setTeachers(teachersRes.data);
      setDisciplines(disciplinesRes.data);
    } catch (err) {
      console.error("Erro ao carregar filtros:", err);
    }
  };

  const fetchExams = async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (filters.teacherId) params.append("teacherId", filters.teacherId);
      if (filters.disciplineId) params.append("disciplineId", filters.disciplineId);
      if (filters.classCode) params.append("classCode", filters.classCode);

      const res = await axios.get(
        `http://localhost:3000/v1/exam?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setExams(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (err) {
      console.error("Erro ao buscar provas:", err);
      setExams([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showTable) {
      fetchExamFilters();
      fetchExams();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showTable]);

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchExams();
  };

  const handleClear = () => {
    setFilters({
      teacherId: "",
      disciplineId: "",
      classCode: "",
    });
    fetchExams();
  };

  return (
    <section>
      <div style={{ margin: "20px 0", display: "flex", gap: "10px" }}>
        <Button onClick={() => setShowTable((prev) => !prev)}>
          {showTable ? "Ocultar Lista de Provas" : "Exibir Provas"}
        </Button>
      </div>

      {showTable && (
        <>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <Select
              name="teacherId"
              value={filters.teacherId}
              onChange={handleChange}
            >
              <option value="">Todos os Professores</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </Select>

            <Select
              name="disciplineId"
              value={filters.disciplineId}
              onChange={handleChange}
            >
              <option value="">Todas as Disciplinas</option>
              {disciplines.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </Select>


            <Button type="submit">Filtrar</Button>
            <Button type="button" onClick={handleClear}>
              Limpar Filtros
            </Button>
          </form>

          {loading && <p>Carregando provas...</p>}

          {!loading && exams.length > 0 && (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Bimestre</th>
                  <th>Professor</th>
                  <th>Disciplina</th>
                  <th>Turma (Código)</th>
                  <th>Qtd. Questões</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => (
                  <tr key={exam.id}>
                    <td>{exam.id}</td>
                    <td>{exam.title}</td>
                    <td>{exam.bimester}</td>
                    <td>{exam.teacher?.name || exam.teacherId}</td>
                    <td>{exam.discipline?.name || "—"}</td>
                    <td>{exam.class?.code || exam.classId}</td>
                    <td>{exam.questions_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && exams.length === 0 && <p>Nenhuma prova encontrada.</p>}
        </>
      )}
    </section>
  );
};

export default ExamSection;
