import React from "react";
import ChatCard from "../../../components/ChatCard";
import { auth } from "../../../firebase/firebase";
import { useAppSelector } from "../../../store";

const Chat: React.FC = () => {
  const _roomData = useAppSelector((state) => state.room);
  const _user = auth.currentUser?.displayName as string;

  return (
    <div
      className="d-flex align-items-end mt-3 mb-3"
      style={{ height: "75vh", maxHeight: "75vh" }}
    >
      <div
        className="col-12 d-flex flex-column-reverse"
        style={{
          maxHeight: "70vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {_roomData.chat.length
          ? _roomData.chat
              .map((chat, index) => {
                return (
                  <div
                    className={`m-0 p-0 d-flex ${
                      _user === chat.user ? "flex-row-reverse" : "flex-row"
                    }`}
                    key={index}
                  >
                    <div className="col-12 col-md-6" key={index}>
                      <ChatCard
                        user={chat.user}
                        message={chat.message}
                        time={chat.time}
                      />
                    </div>
                  </div>
                );
              })
              .reverse()
          : null}
      </div>
    </div>
  );
};

export default Chat;
