import axios from "axios";

const API_URL = "http://localhost/portfolio";

export const getPortfolio = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteAssetPortfolio = async (asset_id) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${API_URL}/${asset_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};