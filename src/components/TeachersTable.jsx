import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { getAllTeachersService, deleteTeacherService } from "../services/teacherService";

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
  width: 120px;
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

const TeachersTable = () => {
  const { token } = useAuth();
  const [teachers, setTeachers] = useState([]);
  const [filterId, setFilterId] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      let data;
      if (filterId) {
        const filtered = await getAllTeachersService(token);
        data = filtered.filter((t) => t.id === Number(filterId));
      } else {
        data = await getAllTeachersService(token);
      }
      setTeachers(data);
    } catch (error) {
      console.error("Erro ao buscar professores:", error);
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleFilterChange = (e) => {
    setFilterId(e.target.value);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchTeachers();
  };

  const handleRemove = async (id) => {
    try {
      const confirmDelete = window.confirm(
        `Você está prestes a excluir o professor ID ${id}.\n` +
          `Todas as provas associadas serão removidas.\n` +
          `Deseja continuar?`
      );
      if (!confirmDelete) return;

      await deleteTeacherService(id, token);
      alert("Professor e provas associadas removidos com sucesso!");
      fetchTeachers();
    } catch (error) {
      console.error("Erro ao remover professor:", error);
      alert(error?.response?.data?.message || "Erro ao remover professor.");
    }
  };

  return (
    <TableContainer>
      <h2>Professores Cadastrados</h2>

      <form onSubmit={handleFilterSubmit}>
        <FilterContainer>
          <label htmlFor="filterId">Filtrar por ID:</label>
          <Input
            id="filterId"
            type="number"
            value={filterId}
            onChange={handleFilterChange}
            placeholder="Digite o ID"
            min="1"
          />
          <Button type="submit">Buscar</Button>
          <Button
            type="button"
            onClick={() => {
              setFilterId("");
              fetchTeachers();
            }}
          >
            Limpar
          </Button>
        </FilterContainer>
      </form>

      {loading ? (
        <p>Carregando...</p>
      ) : teachers.length === 0 ? (
        <p>Nenhum professor encontrado.</p>
      ) : (
        <StyledTable>
          <Thead>
            <tr>
              <Th>ID</Th>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Disciplina</Th>
              <Th>Ações</Th>
            </tr>
          </Thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <Td>{teacher.id}</Td>
                <Td>{teacher.name}</Td>
                <Td>{teacher.email}</Td>
                <Td>{teacher.discipline || "—"}</Td>
                <Td>
                  <RemoveButton onClick={() => handleRemove(teacher.id)}>
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

export default TeachersTable;
