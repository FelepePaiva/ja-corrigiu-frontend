import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";

// Styled-components
const TableContainer = styled.div`padding: 20px;`;
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
const FilterContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
`;
const Input = styled.input`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 160px;
`;
const Button = styled.button`
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #34495e;
  }
`;
const RemoveButton = styled(Button)`
  background-color: #c0392b;

  &:hover {
    background-color: #e74c3c;
  }
`;

const StudentsTable = () => {
  const { token } = useAuth();

  const [students, setStudents] = useState([]);
  const [filterClassCode, setFilterClassCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentClassCode, setCurrentClassCode] = useState(""); // para mostrar a sala

  const fetchStudents = async () => {
    setLoading(true);
    try {
      let res;
      if (filterClassCode.trim()) {
        // Busca alunos de uma sala específica
        res = await axios.get(
          `http://localhost:3000/v1/student/${filterClassCode}/class`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data && res.data.students) {
          setCurrentClassCode(res.data.code || "");
          setStudents(res.data.students);
        } else {
          setCurrentClassCode("");
          setStudents([]);
        }
      } else {
        // Busca todos os alunos
        res = await axios.get("http://localhost:3000/v1/student", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentClassCode("");
        setStudents(res.data || []);
      }
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
      setStudents([]);
      setCurrentClassCode("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line
  }, []);

  const handleFilterChange = (e) => {
    setFilterClassCode(e.target.value);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchStudents();
  };

  const handleRemove = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/v1/student/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const student = res.data;

      const confirmDelete = window.confirm(
        `Você está prestes a excluir o aluno "${student.name}".\n\n` +
          `Esta ação não pode ser desfeita.\n\n` +
          `Deseja continuar?`
      );

      if (!confirmDelete) return;

      await axios.delete(`http://localhost:3000/v1/student/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Aluno removido com sucesso!");
      fetchStudents();
    } catch (error) {
      console.error("Erro ao remover aluno:", error);
      const msg = error?.response?.data?.message || "Erro ao remover aluno.";
      alert(msg);
    }
  };

  return (
    <TableContainer>
      <h2>Buscar Alunos por Sala</h2>

      <form onSubmit={handleFilterSubmit}>
        <FilterContainer>
          <label htmlFor="filterClassCode">Código da sala:</label>
          <Input
            id="filterClassCode"
            type="text"
            value={filterClassCode}
            onChange={handleFilterChange}
            placeholder="Ex: 6AT"
          />
          <Button type="submit">Buscar</Button>
          <Button
            type="button"
            onClick={() => {
              setFilterClassCode("");
              fetchStudents();
            }}
          >
            Limpar
          </Button>
        </FilterContainer>
      </form>

      {currentClassCode && (
        <p>
          <strong>Sala atual:</strong> {currentClassCode}
        </p>
      )}

      {loading ? (
        <p>Carregando...</p>
      ) : students.length === 0 ? (
        <p>Nenhum aluno encontrado.</p>
      ) : (
        <StyledTable>
          <Thead>
            <tr>
              <Th>ID</Th>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>CPF</Th>
              <Th>Código Matrícula</Th>
              <Th>Sala</Th>
              <Th>Ações</Th>
            </tr>
          </Thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <Td>{student.id}</Td>
                <Td>{student.name}</Td>
                <Td>{student.email}</Td>
                <Td>{student.cpf}</Td>
                <Td>{student.registration_code}</Td>
                {/* Se filtrando, mostra o código da sala retornado; 
                    Se listar todos, pode mostrar -- (ou adaptar p/ outro campo se sua API devolver) */}
                <Td>{currentClassCode || "—"}</Td>
                <Td>
                  <RemoveButton onClick={() => handleRemove(student.id)}>
                    Remover
                  </RemoveButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      )}
    </TableContainer>
  );
};

export default StudentsTable;
