import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";

import TeacherForm from "../components/CreateTeacherForm";
import TeachersTable from "../components/TeachersTable";
import StudentForm from "../components/CreateStudentForm";
import StudentsTable from "../components/StudentsTable";
import ExamForm from "../components/CreateExamForm";

import { createTeacherService } from "../services/teacherService";
import { createStudentService } from "../services/studentService";
import { createExamService } from "../services/examService"; 
import { getAllClassesService } from "../services/classService";
import { getAllDisciplinesService } from "../services/disciplineService";

const Container = styled.div`
  padding: 40px;
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
`;

const Info = styled.p`
  font-size: 16px;
  margin-bottom: 8px;
`;

const Button = styled.button`
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  margin: 10px 10px 20px 0;

  &:hover {
    background-color: #34495e;
  }
`;

const AdminDashboard = () => {
  const { user, token } = useAuth();

  // Estados para mostrar formulários e tabelas
  const [showCreateTeacher, setShowCreateTeacher] = useState(false);
  const [showTeachersTable, setShowTeachersTable] = useState(true);

  const [showCreateStudent, setShowCreateStudent] = useState(false);
  const [showStudentsTable, setShowStudentsTable] = useState(true);

  const [showCreateExam, setShowCreateExam] = useState(false); // <-- NOVO

  // Mensagens gerais
  const [teacherMessage, setTeacherMessage] = useState("");
  const [studentMessage, setStudentMessage] = useState("");
  const [examMessage, setExamMessage] = useState(""); // <-- NOVO

  // Dados para selects
  const [disciplines, setDisciplines] = useState([]);
  const [classes, setClasses] = useState([]);

  // Formulário professor
  const [teacherForm, setTeacherForm] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
    disciplineId: "",
  });

  // Formulário aluno
  const [studentForm, setStudentForm] = useState({
    name: "",
    email: "",
    cpf: "",
    registration_code: "",
    classId: "",
  });

  // Formulário exame
  const [examForm, setExamForm] = useState({
    title: "",
    questions_count: "",
    answer_key: "",
    bimester: "",
    teacherId: user?.id || "", // pré-preenchido com usuário logado
    classId: "",
  });

  // Buscar disciplinas e classes no carregamento da página
  useEffect(() => {
    getAllDisciplinesService()
      .then(setDisciplines)
      .catch(() => setTeacherMessage("Erro ao carregar disciplinas"));

    getAllClassesService()
      .then(setClasses)
      .catch(() => setStudentMessage("Erro ao carregar classes"));
  }, []);

  // Toggle dos formulários e tabelas
  const toggleCreateTeacher = () => {
    setShowCreateTeacher((prev) => !prev);
    if (!showCreateTeacher) setShowTeachersTable(false);
    else setShowTeachersTable(true);
    setTeacherMessage("");
  };

  const toggleTeachersTable = () => {
    setShowTeachersTable((prev) => !prev);
    if (!showTeachersTable) setShowCreateTeacher(false);
  };

  const toggleCreateStudent = () => {
    setShowCreateStudent((prev) => !prev);
    if (!showCreateStudent) setShowStudentsTable(false);
    else setShowStudentsTable(true);
    setStudentMessage("");
  };

  const toggleStudentsTable = () => {
    setShowStudentsTable((prev) => !prev);
    if (!showStudentsTable) setShowCreateStudent(false);
  };

  const toggleCreateExam = () => {
    setShowCreateExam((prev) => !prev);
    setExamMessage("");
  };

  // Handle forms change
  const handleTeacherChange = (e) => {
    setTeacherForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStudentChange = (e) => {
    setStudentForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleExamChange = (e) => {
    setExamForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit professor
  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    setTeacherMessage("");
    try {
      await createTeacherService(
        {
          ...teacherForm,
          disciplineId: Number(teacherForm.disciplineId),
        },
        token
      );
      setTeacherMessage("Professor cadastrado com sucesso!");
      setTeacherForm({
        name: "",
        email: "",
        cpf: "",
        password: "",
        disciplineId: "",
      });
    } catch (err) {
      setTeacherMessage(`Erro: ${err.response?.data?.message || err.message}`);
    }
  };

  // Submit aluno
  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    setStudentMessage("");
    try {
      await createStudentService(
        {
          ...studentForm,
          classId: Number(studentForm.classId),
        },
        token
      );
      setStudentMessage("Aluno cadastrado com sucesso!");
      setStudentForm({
        name: "",
        email: "",
        cpf: "",
        registration_code: "",
        classId: "",
      });
    } catch (err) {
      setStudentMessage(`Erro: ${err.response?.data?.message || err.message}`);
    }
  };

  // Submit prova
  const handleExamSubmit = async (e) => {
    e.preventDefault();
    setExamMessage("");

    try {
      const answerArray = examForm.answer_key
        .split(",")
        .map((s) => s.trim().toUpperCase());

      await createExamService(
        {
          ...examForm,
          classId: Number(examForm.classId),
          bimester: Number(examForm.bimester),
          questions_count: Number(examForm.questions_count),
          answer_key: answerArray,
        },
        token
      );

      setExamMessage("Prova cadastrada com sucesso!");
      setExamForm({
        title: "",
        questions_count: "",
        answer_key: "",
        bimester: "",
        teacherId: user?.id || "",
        classId: "",
      });
    } catch (err) {
      setExamMessage(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Erro ao cadastrar prova."
      );
    }
  };

  return (
    <Container>
      <Title>Admin Dashboard</Title>
      <Info>
        <strong>Nome:</strong> {user?.name}
      </Info>
      <Info>
        <strong>Email:</strong> {user?.email}
      </Info>
      <Info>
        <strong>Role:</strong> {user?.role}
      </Info>

      <hr style={{ margin: "20px 0" }} />

      {/* Botões + Form Professor */}
      <div>
        <Button onClick={toggleCreateTeacher}>
          {showCreateTeacher ? "Fechar Cadastro de Professor" : "Cadastrar Novo Professor"}
        </Button>
        <Button onClick={toggleTeachersTable}>
          {showTeachersTable ? "Ocultar Lista de Professores" : "Mostrar Lista de Professores"}
        </Button>
      </div>

      {showCreateTeacher && (
        <TeacherForm
          form={teacherForm}
          onChange={handleTeacherChange}
          onSubmit={handleTeacherSubmit}
          disciplines={disciplines}
          message={teacherMessage}
        />
      )}

      {showTeachersTable && <TeachersTable />}

      <hr style={{ margin: "30px 0" }} />

      {/* Botões + Form Aluno */}
      <div>
        <Button onClick={toggleCreateStudent}>
          {showCreateStudent ? "Fechar Cadastro de Aluno" : "Cadastrar Novo Aluno"}
        </Button>
        <Button onClick={toggleStudentsTable}>
          {showStudentsTable ? "Ocultar Lista de Alunos" : "Mostrar Lista de Alunos"}
        </Button>
      </div>

      {showCreateStudent && (
        <StudentForm
          form={studentForm}
          onChange={handleStudentChange}
          onSubmit={handleStudentSubmit}
          classes={classes}
          message={studentMessage}
        />
      )}

      {showStudentsTable && <StudentsTable />}

      <hr style={{ margin: "30px 0" }} />

      {/* Botão + Form Prova */}
      <div>
        <Button onClick={toggleCreateExam}>
          {showCreateExam ? "Fechar Cadastro de Prova" : "Cadastrar Nova Prova"}
        </Button>
      </div>

      {showCreateExam && (
        <ExamForm
          form={examForm}
          onChange={handleExamChange}
          onSubmit={handleExamSubmit}
          classes={classes}
          message={examMessage}
          teachers={[{ id: user?.id, name: user?.name }]} // pode adaptar se quiser listar todos
        />
      )}
    </Container>
  );
};

export default AdminDashboard;
