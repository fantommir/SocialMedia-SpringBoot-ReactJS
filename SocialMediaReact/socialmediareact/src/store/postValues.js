import { createSlice } from "@reduxjs/toolkit";

const postValuesSlice = createSlice({
  name: "postValue",
  initialState: {
    data: null,
  },
  reducers: {
    updatePostValue: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const postValuesSliceActions = postValuesSlice.actions;
export default postValuesSlice;
