import api from "./api";

const API_URL = "/transactions";

export const getTransactions = async (asset_id, type) => {
  const token = localStorage.getItem("token");

  const response = await api.get(API_URL, {
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