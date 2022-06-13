import {
  User,
  deleteUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  UserCredential,
  sendPasswordResetEmail,
} from "firebase/auth";
import { child, get, ref, remove, update } from "firebase/database";
import {
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  DocumentReference,
  setDoc,
} from "firebase/firestore";
import { useCallback } from "react";
import { db, auth, rtdb } from "../firebase/firebase";
import { defaultUser, UserModel } from "../models/UserModel";
import { setUser } from "../reducers/userSlice";
import { useAppDispatch } from "../store";
import { AlertTypes, firebase, strings } from "../utils/constants";
import useAlert from "./alertHook";
import useError from "./errorHook";
import useFirebase from "./firebaseHook";

const useUser = () => {
  const _alert = useAlert().showAlert;
  const _dispatch = useAppDispatch();
  const _error = useError().handleError;
  const _firebase = useFirebase();

  /**Get online user */
  const getOnlineUsers = async () => {
    const users: string[] = [];
    const usersRef = ref(rtdb, firebase.collections.USERS);
    if (usersRef) {
      await get(child(ref(rtdb), firebase.collections.USERS)).then((snap) => {
        if (snap.exists()) {
          snap.forEach((user) => {
            const val = Object.assign(user.val());
            users.push(val.email);
          });
        }
      });
    }
    return users;
  };

  /**Delete user account */
  const deleteAccount = async (userID: string) => {
    const user = auth.currentUser as User;
    const userName = user?.displayName as string;
    const QuerySnap = await _firebase.searchUserByNickname(userName);
    if (QuerySnap?.length) {
      const docRef = QuerySnap[0].ref;
      signOutUser(userID)
        .then(async () => {
          return deleteUser(user)
            .then(async () => {
              return deleteDoc(docRef);
            })
            .then(async () => {
              return _alert({
                type: AlertTypes.Success,
                message: strings.DELETE_ACCOUNT,
              });
            });
        })
        .catch((error) => _error(error));
    }
  };

  /**Reset user password */
  const resetPassword = (email: string) => {
    sendPasswordResetEmail(auth, email).catch((error) => {
      _error(error);
    });
  };

  /** Sign in user */
  const signInUser = async (email: string, password: string) => {
    const users = await getOnlineUsers();
    const isLogged = users.includes(email);
    if (isLogged) {
      return _error(strings.SIGN_IN_ERROR);
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        const userData: UserModel = {
          id: userCredential.user.uid,
          email: email,
          nickname: userCredential.user.displayName as string,
        };
        return _dispatch(setUser(userData));
      })
      .catch((error) => _error(error));
  };

  /**Sign out user */
  const signOutUser = useCallback(async (userID: string) => {
    await remove(ref(rtdb, firebase.collections.USERS + "/" + userID)).then(
      async () => {
        return await signOut(auth);
      }
    );
  }, []);

  /**SignUp User then update firestore db with user data */
  const signUpUser = async (
    email: string,
    password: string,
    nickname: string
  ) => {
    const querySnap = await _firebase.searchUserByNickname(nickname);
    let docId: string;
    let user: User;
    let userData: UserModel;
    /**Catch error if nickname already exist */
    if (querySnap?.length) {
      _error(strings.NICKNAME_ERROR);
    } else {
      await Promise.all([
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            userData = {
              id: userCredential.user.uid,
              email: email,
              nickname: nickname,
            };
            _dispatch(setUser(userData));
            return (user = userCredential.user);
          })
          .then(() => {
            return updateProfile(user, {
              displayName: nickname,
            });
          })
          .then(() => {
            docId = user.uid;
            return setDoc(doc(db, firebase.collections.USERS, user.uid), {
              id: user.uid,
              email: email,
              nickname: nickname,
            });
          }),
      ]).catch(async (error) => {
        _error(error);
        /**Undo */
        if (user) {
          await deleteUser(user);
          await signOutUser(user.uid);
        }
        if (docId?.length) {
          const docRef = doc(db, firebase.collections.USERS, docId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            await deleteDoc(docRef);
          }
        }
        _dispatch(setUser(defaultUser));
      });
    }
  };

  /**Update user nickname */
  const updateUserNickname = async (nickname: string) => {
    const queryNickname = await _firebase.searchUserByNickname(nickname);
    const user = auth.currentUser as User;
    /**Catch nickname already exist error */
    if (user?.displayName === nickname || queryNickname?.length) {
      _error(strings.NICKNAME_ERROR);
    } else {
      const queryDisplayName = await _firebase.searchUserByNickname(
        user?.displayName as string
      );
      if (queryDisplayName?.length) {
        const userRef = queryDisplayName[0].ref;
        const queryAdmin = await _firebase.searchRoomByAdmin(userRef);
        let adminRef: DocumentReference;
        if (queryAdmin.length) {
          adminRef = queryAdmin[0].ref;
        }
        const queryRoomIn = await _firebase.searchRoomByUserIn(
          user.displayName as string
        );
        if (queryRoomIn.length) {
          _error(strings.EDIT_ERROR);
        } else {
          await Promise.all([
            update(ref(rtdb, firebase.collections.USERS + "/" + user.uid), {
              nickname: nickname,
            }),
            updateDoc(userRef, {
              nickname: nickname,
            }).then(() => {
              return updateProfile(user, {
                displayName: nickname,
              });
            }),
            queryAdmin.length
              ? queryAdmin.forEach((snap) => {
                  if (snap.exists()) {
                    updateDoc(snap.ref, {
                      admin: nickname,
                    });
                  }
                })
              : null,
          ])
            .then(() =>
              _alert({
                type: AlertTypes.Success,
                message: strings.NICKNAME_SUCCESS,
              })
            )
            .catch((error) => {
              _error(error);
              /**Undo */
              update(ref(rtdb, firebase.collections.USERS + "/" + user.uid), {
                nickname: user.displayName,
              });
              updateDoc(userRef, {
                nickname: user.displayName,
              });
              updateProfile(user, {
                displayName: user.displayName,
              });
              if (queryAdmin.length) {
                updateDoc(adminRef, {
                  admin: user.displayName,
                });
              }
            });
        }
      }
    }
  };

  return {
    deleteAccount,
    resetPassword,
    signInUser,
    signOutUser,
    signUpUser,
    updateUserNickname,
  };
};

export default useUser;
