import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getAllFollowersObjects = createAsyncThunk(
  "getAllFollowersObjects",
  async ({ page }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const followersData = await axios.get(
        `http://localhost:8080/app/getfollowers?page=${page}&size=9`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return followersData.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
const followerSlice = createSlice({
  name: "followers",
  initialState: {
    isLoading: false,
    data: [],
    isFetched: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllFollowersObjects.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllFollowersObjects.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      if (action.payload != undefined) {
        state.data = [...state.data, ...action.payload];
      }
    });
    builder.addCase(getAllFollowersObjects.rejected, (state) => {
      state.isError = true;
      state.isFetched = false;
    });
  },
});
export default followerSlice;
