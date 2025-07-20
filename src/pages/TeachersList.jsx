import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const TeacherCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  background-color: #f9f9f9;
`;

const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/v1/teacher");
        setTeachers(res.data);
      } catch (err) {
        console.error("Erro ao buscar professores:", err);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <Container>
      <Title>Lista de Professores</Title>
      {teachers.length === 0 ? (
        <p>Nenhum professor encontrado.</p>
      ) : (
        teachers.map((teacher) => (
          <TeacherCard key={teacher.id}>
            <p><strong>Nome:</strong> {teacher.name}</p>
            <p><strong>Email:</strong> {teacher.email}</p>
            <p><strong>Disciplina:</strong> {teacher.discipline || "Não associada"}</p>
          </TeacherCard>
        ))
      )}
    </Container>
  );
};

export default TeachersList;
