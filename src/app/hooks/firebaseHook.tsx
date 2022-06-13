import {
  collection,
  DocumentData,
  DocumentReference,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { useCallback } from "react";
import { auth, db } from "../firebase/firebase";
import { userConverter } from "../models/UserModel";
import { firebase } from "../utils/constants";

const useFirebase = () => {
  const checkAuth = (admin: string) => {
    const user = auth.currentUser;
    if (user?.displayName === admin) {
      return true;
    } else {
      return false;
    }
  };

  const searchRoomByAdmin = async (
    adminRef: DocumentReference<DocumentData>
  ) => {
    const docs: QueryDocumentSnapshot<DocumentData>[] = [];
    const queryAdmin = query(
      collection(db, firebase.collections.ROOMS),
      where("adminRef", "==", adminRef)
    );
    const querySnap = await getDocs(queryAdmin);
    if (!querySnap.empty) {
      querySnap.forEach((doc) => {
        docs.push(doc);
      });
    }
    return docs;
  };

  const searchUserByNickname = useCallback(async (nickname: string) => {
    const docs: QueryDocumentSnapshot<DocumentData>[] = [];
    const queryDoc = query(
      collection(db, firebase.collections.USERS),
      where("nickname", "==", nickname)
    ).withConverter(userConverter);
    const querySnap = await getDocs(queryDoc);
    if (!querySnap.empty) {
      querySnap.forEach((doc) => {
        docs.push(doc);
      });
    }
    return docs;
  }, []);

  const searchRoomByUserIn = async (nickname: string) => {
    const docs: QueryDocumentSnapshot<DocumentData>[] = [];
    const queryDoc = query(
      collection(db, firebase.collections.ROOMS),
      where("users", "array-contains", nickname)
    );
    const querySnap = await getDocs(queryDoc);
    if (!querySnap.empty) {
      querySnap.forEach((doc) => {
        docs.push(doc);
      });
    }
    return docs;
  };

  return {
    checkAuth,
    searchRoomByAdmin,
    searchUserByNickname,
    searchRoomByUserIn,
  };
};

export default useFirebase;
