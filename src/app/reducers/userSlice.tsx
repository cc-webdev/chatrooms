import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { defaultUser, UserModel } from "../models/UserModel";

const userSlice = createSlice({
  name: "user",
  initialState: defaultUser,
  reducers: {
    setUser: (state, action: PayloadAction<UserModel>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
