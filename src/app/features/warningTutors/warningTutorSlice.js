import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import warningTutorService from "./warningTutorService";
import {
  toast
} from "react-toastify";

const initialState = {
  warnings: [],
  warning: null,
  total: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  reload: false,
  message: "",
};


export const acceptWarning = createAsyncThunk(
  "warnings/put",
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.warning.accessToken;
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await warningTutorService.acceptWarning(id, token);
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

// Get all warnings
export const getWarnings = createAsyncThunk(
  "warnings/getAll",
  async (params, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await warningTutorService.getWarnings(token,params);
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


// Get warning by id
export const getWarningById = createAsyncThunk(
  "warnings/getById",
  async (id, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await warningTutorService.getWarningById(token,id);
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

export const removeWarning = createAsyncThunk(
  "warnings/remove",
  async (id, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await warningTutorService.removeWarning(id, token);
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

const warningTutorSlice = createSlice({
  name: "warningTutor",
  initialState,
  reducers: {
    resetWarning: (state) => {
      state.warnings= [];
      state.total= 0;
      state.isError= false;
      state.isSuccess= false;
      state.warning = null;
      state.isLoading= false;
      state.message= "";
      state.reload = !state.reload
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(acceptWarning.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(acceptWarning.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.warnings.unshift(action.payload);
        toast.success("Chấp nhận đơn tố cáo!");
      })
      .addCase(acceptWarning.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(getWarnings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWarnings.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.warnings = action.payload[0].warnings;
        state.total = action.payload[0].count.length  > 0 ? action.payload[0].count[0].totalCount : 1 ;
        state.isLoading = false;
      })
      .addCase(getWarnings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getWarningById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWarningById.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.warning = action.payload;
        state.isLoading = false;
      })
      .addCase(getWarningById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeWarning.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeWarning.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Xoá đơn tố cáo thành công!");
        // state.warnings = state.warnings.filter(
        //   (warning) => warning._id !== action.payload.id
        // );
      })
      .addCase(removeWarning.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetWarning } = warningTutorSlice.actions;
export default warningTutorSlice.reducer;
