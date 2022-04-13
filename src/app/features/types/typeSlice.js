import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import typeService from "./typeService";

const initialState = {
  types: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create a new goal
export const createType = createAsyncThunk(
  "/typeProduct/post",
  async (typeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await typeService.createType(typeData, token);
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

// Get product types
export const getTypes = createAsyncThunk(
  "/typeProduct/get",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await typeService.getTypes(token);
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

// Delete user goal
export const deleteType = createAsyncThunk(
  "/typeProduct/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await typeService.deleteType(id, token);
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

const typeSlice = createSlice({
  name: "type",
  initialState,
  reducers: {
    resetAllType: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.types.push(action.payload);
      })
      .addCase(createType.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.types = action.payload;
      })
      .addCase(getTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.types = state.types.filter(
          (type) => type._id !== action.payload.id
        );
      })
      .addCase(deleteType.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetAllType } = typeSlice.actions;
export default typeSlice.reducer;
