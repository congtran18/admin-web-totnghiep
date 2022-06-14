import api from "../api/api"

// Create new user
const createUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post("/users", userData, config);

  return response.data;
};

// Update user
const updateUser = async (id, userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.patch(`/users/${id}`, userData, config);


  return response.data;
};

// Get all users
const getUsers = async (token, params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get("/users/search", { params }, config);

  return response.data[0]
};

const getRestoreUsers = async (token, params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get("/users/restore", { params }, config);

  return response.data;
};

//Get user by id
const getUserById = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(`/users/${id}`, config);

  return response.data;
};

const updateTimeUser = async (token, data) => {

  const {id, ...res} = data

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.patch(`/users/update-time/${id}`, res, config);

  return response.data;
};

// Delete user by id
const trackUser = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(`/users/track/${id}`, config);

  return response;
};

// Remove forever user by id
const removeUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.delete(`/users/${id}`, config);

  return response;
};

const userService = {
  createUser,
  updateUser,
  getUsers,
  getRestoreUsers,
  updateTimeUser,
  trackUser,
  removeUser,
  getUserById
};

export default userService;
