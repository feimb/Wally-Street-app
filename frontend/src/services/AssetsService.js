import axios from "axios";

const API_URL = "http://localhost/assets";


export const getAssets = async (min, max, name) => {

    const params = {};

    if (min) params.min = min;
    if (max) params.max = max;
    if (name) params.name = name;

    const response = await axios.get(API_URL, {
      params
    });

    return response.data;
};
export const UpdateAssets = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    API_URL,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const getHistory = async (id) => {
  const response = await axios.get(`${API_URL}/${id}/history/5`);
  return response.data;
};