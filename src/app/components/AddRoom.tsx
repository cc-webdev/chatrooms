import React from "react";

import { icons } from "../utils/constants";

interface Props {
  setRoomId: (id: string) => void;
}

const AddRoom: React.FC<Props> = ({ setRoomId }) => {
  return (
    <div
      role="button"
      className="d-flex justify-content-center align-items-center card bg-dark border-5 rounded-3 m-3 p-2 text-light"
      style={{ minWidth: "14rem", height: "21rem" }}
      aria-controls="modal"
      data-bs-toggle="modal"
      data-bs-target="#modalRoom"
      onClick={() => setRoomId("")}
    >
      {icons.PLUS_CIRCLE_DOTTED}
    </div>
  );
};

export default AddRoom;
