import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";
import {
  toast
} from "react-toastify";

const initialState = {
  products: [],
  product: null,
  total: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  reload: false,
  message: "",
};

// Create a new product
export const createProduct = createAsyncThunk(
  "products/post",
  async (productData, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await productService.createProduct(productData, token);
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

export const updateProduct = createAsyncThunk(
  "products/put",
  async (productData, thunkAPI) => {
    try {
      const { _id, ...rest} = productData
      // const token = thunkAPI.getState().auth.user.accessToken;
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await productService.updateProduct(_id, rest, token);
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

// Get all products
export const getProducts = createAsyncThunk(
  "products/getAll",
  async (params, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await productService.getProducts(token,params);
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

// Get all restore products
export const getRestoreProducts = createAsyncThunk(
  "products/getAllRestore",
  async (params, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await productService.getRestoreProducts(token,params);
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

// Get product by id
export const getProductById = createAsyncThunk(
  "products/getById",
  async (id, thunkAPI) => {
    console.log("vo day")
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await productService.getProductById(token,id);
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

// Track product
export const trackProduct = createAsyncThunk(
  "products/track",
  async (id, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await productService.trackProduct(token ,id);
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

export const removeProduct = createAsyncThunk(
  "products/remove",
  async (id, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await productService.removeProduct(id, token);
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

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProduct: (state) => {
      state.products= [];
      state.total= 0;
      state.isError= false;
      state.isSuccess= false;
      state.product = null;
      state.isLoading= false;
      state.message= "";
      state.reload = !state.reload
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.products.unshift(action.payload);
        toast.success("Thêm sản phẩm thành công!");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(state.message);
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // const index = state.findIndex(product => product._id === action.payload._id);
        // state[index] = {
        //   ...state[index],
        //   ...action.payload,
        // };
        toast.success("Cập nhật sản phẩm thành công!");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(state.message);
      })
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.products = action.payload.product;
        state.total = action.payload.total;
        state.isLoading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRestoreProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRestoreProducts.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.products = action.payload.product;
        state.total = action.payload.total;
        state.isLoading = false;
      })
      .addCase(getRestoreProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProductById.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.product = action.payload;
        // state.isLoading = false;
      })
      .addCase(getProductById.rejected, (state, action) => {
        // state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(trackProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(trackProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // toast.success("Xoá tạm thời sản phẩm thành công!");
        // state.products = state.products.filter(
        //   (product) => product._id !== action.payload.id
        // );
      })
      .addCase(trackProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Xoá vĩnh viễn sản phẩm thành công!");
        // state.products = state.products.filter(
        //   (product) => product._id !== action.payload.id
        // );
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetProduct } = productSlice.actions;
export default productSlice.reducer;
