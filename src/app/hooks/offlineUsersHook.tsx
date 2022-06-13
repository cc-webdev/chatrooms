import { ref, onValue } from "firebase/database";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useCallback, useEffect } from "react";
import { db, rtdb } from "../firebase/firebase";
import { roomConverter } from "../models/RoomModel";
import { userConverter } from "../models/UserModel";
import { setOfflineUsers } from "../reducers/offlineSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { firebase } from "../utils/constants";
import useUser from "./userHook";

const useOfflineUsers = () => {
  const _dispatch = useAppDispatch();
  const _offlineUsers = useAppSelector((state) => state.offline);
  const _signOutUser = useUser().signOutUser;

  /**Offline user listener */
  const _handleOfflineUsers = useCallback(async () => {
    const appUsersQuery = query(
      collection(db, firebase.collections.USERS)
    ).withConverter(userConverter);
    const onlineUsersRef = ref(rtdb, firebase.collections.USERS);
    onValue(onlineUsersRef, async (snap) => {
      //App users
      const appUsers: string[] = [];
      const appUsersSnap = await getDocs(appUsersQuery);
      appUsersSnap.forEach((user) => {
        if (user.exists()) {
          appUsers.push(user.data().nickname);
        }
      });
      //Online users
      const onlineUsers: string[] = [];
      snap.forEach((user) => {
        onlineUsers.push(user.val().nickname);
      });
      let offlineUsers = appUsers.filter((user) => !onlineUsers.includes(user));
      //Offline users
      _dispatch(setOfflineUsers(offlineUsers));
    });
  }, [_dispatch]);

  /**Offline users listener if in room yet*/
  const _offlineUsersListener = useCallback(async () => {
    _offlineUsers.forEach(async (user) => {
      const queryRooms = query(
        collection(db, firebase.collections.ROOMS),
        where("users", "array-contains", user)
      ).withConverter(roomConverter);
      const roomSnap = await getDocs(queryRooms);
      roomSnap.forEach((room) => {
        if (room.exists()) {
          let users = room.data().users;
          users = users.filter((offlineUser) => offlineUser !== user);
          if (!users.length) {
            deleteDoc(room.ref);
          } else {
            updateDoc(room.ref, {
              users: users,
            });
          }
        }
      });
    });
  }, [_offlineUsers]);

  /**Check users status */
  useEffect(() => {
    _handleOfflineUsers();
  }, [_handleOfflineUsers, _signOutUser]);

  /**Offline users listener */
  useEffect(() => {
    _offlineUsersListener();
  }, [_offlineUsersListener]);
};

export default useOfflineUsers;
