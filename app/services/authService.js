import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al registrar usuario");
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Credenciales incorrectas");
  }
};
