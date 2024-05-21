import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getAllUserStory = createAsyncThunk(
  "getAllUserStory",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const storiesData = await axios.get(
        `http://localhost:8080/app/allStory`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return storiesData.data;
    } catch (error) {
      // rejectWithValue(error);
    }
  }
);
const getAllUserStoriesSlice = createSlice({
  name: "UsersStories",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    isFetched: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUserStory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUserStory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      state.data = action.payload;
    });
    builder.addCase(getAllUserStory.rejected, (state) => {
      state.isError = true;
      state.isFetched = false;
    });
  },
});
export default getAllUserStoriesSlice;
