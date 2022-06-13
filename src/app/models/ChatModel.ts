import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export interface ChatModel {
  user: string;
  message: string;
  time: string;
}

export const defaultChat: ChatModel = {
  user: "",
  message: "",
  time: "",
};

export const chatConverter = {
  toFirestore: (chat: ChatModel) => {
    return {
      user: chat.user,
      message: chat.message,
      time: chat.time,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    const chat: ChatModel = {
      user: data.user,
      message: data.message,
      time: data.time,
    };
    return chat;
  },
};
