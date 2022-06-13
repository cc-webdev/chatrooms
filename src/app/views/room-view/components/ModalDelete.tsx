import React from "react";
import CustomModal from "../../../components/CustomModal";
import useRoom from "../../../hooks/roomHook";
import { useAppSelector } from "../../../store";
import { strings } from "../../../utils/constants";

const ModalDelete: React.FC = () => {
  const _roomData = useAppSelector((state) => state.room);
  const _room = useRoom();
  return (
    <CustomModal id="modalDelete" title={strings.DELETE_ROOM}>
      <div className="d-flex p-3 justify-content-end">
        <button
          type="button"
          className="btn btn-outline-danger text-capitalize"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => _room.deleteRoom(_roomData.id)}
        >
          {strings.DELETE}
        </button>
      </div>
    </CustomModal>
  );
};

export default ModalDelete;
