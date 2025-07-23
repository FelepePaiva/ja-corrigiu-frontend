import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getTeacherByIdClassService } from "../services/classService";
import { getStudentsByClassIdService } from "../services/classService";

// Styled Components reutilizados
const TableContainer = styled.div`
  padding: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background-color: #f0f0f0;
`;

const Th = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #ccc;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Button = styled.button`
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #34495e;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  height: 100vh; width: 100vw;
  background: rgba(30,35,40,0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  position: relative;
  background: #fff;
  padding: 32px 32px 24px;
  border-radius: 8px;
  min-width: 380px;
  max-width: 98vw;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 24px 9px rgba(35, 41, 70, 0.10);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 22px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #232946;
  cursor: pointer;
`;

const TeacherClassesSection = ({ teacherId, token }) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [studentsError, setStudentsError] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getTeacherByIdClassService(teacherId, token);
        setClasses(data);
      } catch (err) {
        setError("Erro ao carregar turmas.");
      } finally {
        setLoading(false);
      }
    };

    if (teacherId && token) fetchClasses();
  }, [teacherId, token]);

  const handleShowStudents = async (classObj) => {
    console.log("Turma selecionada:", classObj);
  console.log("ID enviado:", classObj?.id);
    setSelectedClass(classObj);
    setShowModal(true);
    setLoadingStudents(true);
    setStudentsError("");
    try {
      const alunos = await getStudentsByClassIdService(classObj.id, token);
      setStudents(alunos);
    } catch (err) {
      setStudents([]);
      setStudentsError("Erro ao buscar alunos da turma.");
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedClass(null);
    setStudents([]);
    setStudentsError("");
  };

  return (
    <TableContainer>
      <h2>Minhas Turmas</h2>
      {loading ? (
        <p>Carregando turmas...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : classes.length === 0 ? (
        <p>Nenhuma turma encontrada.</p>
      ) : (
        <StyledTable>
          <Thead>
            <tr>
              <Th>Código</Th>
              <Th>Ano</Th>
              <Th>Ações</Th>
            </tr>
          </Thead>
          <tbody>
            {classes.map((turma) => (
              <tr key={turma.id}>
                <Td>{turma.code}</Td>
                <Td>{turma.year}</Td>
                <Td>
                  <Button onClick={() => handleShowStudents(turma)}>
                    Ver Alunos
                  </Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      )}

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton aria-label="Fechar" onClick={handleCloseModal}>
              ×
            </CloseButton>
            <h3>Alunos da turma {selectedClass?.code}</h3>
            {loadingStudents ? (
              <p>Carregando alunos...</p>
            ) : studentsError ? (
              <p style={{ color: "red" }}>{studentsError}</p>
            ) : students.length === 0 ? (
              <p>Nenhum aluno encontrado nesta turma.</p>
            ) : (
              <StyledTable>
                <Thead>
                  <tr>
                    <Th>Nome</Th>
                    <Th>Matrícula</Th>
                    <Th>Ações</Th>
                  </tr>
                </Thead>
                <tbody>
                  {students.map(aluno => (
                    <tr key={aluno.id}>
                      <Td>{aluno.name}</Td>
                      <Td>{aluno.registration || aluno.matricula}</Td>
                      <Td>
                        <Button disabled title="Em breve">
                          Notas
                        </Button>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </StyledTable>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </TableContainer>
  );
};

export default TeacherClassesSection;
