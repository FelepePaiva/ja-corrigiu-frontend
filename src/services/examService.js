import axios from "axios";
import api from "./api";

export const createExamService = async (examData, token) => {
  const response = await axios.post(
    "http://localhost:3000/v1/exam",
    examData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getExamsByTeacherService = async (teacherId) => {
  const params = new URLSearchParams();
  if (teacherId) params.append("teacherId", teacherId);

  const response = await api.get(`/exam?${params.toString()}`);
  return response.data;
};
export const removeExamByIdService = async (id) => {
  await api.delete(`/exam/${id}`);
};
