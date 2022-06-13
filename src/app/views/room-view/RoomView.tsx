import React from "react";
import BackArrow from "../../components/BackArrow";
import CustomAlert from "../../components/CustomAlert";
import Header from "../../components/Header";
import Main from "../../components/Main";
import useOfflineUsers from "../../hooks/offlineUsersHook";
import useRoom from "../../hooks/roomHook";
import useRoomListener from "../../hooks/roomListenerHook";
import useRoutes from "../../hooks/routesHook";
import { useAppSelector } from "../../store";
import { icons, strings } from "../../utils/constants";
import Chat from "./components/Chat";
import ChatInput from "./components/ChatInput";
import ModalDelete from "./components/ModalDelete";
import OffcanvasChat from "./components/OffcanvasChat";
import RoomInfo from "./components/RoomInfo";
import UsersList from "./components/UsersList";

const RoomView: React.FC = () => {
  const _room = useRoom();
  const _roomData = useAppSelector((state) => state.room);
  const _routes = useRoutes();

  useOfflineUsers();
  useRoomListener();

  return (
    <>
      <CustomAlert />
      <Header
        back={<BackArrow route={() => _routes.goToRoomsView()} />}
        actions={
          <div>
            <button
              type="button"
              className="btn btn-outline-warning text-capitalize"
              onClick={() => _room.exitRoom(_roomData.id as string)}
            >
              <span className="me-2">{strings.EXIT}</span>
              {icons.BOX_ARROW_RIGHT}
            </button>
          </div>
        }
      />
      <ModalDelete />
      <Main>
        <div className="container-fluid text-light">
          <div className="row">
            <div className="col-10 col-md-4">
              <RoomInfo />
              <UsersList />
            </div>
            <div id="chat" className="col-2 col-md-8">
              <Chat />
              <ChatInput />
            </div>
            <div
              id="chatOff"
              className="col-2 col-md-8 text-center d-none mt-3"
            >
              <span
                role="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasChat"
              >
                {icons.CHAT_LEFT_DOTS}
              </span>
              <OffcanvasChat />
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export default RoomView;
