import api from "./api";

export const getAllClassesService = async () => {
  const response = await api.get("/class");
  return response.data;
};
