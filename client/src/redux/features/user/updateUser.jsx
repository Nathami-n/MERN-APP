import { createSlice } from "@reduxjs/toolkit";

export const updateUserSlice = createSlice({
  name: "userUpdate",
  initialState: {
    currentUser: null,
  },
  reducers: {
    updateUser: (state, action) => {
      state.currentUser = action.payload.user;
    },
  },
});

export const { updateUser } = updateUserSlice.actions;
export default updateUserSlice.reducer;
