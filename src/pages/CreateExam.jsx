import { useEffect, useState } from "react";
import { createExamService } from "../services/examService";
import ExamForm from "../components/ExamForm";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const CreateExam = () => {
  const { token } = useAuth();
  const [form, setForm] = useState({
    title: "",
    questions_count: "",
    answer_key: "",
    bimester: "",
    teacherId: "",
    classId: "",
  });
  const [message, setMessage] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Buscar professores e classes da API
    const fetchData = async () => {
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const [tRes, cRes] = await Promise.all([
          axios.get("http://localhost:3000/v1/teacher", { headers }),
          axios.get("http://localhost:3000/v1/class", { headers }),
        ]);
        setTeachers(tRes.data);
        setClasses(cRes.data);
      } catch {
        setMessage("Erro ao carregar professores ou salas.");
      }
    };
    fetchData();
  }, [token]);
  
  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "questions_count" || e.target.name === "bimester") {
      value = Number(value);
    }
    setForm((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Transformar answer_key string em array
    const answerArray = form.answer_key.split(",").map(s => s.trim().toUpperCase());

    try {
      await createExamService(
        { ...form, questions_count: Number(form.questions_count), bimester: Number(form.bimester), answer_key: answerArray },
        token
      );
      setMessage("Prova cadastrada com sucesso!");
      setForm({
        title: "",
        questions_count: "",
        answer_key: "",
        bimester: "",
        teacherId: "",
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
    <ExamForm
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      message={message}
      teachers={teachers}
      classes={classes}
    />
  );
};

export default CreateExam;
