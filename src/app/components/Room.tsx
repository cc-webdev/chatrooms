import React from "react";
import useError from "../hooks/errorHook";
import useFirebase from "../hooks/firebaseHook";
import useRoom from "../hooks/roomHook";
import { RoomModel } from "../models/RoomModel";
import { icons, strings } from "../utils/constants";

const Room: React.FC<RoomModel> = (props) => {
  const _error = useError().handleError;
  const _isAdmin = useFirebase().checkAuth;
  const _room = useRoom();

  return (
    <div
      className={`card bg-dark border-5 rounded-3 m-3 p-2 text-light`}
      style={{ minWidth: "14rem", height: "21rem" }}
    >
      <div className="card-header">{props.name}</div>
      <div className="card-body">
        <div className="d-flex justify-content-between pb-2">
          <div className="d-flex align-items-center">
            <span className="me-2">{icons.PERSON_FILL}</span>
            <h6 className="card-title m-0">{props.admin}</h6>
          </div>
          <div className="d-flex align-items-center">
            <span className="me-2">{icons.PEOPLE_FILL}</span>
            <h6 className="m-0">{props.users.length}</h6>
          </div>
        </div>
        <div style={{ height: "72px", overflowY: "auto" }}>
          <p className="card-text">{props.desc}</p>
        </div>
        <div className="text-warning text-center mt-2">
          <p className="m-0" style={{ fontSize: "12px" }}>
            {strings.ROOM_WARNING}
          </p>
        </div>
      </div>
      <div className="card-footer d-flex justify-content-between pt-3">
        <button
          className="btn btn-outline-info"
          style={{ minWidth: "70px" }}
          disabled={_isAdmin(props.admin) ? false : true}
          onClick={() =>
            _isAdmin(props.admin)
              ? props.setRoomId!(props.id)
              : _error("Non sei admin della stanza")
          }
          aria-controls="modal"
          data-bs-toggle={_isAdmin(props.admin) ? "modal" : null}
          data-bs-target={_isAdmin(props.admin) ? "#modalRoom" : null}
        >
          {icons.PENCIL}
        </button>
        <button
          className="btn btn-outline-success"
          style={{ minWidth: "70px" }}
          onClick={() => _room.enterRoom(props.id as string)}
        >
          {icons.BOX_ARROW_IN_RIGHT}
        </button>
      </div>
    </div>
  );
};

export default Room;
