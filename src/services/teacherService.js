// src/services/teacherService.js
import axios from "axios";

/**
 * Cria um novo professor
 */
export const createTeacherService = async (teacherData, token) => {
  const response = await axios.post(
    "http://localhost:3000/v1/teacher",
    teacherData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

/**
 * Retorna todos os professores
 */
export const getAllTeachersService = async (token) => {
  const response = await axios.get("http://localhost:3000/v1/teacher", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * Deleta um professor por ID
 */
export const deleteTeacherService = async (teacherId, token) => {
  const response = await axios.delete(
    `http://localhost:3000/v1/teacher/${teacherId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
