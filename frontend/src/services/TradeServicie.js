import axios from "axios";

const API_URL = "http://localhost/trade/buy";

export const BuyAsset = async (asset_id, quantity) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    API_URL,
    { asset_id, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};