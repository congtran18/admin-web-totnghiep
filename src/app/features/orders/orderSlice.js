import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderService from "./orderService";
import {
  toast
} from "react-toastify";

const initialState = {
  orders: [],
  order: null,
  total: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  reload: false,
  message: "",
};

// Create a new order
export const createOrder = createAsyncThunk(
  "orders/post",
  async (orderData, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await orderService.createOrder(orderData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "orders/put",
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.accessToken;
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await orderService.updateOrder(token, id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all orders
export const getOrders = createAsyncThunk(
  "orders/getAll",
  async (params, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await orderService.getOrders(token, params);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all restore orders
export const getRestoreOrders = createAsyncThunk(
  "orders/getAllRestore",
  async (params, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await orderService.getRestoreOrders(token, params);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get order by id
export const getOrderById = createAsyncThunk(
  "orders/getById",
  async (id, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await orderService.getOrderById(token, id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Track order
export const trackOrder = createAsyncThunk(
  "orders/track",
  async (id, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await orderService.trackOrder(token, id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeOrder = createAsyncThunk(
  "orders/remove",
  async (id, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await orderService.removeOrder(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orders = [];
      state.total = 0;
      state.isError = false;
      state.isSuccess = false;
      state.order = null;
      state.isLoading = false;
      state.message = "";
      state.reload = !state.reload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.orders.unshift(action.payload);
        toast.success("Thêm sản phẩm thành công!");
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(state.message);
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.orders.unshift(action.payload);
        toast.success("Cập nhật sản phẩm thành công!");
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(state.message);
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.orders = action.payload.order;
        state.total = action.payload.totalpage;
        state.isLoading = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRestoreOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRestoreOrders.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.orders = action.payload.order;
        state.total = action.payload.total;
        state.isLoading = false;
      })
      .addCase(getRestoreOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOrderById.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.order = action.payload;
        // state.isLoading = false;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        // state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(trackOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(trackOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // toast.success("Xoá tạm thời sản phẩm thành công!");
        // state.orders = state.orders.filter(
        //   (order) => order._id !== action.payload.id
        // );
      })
      .addCase(trackOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Xoá vĩnh viễn sản phẩm thành công!");
        // state.orders = state.orders.filter(
        //   (order) => order._id !== action.payload.id
        // );
      })
      .addCase(removeOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
