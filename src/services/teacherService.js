import axios from "axios";

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

export const getAllTeachersService = async (token) => {
  const response = await axios.get("http://localhost:3000/v1/teacher", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

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
