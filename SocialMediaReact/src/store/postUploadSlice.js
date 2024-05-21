import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const postUploadData = createAsyncThunk(
  "postUploadData",
  async (formValues, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const postDataSuccess = await axios.post(
        `http://localhost:8080/app/posts`,
        formValues,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return postDataSuccess.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const allPostFetch = createAsyncThunk(
  "allPostFetch",
  async (currentPage, { rejectWithValue }) => {
    try {
      const postSuccessfetch = await axios.get(
        `http://localhost:8080/allPosts?page=${currentPage}&size=1`
      );
      return postSuccessfetch.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const likePostData = createAsyncThunk(
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
export const getAllPosts = createAsyncThunk(
  "getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const allnotifi = await axios.get(`http://localhost:8080/allpostsnoti`);
      return allnotifi.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
const postUploadSlice = createSlice({
  name: "postUpload",
  initialState: {
    isLoading: false,
    data: [],
    allPosts: [],
    isError: false,
    fetched: false,
  },
  extraReducers: (builder) => {
    builder.addCase(postUploadData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postUploadData.fulfilled, (state, action) => {
      state.fetched = true;
      state.isLoading = false;
      state.data = [...state.data, action.payload];
      state.allPosts = [...state.allPosts, action.payload];
      if (action.payload != null) {
        toast.success("Post Uploaded Successfully! ", {
          position: "top-right",
        });
      }
    });
    builder.addCase(postUploadData.rejected, (state) => {
      state.isLoading = true;
    });
    builder.addCase(allPostFetch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(allPostFetch.fulfilled, (state, action) => {
      state.fetched = true;
      state.isLoading = false;
      state.allPosts = [...state.allPosts, ...action.payload];
    });
    builder.addCase(allPostFetch.rejected, (state) => {
      state.isLoading = true;
      state.fetched = false;
    });
    builder.addCase(likePostData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(likePostData.fulfilled, (state, action) => {
      state.fetched = true;
      state.isLoading = false;
      let newLikePostValues = state?.data?.map((item) => {
        return item.id == action.payload.id ? action.payload : item;
      });
      let newLikePostValuesallPosts = state?.allPosts?.map((item) => {
        return item.id == action.payload.id ? action.payload : item;
      });
      state.data = [...newLikePostValues];
      state.allPosts = [...newLikePostValuesallPosts];
    });
    builder.addCase(likePostData.rejected, (state) => {
      state.isLoading = true;
      state.fetched = false;
    });
    builder.addCase(getAllPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.fetched = true;
      state.data = action.payload;
    });
    builder.addCase(getAllPosts.rejected, (state) => {
      state.isLoading = true;
      state.fetched = false;
    });
  },
});
export const postUploadSliceActions = postUploadSlice.actions;
export default postUploadSlice;
