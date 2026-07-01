import api from "./api";

const API_URL = "/portfolio";

export const getPortfolio = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteAssetPortfolio = async (asset_id) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(`${API_URL}/${asset_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};