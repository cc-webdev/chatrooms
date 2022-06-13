import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { defaultRooms, RoomModel } from "../models/RoomModel";

const roomsSlice = createSlice({
  name: "rooms",
  initialState: defaultRooms,
  reducers: {
    setRooms: (state, action: PayloadAction<RoomModel[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setRooms } = roomsSlice.actions;

export default roomsSlice.reducer;
