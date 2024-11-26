import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const uploadImage = async (formData, token) => {
  try {
    const response = await axios.post(`${API_URL}/posts/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al subir la imagen:", error.response?.data || error.message);
    throw new Error("No se pudo subir la imagen. Inténtalo de nuevo.");
  }
};
