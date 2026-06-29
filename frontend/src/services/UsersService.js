import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost";

export const getUser = async () => {
  const token = localStorage.getItem("token");

  const payload = jwtDecode(token);
  const userId = payload.usuario;

  const response = await axios.get(`${API_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};