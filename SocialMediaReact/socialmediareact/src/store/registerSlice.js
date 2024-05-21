import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const registerUser = createAsyncThunk(
  "registerUser",
  async (formValues, { rejectWithValue }) => {
    try {
      const userData = await axios.post(
        `http://localhost:8080/auth/allUsers`,
        formValues,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return userData.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      if (action.payload.message == "Register Success") {
        toast.success(action.payload.message, {
          position: "top-right",
        });
      }
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isError = true;
    });
  },
});
export default registerSlice;
