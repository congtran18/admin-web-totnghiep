import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tutorService from "./tutorService";
import {
  toast
} from "react-toastify";

const initialState = {
  tutors: [],
  tutor: null,
  total: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  reload: false,
  message: "",
};


export const acceptTutor = createAsyncThunk(
  "tutors/put",
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.tutor.accessToken;
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await tutorService.acceptTutor(id, token);
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

// Get all tutors
export const getTutors = createAsyncThunk(
  "tutors/getAll",
  async (params, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await tutorService.getTutors(token,params);
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

// Get all restore tutors
export const getRegisterTutors = createAsyncThunk(
  "tutors/getAllRestore",
  async (params, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await tutorService.getRestoreTutors(token,params);
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

// Get tutor by id
export const getTutorById = createAsyncThunk(
  "tutors/getById",
  async (id, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await tutorService.getTutorById(token,id);
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

// Track tutor
export const trackTutor = createAsyncThunk(
  "tutors/track",
  async (id, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await tutorService.trackTutor(token ,id);
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

export const removeTutor = createAsyncThunk(
  "tutors/remove",
  async (id, thunkAPI) => {
    try {
      const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth).user.accessToken;
      return await tutorService.removeTutor(id, token);
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

const tutorSlice = createSlice({
  name: "tutor",
  initialState,
  reducers: {
    resetTutor: (state) => {
      state.tutors= [];
      state.total= 0;
      state.isError= false;
      state.isSuccess= false;
      state.tutor = null;
      state.isLoading= false;
      state.message= "";
      state.reload = !state.reload
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(acceptTutor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(acceptTutor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.tutors.unshift(action.payload);
        toast.success("Cập nhật trạng thái gia sư thành công!");
      })
      .addCase(acceptTutor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(getTutors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTutors.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.tutors = action.payload.tutor;
        state.total = action.payload.total ;
        state.isLoading = false;
      })
      .addCase(getTutors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRegisterTutors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRegisterTutors.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.tutors = action.payload.tutor;
        state.total = action.payload.total;
        state.isLoading = false;
      })
      .addCase(getRegisterTutors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTutorById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTutorById.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.tutor = action.payload;
        state.isLoading = false;
      })
      .addCase(getTutorById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(trackTutor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(trackTutor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // toast.success("Xoá tạm thời sản phẩm thành công!");
        state.tutors = state.tutors.filter(
          (tutor) => tutor._id !== action.payload.id
        );
      })
      .addCase(trackTutor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeTutor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeTutor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Xoá vĩnh viễn sản phẩm thành công!");
        // state.tutors = state.tutors.filter(
        //   (tutor) => tutor._id !== action.payload.id
        // );
      })
      .addCase(removeTutor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetTutor } = tutorSlice.actions;
export default tutorSlice.reducer;
