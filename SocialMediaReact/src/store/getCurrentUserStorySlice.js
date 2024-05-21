import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const getCurrentUserStory = createAsyncThunk(
  "getCurrentUserStory",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const currentStory = await axios.get(
        `http://localhost:8080/app/currentStory`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return currentStory.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const postUserStory = createAsyncThunk(
  "postUserStory",
  async (storyInput, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const storiesData = await axios.post(
        `http://localhost:8080/app/allStory`,
        storyInput,
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
export const updateStoryCurrent = createAsyncThunk(
  "updateStoryCurrent",
  async (storyData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const currentStory = await axios.put(
        `http://localhost:8080/app/currentStory`,
        storyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return currentStory.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const deleteStoryCurrent = createAsyncThunk(
  "deleteStoryCurrent",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const currentStory = await axios.delete(
        `http://localhost:8080/app/currentStory`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return currentStory.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
const getCurrentUserStorySlice = createSlice({
  name: "currentUserStory",
  initialState: {
    isLoading: false,
    currentStory: [],
    isError: false,
    isFetched: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUserStory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrentUserStory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      state.currentStory = action.payload;
    });
    builder.addCase(getCurrentUserStory.rejected, (state) => {
      state.isError = true;
      state.isFetched = false;
    });
    builder.addCase(postUserStory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postUserStory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      state.currentStory = action.payload;
      if (action.payload != null) {
        toast.success("Story Uploaded Successfully! ", {
          position: "top-right",
        });
      } else {
        toast.error("Failed to Upload Story! ", {
          position: "top-right",
        });
      }
    });
    builder.addCase(postUserStory.rejected, (state) => {
      state.isError = true;
      state.isFetched = false;
    });
    builder.addCase(updateStoryCurrent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateStoryCurrent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      state.currentStory = action.payload;
      if (action.payload) {
        toast.success("Story Updated Successfully!", {
          position: "top-right",
        });
      } else {
        toast.error("Failed to Update Story! ", {
          position: "top-right",
        });
      }
    });
    builder.addCase(updateStoryCurrent.rejected, (state) => {
      state.isError = true;
      state.isFetched = false;
    });
    builder.addCase(deleteStoryCurrent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteStoryCurrent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      state.currentStory = action.payload;
      if (action.payload) {
        toast.success("Story deleted Successfully!", {
          position: "top-right",
        });
      } else {
        toast.error("Failed to delete Story! ", {
          position: "top-right",
        });
      }
    });
    builder.addCase(deleteStoryCurrent.rejected, (state) => {
      state.isError = true;
      state.isFetched = false;
    });
  },
});
export default getCurrentUserStorySlice;
