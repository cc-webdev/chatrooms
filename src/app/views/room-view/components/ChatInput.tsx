import React from "react";
import { auth } from "../../../firebase/firebase";
import useForm from "../../../hooks/formHook";
import useRoom from "../../../hooks/roomHook";
import { useAppSelector } from "../../../store";
import { icons, strings } from "../../../utils/constants";

const ChatInput: React.FC = () => {
  const _form = useForm();
  const _room = useRoom();
  const _roomData = useAppSelector((state) => state.room);
  const _user = auth.currentUser?.displayName as string;

  return (
    <div className="d-flex align-items-center ms-3 me-3">
      <form
        name="chat"
        className="input-group align-items-center"
        onSubmit={(event) => {
          _form.handleChatSubmit(event, () =>
            _room.addChat(_roomData.id, {
              user: _user,
              message: _form.chat,
              time: new Date()
                .toTimeString()
                .replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"),
            })
          );
        }}
      >
        <input
          type="text"
          className="form-control rounded-pill me-3"
          id="input-chat"
          aria-describedby="chat"
          placeholder={strings.CHAT_PLACEHOLDER}
          maxLength={120}
          value={_form.chat}
          onChange={(event) => _form.handleChat(event)}
          required
        />
        <button
          className="btn btn-link text-light"
          type="submit"
          style={{ transform: "rotate(45deg)" }}
        >
          {icons.SEND}
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
