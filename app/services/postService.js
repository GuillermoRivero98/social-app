import axios from "axios";
const API_URL = "http://localhost:3001/api";

export const uploadPost = async (postData, token) => {
  const response = await axios.post(`${API_URL}/posts/upload`, postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getFeed = async (token) => {
  const response = await axios.get(`${API_URL}/posts/feed`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const likePost = async (postId, token) => {
  const response = await axios.post(`${API_URL}/posts/${postId}/like`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createComment = async (postId, comment, token) => {
  const response = await axios.post(
    `${API_URL}/posts/${postId}/comments`,
    { content: comment },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
