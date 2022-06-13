import { collection, doc, onSnapshot } from "firebase/firestore";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { ChatModel } from "../models/ChatModel";
import { roomConverter, RoomModel } from "../models/RoomModel";
import { setRoom } from "../reducers/roomSlice";
import { useAppDispatch } from "../store";
import { firebase } from "../utils/constants";
import useRoutes from "./routesHook";

const useRoomListener = () => {
  const _dispatch = useAppDispatch();
  const _goToRoomsView = useRoutes().goToRoomsView;
  const _param = useParams();

  /**Realtime room listener */
  const _roomListener = useCallback(() => {
    const roomRef = doc(
      collection(db, firebase.collections.ROOMS),
      _param.roomID
    ).withConverter(roomConverter);
    onSnapshot(roomRef, (doc) => {
      if (doc.exists()) {
        const room: RoomModel = {
          id: doc.data()?.id as string,
          admin: doc.data()?.admin as string,
          chat: doc.data()?.chat as ChatModel[],
          desc: doc.data()?.desc as string,
          name: doc.data()?.name as string,
          users: doc.data()?.users as string[],
        };
        _dispatch(setRoom(room));
      } else {
        _goToRoomsView();
      }
    });
  }, [_dispatch, _goToRoomsView, _param]);

  useEffect(() => {
    if (_param.roomID) {
      _roomListener();
    }
  }, [_roomListener, _param]);
};

export default useRoomListener;
