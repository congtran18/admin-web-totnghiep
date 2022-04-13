import axios from "axios";

import api from "../api/api"

// Create new goal
const createType = async (typeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post("/typeProduct", typeData, config);

  return response.data;
};

// Get user goals
const getTypes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get("/typeProduct", config);

  return response.data;
};

// Delete user goal
const deleteType = async (typeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.delete("/typeProduct" + typeId, config);

  return response.data;
};

const typeService = {
  createType,
  getTypes,
  deleteType,
};

export default typeService;
