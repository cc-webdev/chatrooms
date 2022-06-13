import React, { useState } from "react";
import { defaultRoom, RoomModel } from "../models/RoomModel";
import { defaultUser, UserModel } from "../models/UserModel";

const useForm = () => {
  const [chat, setChat] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [roomData, setRoom] = useState<RoomModel>(defaultRoom);
  const [userData, setUser] = useState<UserModel>(defaultUser);

  const handleChat = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChat(event.target.value);
  };

  const handleChatSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    fn: () => Promise<void>
  ) => {
    event.preventDefault();
    fn();
    setChat("");
  };

  const handleRoomName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoom({ ...roomData, name: event.target.value });
  };

  const handleRoomDesc = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (/^\s/.test(event.target.value)) {
      return;
    }
    setRoom({ ...roomData, desc: event.target.value });
  };

  const handleRoomSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    fn: () => void
  ) => {
    event.preventDefault();
    fn();
    setRoom(defaultRoom);
  };

  const handleNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...userData, nickname: event.target.value });
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...userData, email: event.target.value });
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...userData, password: event.target.value });
  };

  const handleUserSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    fn: () => void
  ) => {
    event.preventDefault();
    fn();
    setUser(defaultUser);
  };

  const handleSpacePress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Space" || event.key === " ") {
      event.preventDefault();
      return false;
    }
  };

  return {
    chat,
    formData: userData,
    isVisible,
    setIsVisible,
    roomData,
    setRoom,
    handleChat,
    handleChatSubmit,
    handleRoomDesc,
    handleRoomName,
    handleRoomSubmit,
    handleNickname,
    handleEmail,
    handlePassword,
    handleUserSubmit,
    handleSpacePress,
  };
};

export default useForm;
