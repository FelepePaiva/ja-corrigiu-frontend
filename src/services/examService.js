import axios from "axios";

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
