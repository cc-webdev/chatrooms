import {
  inMemoryPersistence,
  onAuthStateChanged,
  setPersistence,
} from "firebase/auth";
import { onDisconnect, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { auth, rtdb } from "../firebase/firebase";
import { defaultUser } from "../models/UserModel";
import { setUser } from "../reducers/userSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { firebase } from "../utils/constants";
import useAlert from "./alertHook";

const useAuth = () => {
  const [isAuth, setAuth] = useState<boolean>(false);
  const _alert = useAlert().showAlert;
  const _dispatch = useAppDispatch();
  const _user = useAppSelector((state) => state.user);

  /**Auth listener */
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPersistence(auth, inMemoryPersistence)
          .then(() => {
            return setAuth(true);
          })
          .catch((error) => error);
      } else {
        setAuth(false);
        /**Not really need because it will be overridden on new sign in*/
        _dispatch(setUser(defaultUser));
      }
    });
  }, [_alert, _dispatch]);

  /**Set user online */
  useEffect(() => {
    const usersRef = ref(rtdb, firebase.collections.USERS + "/" + _user.id);
    if (_user.id.length) {
      set(usersRef, {
        email: _user.email,
        nickname: _user.nickname,
      });
      onDisconnect(usersRef).remove();
    }
  }, [_user]);

  return { isAuth };
};

export default useAuth;
