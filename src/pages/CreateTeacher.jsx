import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import TeacherForm from "../components/CreateTeacherForm";

const CreateTeacher = () => {
  const { token } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
    disciplineId: "",
  });

  const [disciplines, setDisciplines] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const response = await axios.get("http://localhost:3000/v1/disciplines", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDisciplines(response.data);
      } catch (err) {
        console.error("Erro ao buscar disciplinas:", err);
      }
    };

    fetchDisciplines();
  }, [token]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const formToSend = {
      ...form,
      disciplineId: Number(form.disciplineId),
    };
    console.log("Dados enviados ao backend:", formToSend);
    try {
      console.log("Enviando:", formToSend);
      
      await axios.post("http://localhost:3000/v1/teacher", formToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Professor cadastrado com sucesso!");

      setForm({
        name: "",
        email: "",
        cpf: "",
        password: "",
        disciplineId: "",
      });
    } catch (err) {
      console.error("Erro ao cadastrar professor:", err.response?.data || err);
      setMessage(err.response?.data?.error || "Erro ao cadastrar professor.");
    }
  };

  return (
    <TeacherForm
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      disciplines={disciplines}
      message={message}
    />
  );
};

export default CreateTeacher;
