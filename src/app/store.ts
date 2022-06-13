import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

import alertSlice from "./reducers/alertSlice";
import deleteSlice from "./reducers/deleteSlice";
import offlineSlice from "./reducers/offlineSlice";
import roomSlice from "./reducers/roomSlice";
import roomsSlice from "./reducers/roomsSlice";
import userSlice from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    alert: alertSlice,
    delete: deleteSlice,
    offline: offlineSlice,
    room: roomSlice,
    rooms: roomsSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
