import React from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";

const OffcanvasChat: React.FC = () => {
  return (
    <div
      className="offcanvas offcanvas-end bg-dark"
      tabIndex={-1}
      id="offcanvasChat"
      aria-labelledby="offcanvasChatLabel"
      style={{ width: "80vw" }}
    >
      <div className="offcanvas-header pt-3 pb-0">
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <Chat />
        <ChatInput />
      </div>
    </div>
  );
};

export default OffcanvasChat;
