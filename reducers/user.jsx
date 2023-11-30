import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { email: "", pics: [] },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addEmail: (state, action) => {
      state.value.email = action.payload;
    },
    addPics: (state, action) => {
      state.value.pics.push(action.payload);
    },
    removePic: (state, action) => {
      state.value.pics = state.value.pics.filter(
        (pic) => pic !== action.payload
      );
    },
  },
});

export const { addEmail, addPics, removePic } = userSlice.actions;
export default userSlice.reducer;
