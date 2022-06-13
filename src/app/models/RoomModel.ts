import {
  DocumentData,
  DocumentReference,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { ChatModel } from "./ChatModel";

export interface RoomModel {
  id: string;
  admin: string;
  chat: ChatModel[];
  desc: string;
  name: string;
  users: string[];
  adminRef?: DocumentReference<DocumentData>;
  setRoomId?: (id: string) => void;
}

export const defaultRoom: RoomModel = {
  id: "",
  admin: "",
  chat: [],
  desc: "",
  name: "",
  users: [],
};

export const defaultRooms: RoomModel[] = [];

export const roomConverter = {
  toFirestore: (room: RoomModel) => {
    return {
      id: room.id,
      admin: room.admin,
      chat: room.chat,
      desc: room.desc,
      name: room.name,
      users: room.users,
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    const room: RoomModel = {
      id: data.id,
      admin: data.admin,
      chat: data.chat,
      desc: data.desc,
      name: data.name,
      users: data.users,
      adminRef: data.adminRef,
    };
    return room;
  },
};
