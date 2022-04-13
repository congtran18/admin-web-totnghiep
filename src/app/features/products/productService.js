import axios from "axios";

import api from "../api/api"

// Create new goal
const createProduct = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post("/product", productData, config);

  return response.data;
};

// Get user goals
const getProducts = async (token, params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get("/product", { params }, config);

  console.log(response.data)

  return response.data;
};

// Delete user goal
const deleteProduct = async (productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.delete("" + productId, config);

  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  deleteProduct,
};

export default productService;
