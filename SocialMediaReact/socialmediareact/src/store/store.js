import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./registerSlice";
import loginSlice from "./loginSlice";
import postUploadSlice from "./postUploadSlice";
import getAllUsersSlice from "./getAllUsersSlice";
import getAllUserStoriesSlice from "./getAllUserStoriesSlice";
import getCurrentUserStorySlice from "./getCurrentUserStorySlice";
import postCommentSlice from "./PostCommentSlice";
import TokenUserSlice from "./TokenUserSlice";
import SavedPostSlice from "./SavedPostSlice";
import NotificationSlice from "./NotificationSlice";
import MessageSlice from "./MessageSlice";
import followerSlice from "./followersSlice";
import getPostByIdSlice from "./getPostByIdSlice";
import postValuesSlice from "./postValues";
const store = configureStore({
  reducer: {
    register: registerSlice.reducer,
    login: loginSlice.reducer,
    postUpload: postUploadSlice.reducer,
    getAllUsers: getAllUsersSlice.reducer,
    UsersStories: getAllUserStoriesSlice.reducer,
    currentUserStory: getCurrentUserStorySlice.reducer,
    postComment: postCommentSlice.reducer,
    tokenUser: TokenUserSlice.reducer,
    savedPost: SavedPostSlice.reducer,
    notification: NotificationSlice.reducer,
    messages: MessageSlice.reducer,
    followers: followerSlice.reducer,
    postById: getPostByIdSlice.reducer,
    postValue:postValuesSlice.reducer
  },
});
export default store;
