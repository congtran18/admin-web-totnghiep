import api from "../api/api"

// Create new product
const createProduct = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post("/product", productData, config);

  return response.data;
};

// Update product
const updateProduct = async (id, productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log("updateProduct", productData)
  const response = await api.patch(`/product/${id}`, productData, config);

  // console.log("response",response)

  return response.data;
};

// Get all products
const getProducts = async (token, params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get("/product", { params }, config);

  return response.data;
};

const getRestoreProducts = async (token, params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get("/product/restore", { params }, config);

  return response.data;
};

//Get product by id
const getProductById = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(`/product/${id}`, config);

  return response.data;
};

// Delete product by id
const trackProduct = async (token ,id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(`/product/track/${id}`, config);

  return response;
};

// Remove forever product by id
const removeProduct = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.delete(`/product/${id}`, config);

  return response;
};

const productService = {
  createProduct,
  updateProduct,
  getProducts,
  getRestoreProducts,
  trackProduct,
  removeProduct,
  getProductById
};

export default productService;
