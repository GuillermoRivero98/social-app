import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { token } = response.data;
    await AsyncStorage.setItem("token", token);
    return token;
  } catch (error) {
    throw new Error("Error en la autenticación.");
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error("Error en el registro.");
  }
};

export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

export const logout = async () => {
  await AsyncStorage.removeItem("token");
};
