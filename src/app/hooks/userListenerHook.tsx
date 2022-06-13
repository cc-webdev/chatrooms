import { onSnapshot } from "firebase/firestore";
import { useCallback, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { userConverter, UserModel } from "../models/UserModel";
import { setUser } from "../reducers/userSlice";
import { useAppDispatch } from "../store";
import useFirebase from "./firebaseHook";

const useUserListener = () => {
  const _dispatch = useAppDispatch();
  const _searchUserByNickname = useFirebase().searchUserByNickname;

  /**Realtime user listener */
  const _userListener = useCallback(async () => {
    const nickname = auth.currentUser?.displayName as string;
    const docSnap = await _searchUserByNickname(nickname);
    if (docSnap?.length) {
      const docRef = docSnap[0].ref.withConverter(userConverter);
      onSnapshot(docRef, (doc) => {
        _dispatch(setUser(doc.data() as UserModel));
      });
    }
  }, [_dispatch, _searchUserByNickname]);

  useEffect(() => {
    _userListener();
  }, [_userListener]);
};

export default useUserListener;
