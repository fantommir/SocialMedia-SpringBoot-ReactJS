import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsers = createAsyncThunk(
  "fetchAllUsers",
  async (currentPage, { rejectWithValue }) => {
    try {
      let pageData = await axios.get(
        `http://localhost:8080/allUsers?page=${currentPage}&size=5`
      );
      return pageData.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const searchedUsers = createAsyncThunk(
  "searchedUsers",
  async (inputValue, { rejectWithValue }) => {
    try {
      const searchedData = await axios.get(
        `http://localhost:8080/searchedUsers?searchUserName=${inputValue}`
      );
      return searchedData.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
const getAllUsersSlice = createSlice({
  name: "getAllUsers",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    // searchedUsers:null,
    fetched: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetched = true;
      state.data = action.payload;
    });
    builder.addCase(fetchAllUsers.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(searchedUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchedUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetched = true;
      state.data = action.payload;
    });
    builder.addCase(searchedUsers.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
export default getAllUsersSlice;
