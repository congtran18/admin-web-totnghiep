import axios from "axios";
import api from "../api/api"
import {
  toast
} from "react-toastify";

// Register User
const register = async (userData) => {
  const response = await api.post("abc/auth/login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login User
const login = async (userData) => {
  const response = await api.post("/auth/login", userData);

  if (response.data && response.data.role === ("owner" || "admin")) {
    localStorage.setItem("user", JSON.stringify(response.data));
    toast.success("Đăng nhập thành công!");
    return response.data
  }

  toast.error("Kiểm tra lại thông tin đăng nhập!");
  return null;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;