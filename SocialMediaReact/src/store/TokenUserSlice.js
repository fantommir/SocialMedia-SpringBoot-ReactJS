import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getCurrentUser = createAsyncThunk(
  "getCurrentUser",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const user = await axios.get(`http://localhost:8080/app/tokenUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return user.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const tokenUserPostCount = createAsyncThunk(
  "tokenUserPostCount",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const postCount = await axios.get(
        `http://localhost:8080/app/postscount`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return postCount.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const tokenUserProfileUpdate = createAsyncThunk(
  "tokenUserProfileUpdate",
  async (fileData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const updatedUserProfile = await axios.put(
        `http://localhost:8080/app/allUsers/update`,
        fileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return updatedUserProfile.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const tokenUserBackgroundUpdate = createAsyncThunk(
  "tokenUserBackgroundUpdate",
  async (fileData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const updatedUserBackground = await axios.put(
        `http://localhost:8080/app/allUsers/update`,
        fileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return updatedUserBackground.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const followUser = createAsyncThunk(
  "followUser",
  async (userId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const followUserData = await axios.put(
        `http://localhost:8080/app/allUsers/follow?userId=${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return followUserData.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const tokenUserEditProfile = createAsyncThunk(
  "tokenUserEditProfile",
  async (editProfileData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const updatedUserBackground = await axios.put(
        `http://localhost:8080/app/users/edit`,
        editProfileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return updatedUserBackground.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
const TokenUserSlice = createSlice({
  name: "tokenUser",
  initialState: {
    isLoading: false,
    data: null,
    posts: null,
    isFetched: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      state.data = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(tokenUserPostCount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(tokenUserPostCount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      state.posts = action.payload;
    });
    builder.addCase(tokenUserPostCount.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(tokenUserProfileUpdate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(tokenUserProfileUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      state.data = { ...action.payload };
    });
    builder.addCase(tokenUserProfileUpdate.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(tokenUserBackgroundUpdate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(tokenUserBackgroundUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      state.data = { ...action.payload };
    });
    builder.addCase(tokenUserBackgroundUpdate.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(tokenUserEditProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(tokenUserEditProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      state.data = { ...action.payload };
    });
    builder.addCase(tokenUserEditProfile.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(followUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(followUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      if (state.data.followings.length > action.payload.followings.length) {
        toast.success("successfully unfollowed", {
          position: "top-right",
        });
      } else {
        toast.success("successfully added to friendList ", {
          position: "top-right",
        });
      }
      state.data = { ...action.payload };
    });
    builder.addCase(followUser.rejected, (state) => {
      state.isError = true;
    });
  },
});
export default TokenUserSlice;
