import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";

import { auth, db } from "../firebase/firebase";
import { ChatModel } from "../models/ChatModel";
import { roomConverter, RoomModel } from "../models/RoomModel";
import { firebase, strings } from "../utils/constants";
import useError from "./errorHook";
import useFirebase from "./firebaseHook";
import useRoutes from "./routesHook";

const useRoom = () => {
  const [roomId, setRoomId] = useState<string>("");
  const _error = useError().handleError;
  const _firebase = useFirebase();
  const _goToRoomView = useRoutes().goToRoomView;
  const _goToRoomsView = useRoutes().goToRoomsView;

  /**Add chat object to firestore db */
  const addChat = async (roomID: string, obj: ChatModel) => {
    const docRef = doc(db, firebase.collections.ROOMS, roomID).withConverter(
      roomConverter
    );
    const chatSnap = await getDoc(docRef);
    if (chatSnap.exists()) {
      const chat = chatSnap.data().chat;
      chat.push(obj);
      updateDoc(docRef, {
        chat: chat,
      });
    }
  };

  /**Add user to room */
  const _addUser = async (roomID: string, user: string) => {
    const roomRef = doc(
      collection(db, firebase.collections.ROOMS),
      roomID
    ).withConverter(roomConverter);
    const roomSnap = await getDoc(roomRef);
    if (roomSnap.exists()) {
      const users = roomSnap.data()?.users;
      users?.push(user);
      updateDoc(roomRef, {
        users: users,
      }).then(() => {
        return _goToRoomView(roomID);
      });
    }
  };

  /**Add room in firestore db */
  const createRoom = async (name: string, desc: string) => {
    const user = auth.currentUser?.displayName as string;
    const queryUser = await _firebase.searchUserByNickname(user);
    if (queryUser.length) {
      const queryAdmin = await _firebase.searchRoomByAdmin(queryUser[0].ref);
      if (queryAdmin.length) {
        _error(strings.ADMIN_ERROR);
      } else {
        const room: RoomModel = {
          id: "",
          admin: user,
          chat: [],
          desc: desc,
          name: name,
          users: [],
          adminRef: queryUser[0].ref,
        };
        addDoc(collection(db, firebase.collections.ROOMS), room).then(
          async (doc) => {
            await updateDoc(doc, {
              id: doc.id,
            });
            return enterRoom(doc.id);
          }
        );
      }
    }
  };

  /**Remove room from firestore db */
  const deleteRoom = async (roomId: string) => {
    const roomRef = doc(db, firebase.collections.ROOMS, roomId);
    deleteDoc(roomRef).then(() => {
      return _goToRoomsView();
    });
  };

  const enterRoom = async (roomID: string) => {
    const nickname = auth.currentUser?.displayName as string;
    /**Check if user is already in a room */
    const queryRoom = await _firebase.searchRoomByUserIn(nickname);
    if (queryRoom?.length) {
      const roomIn = queryRoom[0].id;
      if (roomIn === roomID) {
        _goToRoomView(roomID);
      } else {
        exitRoom(roomIn).then(async () => {
          return _addUser(roomID, nickname);
        });
      }
    } else {
      _addUser(roomID, nickname);
    }
  };

  const exitRoom = async (roomID: string) => {
    const roomRef = doc(
      collection(db, firebase.collections.ROOMS),
      roomID
    ).withConverter(roomConverter);
    const roomSnap = await getDoc(roomRef);
    if (roomSnap.exists()) {
      const users = roomSnap.data()?.users;
      const user = users?.indexOf(
        auth.currentUser?.displayName as string
      ) as number;
      users?.splice(user, 1);
      updateDoc(roomRef, {
        users: users,
      }).then(() => {
        return _goToRoomsView();
      });
      if (!users.length) {
        deleteRoom(roomID);
      }
    }
  };

  /**Filter room by id */
  const getRoom = (rooms: RoomModel[], id: string) => {
    const result = rooms.filter((room) => room.id === id);
    return result[0];
  };

  /**Update room data */
  const updateRoom = async (id: string, name: string, desc: string) => {
    const roomRef = doc(
      collection(db, firebase.collections.ROOMS),
      id
    ).withConverter(roomConverter);
    const roomSnap = await getDoc(roomRef);
    if (roomSnap.exists()) {
      updateDoc(roomRef, {
        name: name,
        desc: desc,
      }).then(() => {
        return setRoomId("");
      });
    }
  };

  return {
    addChat,
    createRoom,
    getRoom,
    deleteRoom,
    enterRoom,
    exitRoom,
    roomId,
    setRoomId,
    updateRoom,
  };
};

export default useRoom;
