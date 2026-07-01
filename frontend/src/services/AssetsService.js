import api from "./api";

const API_URL = "/assets";

export const getAssets = async (min, max, name) => {
  const params = {};

  if (min) params.min = min;
  if (max) params.max = max;
  if (name) params.name = name;

  const response = await api.get(API_URL, {
    params,
  });

  return response.data;
};

export const UpdateAssets = async () => {
  const token = localStorage.getItem("token");

  const response = await api.put(
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
  const token = localStorage.getItem("token");

  const response = await api.get(`${API_URL}/${id}/history/5`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};