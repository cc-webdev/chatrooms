import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AlertModel, defaultAlert } from "../models/AlertModel";

const alertSlice = createSlice({
  name: "alert",
  initialState: defaultAlert,
  reducers: {
    setAlert: (state, action: PayloadAction<AlertModel>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setAlert } = alertSlice.actions;

export default alertSlice.reducer;
