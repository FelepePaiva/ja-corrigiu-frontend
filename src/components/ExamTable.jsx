import styled from "styled-components";

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
  background-color: #cb2222;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #e03b3b;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Componente principal
const ExamTable = ({ exams, onRemove, loading }) => {
  return (
    <TableContainer>
      <StyledTable>
        <Thead>
          <tr>
            <Th>Título</Th>
            <Th>Bimestre</Th>
            <Th>Turma</Th>
            <Th>Ações</Th>
          </tr>
        </Thead>
        <tbody>
          {exams.length === 0 ? (
            <tr>
              <Td colSpan={3} style={{ textAlign: "center", padding: 16 }}>
                Nenhuma prova cadastrada.
              </Td>
            </tr>
          ) : (
            exams.map((exam) => (
              <tr key={exam.id}>
                <Td>{exam.title}</Td>
                <Td>{exam.bimester}</Td>
                <Td>{exam.class?.code || exam.classId}</Td>
                <Td>
                  <Button
                    type="button"
                    disabled={loading === exam.id}
                    onClick={() => onRemove(exam.id)}
                  >
                    {loading === exam.id ? "Removendo..." : "Remover"}
                  </Button>
                </Td>
              </tr>
            ))
          )}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default ExamTable;
