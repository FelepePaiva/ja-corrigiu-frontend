import axios from "axios";
export const createStudentService = async (studentData, token) => {
  const response = await axios.post(
    "http://localhost:3000/v1/student",
    studentData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
export const getStudentsByClassIdService = async (classId, token) => {
  const response = await axios.get(
    `http://localhost:3000/v1/student/${classId}/class`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
