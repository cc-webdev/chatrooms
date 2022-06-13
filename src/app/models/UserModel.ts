import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export interface UserModel {
  id: string;
  email: string;
  nickname: string;
  password?: string;
}

export const defaultUser: UserModel = {
  id: "",
  email: "",
  nickname: "",
  password: "",
};

export const userConverter = {
  toFirestore: (user: UserModel) => {
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      password: user.password,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): UserModel => {
    const data = snapshot.data(options);
    const user: UserModel = {
      id: data.id,
      email: data.email,
      nickname: data.nickname,
      password: data.password,
    };
    return user;
  },
};
