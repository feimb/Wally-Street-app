import axios from "axios";

const API_URL = "http://localhost/trade";

export const BuyAsset = async (asset_id, quantity) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/buy`,
    { asset_id, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const SellAsset = async (asset_id, quantity) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/sell`,
    { asset_id, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};