import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const offlineSlice = createSlice({
  name: "offline",
  initialState: [""],
  reducers: {
    setOfflineUsers: (state, actions: PayloadAction<string[]>) => {
      state = actions.payload;
      return state;
    },
  },
});

export const { setOfflineUsers } = offlineSlice.actions;

export default offlineSlice.reducer;
