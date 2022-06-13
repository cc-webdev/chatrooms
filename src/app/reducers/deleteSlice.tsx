import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const deleteSlice = createSlice({
  name: "delete",
  initialState: false,
  reducers: {
    setDelete: (state, action: PayloadAction<boolean>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setDelete } = deleteSlice.actions;

export default deleteSlice.reducer;
