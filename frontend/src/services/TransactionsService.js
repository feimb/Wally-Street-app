import axios from "axios";

const API_URL = "http://localhost";

export const getTransactions = async (asset_id, type) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...(asset_id && { asset_id }),
      ...(type && { type }),
    },
  });

  return response.data;
};