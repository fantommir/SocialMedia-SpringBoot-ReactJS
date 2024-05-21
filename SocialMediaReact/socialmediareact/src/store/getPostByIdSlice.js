import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getPostByIdThunk = createAsyncThunk(
  "getPostByIdThunk",
  async ({ postId }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const postData = await axios.get(
        `http://localhost:8080/app/getpost?postId=${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return postData.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
const getPostByIdSlice = createSlice({
  name: "postById",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getPostByIdThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPostByIdThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getPostByIdThunk.rejected, (state) => {
      state.isError = true;
    });
  },
});
export default getPostByIdSlice;

// export const sendMessageToMultipleUsers = createAsyncThunk(
//   "sendMessageToMultipleUsers",
//   async ({ postId, checkedUser }, { rejectWithValue }) => {
//     const token = localStorage.getItem("token");
//     try {
//       const updatedValues = await axios.post(
//         `http://localhost:8080/app/sendposttousers`,
//         {
//           postId: postId,
//           checkedUser: checkedUser,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return updatedValues.data;
//     } catch (error) {
//       rejectWithValue(error);
//     }
//   }
// );