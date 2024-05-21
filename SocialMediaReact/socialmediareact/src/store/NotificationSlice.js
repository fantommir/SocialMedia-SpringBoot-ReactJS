import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchNotifications = createAsyncThunk(
  "fetchNotifications",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const allnotifi = await axios.get(
        `http://localhost:8080/app/notification`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return allnotifi.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
const NotificationSlice = createSlice({
  name: "notification",
  initialState: {
    isLoading: false,
    data: [],
    allPosts: [],
    isFetched: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      state.data = [...state.data, ...action.payload];
    });
    builder.addCase(fetchNotifications.rejected, (state) => {
      state.isLoading = true;
    });
  },
});
export default NotificationSlice;
