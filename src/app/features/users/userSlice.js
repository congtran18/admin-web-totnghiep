import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";
import {
  toast
} from "react-toastify";

const initialState = {
  users: [],
  user: null,
  total: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  reload: false,
  message: "",
};

// Create a new user
export const createUser = createAsyncThunk(
  "users/post",
  async (userData, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await userService.createUser(userData, token);
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

export const updateUser = createAsyncThunk(
  "users/put",
  async (userData, thunkAPI) => {
    try {
      const { _id, ...rest} = userData
      // const token = thunkAPI.getState().auth.user.accessToken;
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await userService.updateUser(_id, rest, token);
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

// Get all users
export const getUsers = createAsyncThunk(
  "users/getAll",
  async (params, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await userService.getUsers(token,params);
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

// Get all restore users
export const getRestoreUsers = createAsyncThunk(
  "users/getAllRestore",
  async (params, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await userService.getRestoreUsers(token,params);
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

// Get user by id
export const getUserById = createAsyncThunk(
  "users/getById",
  async (id, thunkAPI) => {
    console.log("vo day")
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await userService.getUserById(token,id);
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

// Track user
export const trackUser = createAsyncThunk(
  "users/track",
  async (id, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await userService.trackUser(token ,id);
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

export const removeUser = createAsyncThunk(
  "users/remove",
  async (id, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await userService.removeUser(id, token);
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.users= [];
      state.total= 0;
      state.isError= false;
      state.isSuccess= false;
      state.user = null;
      state.isLoading= false;
      state.message= "";
      state.reload = !state.reload
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users.unshift(action.payload);
        toast.success("Th??m s???n ph???m th??nh c??ng!");
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(state.message);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users.unshift(action.payload);
        toast.success("C???p nh???t s???n ph???m th??nh c??ng!");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(state.message);
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.users = action.payload.role_user;
        state.total = action.payload.count.length  > 0 ? action.payload.count[0].totalCount : 1 ;
        state.isLoading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRestoreUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRestoreUsers.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.users = action.payload.user;
        state.total = action.payload.total;
        state.isLoading = false;
      })
      .addCase(getRestoreUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserById.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.user = action.payload;
        // state.isLoading = false;
      })
      .addCase(getUserById.rejected, (state, action) => {
        // state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(trackUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(trackUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // toast.success("Xo?? t???m th???i s???n ph???m th??nh c??ng!");
        state.users = state.users.filter(
          (user) => user._id !== action.payload.id
        );
      })
      .addCase(trackUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Xo?? v??nh vi???n s???n ph???m th??nh c??ng!");
        // state.users = state.users.filter(
        //   (user) => user._id !== action.payload.id
        // );
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
