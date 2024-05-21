import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
let userId;
let pageValue;
let tokenUser;
export const sendMessage = createAsyncThunk(
  "sendMessage",
  async (messageData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const messageRecieved = await axios.post(
        `http://localhost:8080/app/sendmessage`,
        messageData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return messageRecieved.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const getAllSendMessages = createAsyncThunk(
  "getAllSendMessages",
  async ({ receiverId, page, tokenUserId }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    userId = receiverId;
    tokenUser = tokenUserId;
    pageValue = page;
    try {
      const allSentMessages = await axios.get(
        `http://localhost:8080/app/getsendermessage?receiverId=${receiverId}&page=${page}&size=7`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let lastIndex = allSentMessages.data.lastIndexOf("s");
      return !allSentMessages.data.includes("There is no Messages")
        ? [allSentMessages.data, userId, pageValue, tokenUserId]
        : [allSentMessages.data, userId, true];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const sendMessageToMultipleUsers = createAsyncThunk(
  "sendMessageToMultipleUsers",
  async ({ postId, checkedUser }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const updatedValues = await axios.post(
        `http://localhost:8080/app/sendposttousers`,
        {
          postId: postId,
          checkedUser: checkedUser,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return updatedValues.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
const MessageSlice = createSlice({
  name: "messages",
  initialState: {
    isLoading: false,
    data: [],
    rdata: [],
    userId: null,
    page: null,
    messagesSize: null,
    sentMessage: [],
    isFetched: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllSendMessages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllSendMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      let newVal;
      let newValSender;
      let newValReceiver;
      let lastIndex = action.payload[0].lastIndexOf("s");
      let ans = action.payload[0][lastIndex + 1];
      if (
        !action.payload[0].includes("There is no Messages") &&
        state.userId != userId
      ) {
        state.userId = userId;
        newVal = action.payload[0].filter(
          (item) => item?.tokenUserId?.id != userId
        );
        state.data = newVal;
      } else if (
        action.payload[0].includes("There is no Messages") &&
        action.payload[2] != true
      ) {
        state.page = 0;
        state.data = [...state.data];
      } else if (action.payload[2] == true && ans == "0") {
        state.data = [];
      } else if (
        !action.payload[0].includes("There is no Messages") &&
        pageValue != 0
      ) {
        newValSender = action.payload[0].filter(
          (item) => item?.receiveUser?.id == state.userId
        );
        newValReceiver = action.payload[0].filter(
          (item) => item?.receiveUser?.id == tokenUser
        );
        state.data = [...state.data, ...newValSender, ...newValReceiver];
      } else if (
        action.payload[0].length > 0 &&
        Array.isArray(action.payload[0])
      ) {
        state.data = [...state.data, ...action.payload[0]];
      }
    });
    builder.addCase(getAllSendMessages.rejected, (state) => {
      state.isError = true;
      state.isFetched = false;
    });
    builder.addCase(sendMessage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      if (action.payload != undefined) {
        state.data = [...state.data, action.payload];
        state.messagesSize += 1;
      } else {
        state.data = [...state.data];
      }
    });
    builder.addCase(sendMessage.rejected, (state) => {
      state.isError = true;
      state.isFetched = false;
    });
    builder.addCase(sendMessageToMultipleUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendMessageToMultipleUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isFetched = true;
      state.sentMessage = action.payload;
      if (action.payload) {
        toast.success("shared post successfully!", {
          position: "top-right",
        });
      }
    });
    builder.addCase(sendMessageToMultipleUsers.rejected, (state) => {
      state.isError = true;
      state.isFetched = false;
    });
  },
});
export default MessageSlice;
