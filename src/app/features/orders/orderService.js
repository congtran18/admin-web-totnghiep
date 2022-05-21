import api from "../api/api"

// Create new order
const createOrder = async (orderData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post("/order", orderData, config);

  return response.data;
};

// Update order
const updateOrder = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(`/order/delivery/${id}`, config);

  return response.data;
};

// Get all orders
const getOrders = async (token, params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get("/order/all", { params }, config);

  console.log("response.data",response.data)

  return response.data;
};

const getRestoreOrders = async (token, params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get("/order/restore", { params }, config);

  return response.data;
};

//Get order by id
const getOrderById = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(`/order/${id}`, config);

  return response.data;
};

// Delete order by id
const trackOrder = async (token ,id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(`/order/track/${id}`, config);

  return response;
};

// Remove forever order by id
const removeOrder = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.delete(`/order/${id}`, config);

  return response;
};

const orderService = {
  createOrder,
  updateOrder,
  getOrders,
  getRestoreOrders,
  trackOrder,
  removeOrder,
  getOrderById
};

export default orderService;
