import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const savePostThunk = createAsyncThunk(
  "savePostThunk",
  async (savePostData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const savedPostData = await axios.put(
        `http://localhost:8080/app/saved`,
        savePostData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return savedPostData.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const deletePostThunk = createAsyncThunk(
  "deletePostThunk",
  async ({ postId }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const savedPostData = await axios.delete(
        `http://localhost:8080/app/saved?postId=${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return savedPostData.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const getSavedPostThunk = createAsyncThunk(
  "getSavedPostThunk",
  async ({ page }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const allSavedPostsOfToken = await axios.get(
        `http://localhost:8080/app/getsaved?page=${page}&size=3`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return allSavedPostsOfToken.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const getSavedPostPage = createAsyncThunk(
  "getSavedPostPage",
  async ({ page }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const allSavedPostsOfToken = await axios.get(
        `http://localhost:8080/app/getsaved?page=${page}&size=8`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return allSavedPostsOfToken.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const SavedLikePostData = createAsyncThunk(
  "likePostData",
  async (likedPostId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const likeSuccessData = await axios.put(
        `http://localhost:8080/app/liked`,
        likedPostId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return likeSuccessData.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const getAllSavedPosts = createAsyncThunk(
  "getAllSavedPosts",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const allSavedValues = await axios.get(
        `http://localhost:8080/app/saved`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return allSavedValues.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
const SavedPostSlice = createSlice({
  name: "savedPost",
  initialState: {
    isLoading: false,
    data: [],
    saved: [],
    savedMain: [],
    isFetched: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getSavedPostThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSavedPostThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;

      state.saved = [...state.saved, ...action.payload];
    });
    builder.addCase(getSavedPostThunk.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(getSavedPostPage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSavedPostPage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      state.data = [...action.payload, ...state.data];
      state.savedMain = [...action.payload, ...state.savedMain];
    });
    builder.addCase(getSavedPostPage.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(savePostThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(savePostThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      state.data = [action.payload, ...state.data];
      state.saved = [action.payload, ...state.saved];
      state.savedMain = [action.payload, ...state.savedMain];
      toast.success("Saved Post Successfully! ", {
        position: "top-right",
      });
    });
    builder.addCase(savePostThunk.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(deletePostThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePostThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      state.data = state.data.filter(
        (item) => item?.post?.id != action.payload?.post?.id
      );
      state.saved = state.saved.filter(
        (item) => item?.post?.id != action.payload?.post?.id
      );
      state.savedMain = state.savedMain.filter(
        (item) => item?.post?.id != action.payload?.post?.id
      );
      toast.success("Removed Post Successfully! ", {
        position: "top-right",
      });
    });
    builder.addCase(deletePostThunk.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(getAllSavedPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllSavedPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      state.data = [...action.payload];
    });
    builder.addCase(getAllSavedPosts.rejected, (state) => {
      state.isError = true;
      state.isFetched = false;
    });
    builder.addCase(SavedLikePostData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(SavedLikePostData.fulfilled, (state, action) => {
      state.isFetched = true;
      state.isLoading = false;
      state.data = state.data.map((item) => {
        if (item?.post?.id === action?.payload?.id) {
          return {
            ...item,
            post: action.payload,
          };
        } else {
          return item;
        }
      });
    });
    builder.addCase(SavedLikePostData.rejected, (state) => {
      state.isLoading = true;
      state.isFetched = false;
    });
  },
});
export default SavedPostSlice;
