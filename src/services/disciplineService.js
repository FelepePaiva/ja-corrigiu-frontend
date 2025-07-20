import axios from "axios";

export const getAllDisciplinesService = async (token) => {
  try {
    const response = await axios.get("http://localhost:3000/v1/disciplines", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar disciplinas:", error);
    throw error;
  }
};
