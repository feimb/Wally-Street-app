import api from "./api";
import { jwtDecode } from "jwt-decode";

export const getUser = async () => {
  const token = localStorage.getItem("token");

  const payload = jwtDecode(token);
  const userId = payload.usuario;

  const response = await api.get(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};