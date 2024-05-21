import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const loginUser = createAsyncThunk(
  "loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const userData = await axios.post(
        `http://localhost:8080/auth/login`,
        formData
      );
      return userData.data;
    } catch (error) {
      // (error);
      rejectWithValue(error);
    }
  }
);
const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    fetched: false,
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetched = true;
      state.data = action.payload;
      if (action.payload.message == "Login Success") {
        toast.success(action.payload.message, {
          position: "top-right",
        });
        localStorage.setItem("token", action.payload.token);
      } else {
        toast.error(action.payload.message, {
          position: "top-right",
        });
      }
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isError = true;
    });
  },
});
export default loginSlice;
