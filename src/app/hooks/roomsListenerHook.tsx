import { collection, onSnapshot } from "firebase/firestore";
import { useCallback, useEffect } from "react";
import { db } from "../firebase/firebase";
import { roomConverter, RoomModel } from "../models/RoomModel";
import { setRooms } from "../reducers/roomsSlice";
import { useAppDispatch } from "../store";
import { firebase } from "../utils/constants";

const useRoomsListener = () => {
  const _dispatch = useAppDispatch();

  /**Realtime rooms listener */
  const _roomsListener = useCallback(() => {
    const docRef = collection(db, firebase.collections.ROOMS).withConverter(
      roomConverter
    );
    onSnapshot(docRef, (snap) => {
      const rooms: RoomModel[] = [];
      snap.forEach((doc) => {
        const room: RoomModel = {
          id: doc.data().id,
          admin: doc.data().admin,
          chat: doc.data().chat,
          desc: doc.data().desc,
          name: doc.data().name,
          users: doc.data().users,
        };
        rooms.push(room);
      });
      _dispatch(setRooms(rooms as RoomModel[]));
    });
  }, [_dispatch]);

  useEffect(() => {
    _roomsListener();
  }, [_roomsListener]);
};

export default useRoomsListener;
