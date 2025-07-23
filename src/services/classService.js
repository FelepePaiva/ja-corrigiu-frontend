// src/services/classService.js
import axios from "axios";

/**
 * Retorna todas as turmas do sistema
 */
export const getAllClassesService = async () => {
  const response = await axios.get("http://localhost:3000/v1/class");
  return response.data;
};

/**
 * Retorna as turmas associadas a um professor específico
 */
export const getTeacherByIdClassService = async (teacherId, token) => {
  const response = await axios.get(
    `http://localhost:3000/v1/teacher/${teacherId}/class`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

/**
 * Retorna os alunos de uma turma específica
 */
export const getStudentsByClassIdService = async (classId, token) => {
  const response = await axios.get(
    `http://localhost:3000/v1/class/${classId}/students`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
