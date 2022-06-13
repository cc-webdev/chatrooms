import React from "react";
import { auth } from "../firebase/firebase";
import { ChatModel } from "../models/ChatModel";

const ChatCard: React.FC<ChatModel> = (props) => {
  return (
    <div
      className={`bg-light text-dark m-3 border border-1 text-start ${
        (auth.currentUser?.displayName as string) === props.user
          ? "border-warning"
          : "border-light"
      }`}
      style={{
        borderRadius: "1rem",
        borderBottomLeftRadius:
          (auth.currentUser?.displayName as string) === props.user
            ? "1rem"
            : "0",
        borderBottomRightRadius:
          (auth.currentUser?.displayName as string) === props.user
            ? "0"
            : "1rem",
      }}
    >
      <div
        className={`p-2 ${
          (auth.currentUser?.displayName as string) === props.user
            ? "text-warning"
            : "text-dark"
        } ${
          (auth.currentUser?.displayName as string) === props.user
            ? "bg-dark"
            : "bg-info"
        }`}
        style={{
          borderTopLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
        }}
      >
        {props.user}
      </div>
      <div className="p-2">
        <div>
          <p className="m-0" style={{ wordBreak: "break-all" }}>
            {props.message}
          </p>
        </div>
        <div
          className="d-flex justify-content-end text-success fs-6"
          style={{
            borderRadius: "1rem",
            borderBottomLeftRadius:
              (auth.currentUser?.displayName as string) === props.user
                ? "1rem"
                : "0",
            borderBottomRightRadius:
              (auth.currentUser?.displayName as string) === props.user
                ? "0"
                : "1rem",
          }}
        >
          {props.time}
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
