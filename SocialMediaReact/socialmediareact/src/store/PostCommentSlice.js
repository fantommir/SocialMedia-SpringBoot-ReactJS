import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
let val;
export const getComments = createAsyncThunk(
  "getComments",
  async ({ postId, page }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    val = postId;
    try {
      const commentFetch = await axios.get(
        `http://localhost:8080/app/comments?postId=${postId}&page=${page}&size=12`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return commentFetch.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const sendComment = createAsyncThunk(
  "sendComment",
  async ({ commentData }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const commentFetch = await axios.post(
        `http://localhost:8080/app/comments`,
        {
          postId: val,
          commentText: commentData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return commentFetch.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const postCommentSlice = createSlice({
  name: "postComment",
  initialState: {
    isLoading: false,
    data: [],
    postValueId: null,
    isError: false,
    isFetched: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      state.postValueId = val;
      let newDbValues = [...state.data, ...action.payload];
      let newValues = newDbValues?.filter(
        (item) => item?.post?.id == state.postValueId
      );
      state.data = [...newValues];
    });
    builder.addCase(getComments.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(sendComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      state.data = [action.payload, ...state.data];
      if (action.payload) {
        toast.success("Comment sent Successfully", {
          position: "top-right",
        });
      } else {
        toast.error("Failed to Sent Comment ", {
          position: "top-right",
        });
      }
    });
    builder.addCase(sendComment.rejected, (state) => {
      state.isError = true;
    });
  },
});
export default postCommentSlice;
