import React from "react";
import CustomModal from "../../../components/CustomModal";
import useForm from "../../../hooks/formHook";
import useRoom from "../../../hooks/roomHook";
import { useAppSelector } from "../../../store";
import { strings } from "../../../utils/constants";

interface Props {
  id: string;
  createRoom: (name: string, desc: string) => void;
  updateRoom: (id: string, name: string, desc: string) => void;
}

const ModalRoom: React.FC<Props> = ({ id, createRoom, updateRoom }) => {
  const _form = useForm();
  const _getRoom = useRoom().getRoom;
  const _rooms = useAppSelector((state) => state.rooms);

  return (
    <CustomModal
      id={"modalRoom"}
      title={id.length ? strings.EDIT_ROOM : strings.CREATE_ROOM}
    >
      <div className="modal-body">
        <form
          onSubmit={(event) =>
            _form.handleRoomSubmit(event, () => {
              id.length
                ? updateRoom(id, _form.roomData.name, _form.roomData.desc)
                : createRoom(_form.roomData.name, _form.roomData.desc);
            })
          }
        >
          <div className="mb-3 text-light text-capitalize">
            <label htmlFor="roomName">{strings.NAME}</label>
          </div>
          <div className="mb-3">
            <input
              id="roomName"
              type="text"
              className="form-control"
              placeholder={
                id.length
                  ? _getRoom(_rooms, id).name
                  : strings.ROOM_NAME_PLACEHOLDER
              }
              min={4}
              max={12}
              value={_form.roomData.name}
              onChange={(event) => _form.handleRoomName(event)}
              onKeyDown={_form.handleSpacePress}
              required
            />
          </div>
          <div className="mb-3 text-light text-capitalize">
            <label htmlFor="roomDesc">{strings.DESCRIPTION}</label>
          </div>
          <div className="mb-3">
            <textarea
              id="roomDesc"
              className="form-control"
              style={{ resize: "none" }}
              placeholder={
                id.length
                  ? _getRoom(_rooms, id).desc
                  : strings.ROOM_DESCRIPTION_PLACEHOLDER
              }
              maxLength={240}
              rows={3}
              value={_form.roomData.desc}
              onChange={(event) => _form.handleRoomDesc(event)}
              required
            />
          </div>
          <div className="mb-3 d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-outline-success text-capitalize"
              data-bs-dismiss={
                _form.roomData.name.length && _form.roomData.desc.length
                  ? "modal"
                  : null
              }
              aria-label="Close"
            >
              {id.length ? strings.EDIT : strings.CREATE}
            </button>
          </div>
        </form>
      </div>
    </CustomModal>
  );
};

export default ModalRoom;
