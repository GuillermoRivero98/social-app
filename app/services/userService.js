import axios from "axios";
const API_URL = "http://localhost:3001/api";

export const getUserProfile = async (userId, token) => {
  const response = await axios.get(`${API_URL}/user/profile/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const editUserProfile = async (profileData, token) => {
  const response = await axios.put(`${API_URL}/user/profile/edit`, profileData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getNotifications = async (token) => {
  const response = await axios.get(`${API_URL}/user/notifications`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
