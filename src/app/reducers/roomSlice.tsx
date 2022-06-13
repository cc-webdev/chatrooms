import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultRoom, RoomModel } from "../models/RoomModel";

const roomSlice = createSlice({
  name: "room",
  initialState: defaultRoom,
  reducers: {
    setRoom: (state, action: PayloadAction<RoomModel>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setRoom } = roomSlice.actions;

export default roomSlice.reducer;
