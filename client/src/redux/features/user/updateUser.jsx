import { createSlice } from "@reduxjs/toolkit";

export const updateUserSlice = createSlice({
  name: "userUpdate",
  initialState: {
    updatedUser: null,
  },
  reducers: {
    updateUser: (state, action) => {
      state.updatedUser = action.payload.user;
    },
  },
});

export const { updateUser } = updateUserSlice.actions;
export default updateUserSlice.reducer;
