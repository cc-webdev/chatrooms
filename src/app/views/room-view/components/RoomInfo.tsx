import React from "react";
import { auth } from "../../../firebase/firebase";
import { useAppSelector } from "../../../store";
import { icons } from "../../../utils/constants";

const RoomInfo: React.FC = () => {
  const _roomData = useAppSelector((state) => state.room);
  const _user = auth.currentUser?.displayName as string;

  return (
    <div className="d-flex flex-column">
      <div className="p-3 d-flex justify-content-between align-items-center mt-3 mb-3">
        <div style={{ overflowWrap: "break-word" }}>
          <h4 className="m-0">{_roomData.name}</h4>
        </div>
        {_user === _roomData.admin ? (
          <span
            role="button"
            className="text-danger me-3"
            aria-controls="modal"
            data-bs-toggle="modal"
            data-bs-target="#modalDelete"
          >
            {icons.TRASH}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default RoomInfo;
