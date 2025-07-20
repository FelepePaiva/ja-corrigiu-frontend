import { useEffect, useState } from "react";
import StudentForm from "../components/CreateStudentForm";
import { createStudentService } from "../services/studentService";
import {getAllClassesService} from "../services/classService"

const CreateStudent = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    cpf: "",
    registration_code: "",
    classId: "",
  });

  const [classes, setClasses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getAllClassesService();
        setClasses(data);
      } catch (error) {
        setMessage("Erro ao carregar turmas");
      }
    };

    fetchClasses();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const preparedData = 
    {
    ...form,
    classId: Number(form.classId),
    };
    console.log("Enviando:", {
  ...studentForm,
  classId: Number(studentForm.classId),
});
console.log("Token:", token);

    try {
      await createStudentService(form);
      setMessage("Aluno cadastrado com sucesso!");
      setForm({
        name: "",
        email: "",
        cpf: "",
        registration_code: "",
        classId: "",
      });
    } catch (err) {
      setMessage("Erro: " + err.message);
    }
  };

  return (
    <StudentForm
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      classes={classes}
      message={message}
    />
  );
};

export default CreateStudent;
