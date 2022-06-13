import React from "react";
import CustomAlert from "../../components/CustomAlert";
import Header from "../../components/Header";
import Main from "../../components/Main";
import { strings } from "../../utils/constants";
import { useAppSelector } from "../../store";
import Menu from "./components/Menu";
import ModalUser from "./components/ModalUser";
import Room from "../../components/Room";
import AddRoom from "../../components/AddRoom";
import Spinner from "../../components/Spinner";
import ModalRoom from "./components/ModalRoom";
import useRoom from "../../hooks/roomHook";
import useRoomsListener from "../../hooks/roomsListenerHook";
import useOfflineUsers from "../../hooks/offlineUsersHook";

const RoomsView: React.FC = () => {
  const _room = useRoom();
  const _rooms = useAppSelector((state) => state.rooms);
  const _userData = useAppSelector((state) => state.user);

  useOfflineUsers();
  useRoomsListener();

  return _userData.nickname.length ? (
    <>
      <Header actions={<Menu />} />
      <CustomAlert />
      <ModalUser />
      <ModalRoom
        id={_room.roomId.length ? _room.roomId : ""}
        createRoom={_room.createRoom}
        updateRoom={_room.updateRoom}
      />
      <Main>
        <div className="container-fluid">
          <div className="text-capitalize text-warning border-bottom border-warning pt-5 m-3">
            <h2>{strings.APP_NAME_ROOMS}</h2>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 pt-3 g-4 ">
            {_rooms.map((room) => {
              return (
                <div className="col" key={room.id}>
                  <Room
                    id={room.id}
                    admin={room.admin}
                    chat={room.chat}
                    desc={room.desc}
                    name={room.name}
                    users={room.users}
                    setRoomId={_room.setRoomId}
                  />
                </div>
              );
            })}
            {_rooms.length < 9 ? (
              <div className="col" key="addRoom">
                <AddRoom setRoomId={_room.setRoomId} />
              </div>
            ) : null}
          </div>
        </div>
      </Main>
    </>
  ) : (
    <Spinner />
  );
};

export default RoomsView;
